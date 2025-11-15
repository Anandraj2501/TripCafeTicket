import { bookings } from "../models/booking.model.js";
import jsSHA from "jssha";
import dotenv from "dotenv";
import { hotelBooking } from "../models/hotelbooking.model.js";
import { v4 as uuidv4 } from 'uuid';
import { StandardCheckoutClient, Env, StandardCheckoutPayRequest } from 'pg-sdk-node';
import Razorpay from "razorpay";
import crypto from "crypto";
import { insuranceBooking } from "../models/insurancebooking.model.js";


dotenv.config({
  path: "./.env"
})

const clientId = process.env.PHONEPE_CLIENTID;
const clientSecret = process.env.PHONEPE_CLIENTSECRET;
const clientVersion = process.env.PHONEPE_CLIENTVERSION;
const env = process.env.NODE_ENV === "development" ? Env.SANDBOX : Env.PRODUCTION;

const client = StandardCheckoutClient.getInstance(clientId, clientSecret, clientVersion, env);

const allowedOrigins = process.env.CORS_ORIGIN.split(",").map(origin => origin.trim());


const initializeRazorpayFlightPayment = async (req, res) => {
  try {
    if (
      !req.body.txnid ||
      !req.body.amount ||
      !req.body.productinfo ||
      !req.body.firstname ||
      !req.body.email ||
      !req.body.udf1
    ) {
      res.status(400).json('Mandatory fields missing');

    } else {

      const pd = req.body;

      const existingOrder = await bookings.findOne({ transactionId: pd.txnid });

      if (existingOrder) {
        return res.status(200).json({
          success: true,
          message: 'Booking already exists',
          order: {
            id: existingOrder.razorpayOrderId,
            amount: existingOrder.amount * 100,
            currency: "INR",
          }
        });
      }

      var instance = new Razorpay({ key_id: process.env.NODE_ENV === "development" ? process.env.RAZORPAY_TESTKEY : process.env.RAZORPAY_LIVEKEY, key_secret: process.env.NODE_ENV === "development" ? process.env.RAZORPAY_TESTSECRET : process.env.RAZORPAY_LIVESECRET });

      const order = await instance.orders.create({
        amount: pd.amount * 100, // amount in the smallest currency unit
        currency: "INR",
      })

      if (!order) return res.status(500).send("Error creating Razorpay order");





      const newOrder = new bookings({
        transactionId: pd.txnid,
        razorpayOrderId: order.id,
        bookingId: "testing",
        status: 'pending', // Set status as pending initially
        amount: pd.amount,
        productinfo: pd.productinfo,
        firstname: pd.firstname,
        lastname: "",
        email: pd.email,
        phone: pd.phone,
        travelClass: pd.travelClass,
        passengers: JSON.parse(pd.udf1), // Parse passengers from JSON string
        travellingDetails: JSON.parse(pd.udf2), // Parse travellingDetails from JSON string
        paymentMethod: "razorpay",
        flightDetails: JSON.parse(pd.udf3),
        addOnDetails: pd.addOnDetails,
        source: allowedOrigins[0]
      });

      await newOrder.save();

      if (!order) return res.status(500).send("Some error occured");
      res.status(200).send({ message: "Booking added successfully with status pending", order });

    }
  } catch (error) {
    // //consolelog(error);
    res.status(500).send({
      error
    });
  }
}

const verifyFlightrazorpayPayment = async (req, res) => {
  try {
    console.log("inside verify");
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const { id } = req.params;

    const order = await bookings.findOne({ transactionId: id });
    if (!order) {
      res.status(404).json({ success: false, message: "Order not found!" });
      return;
    }

    const generated_signature = crypto
      .createHmac("sha256", process.env.NODE_ENV === "development" ? process.env.RAZORPAY_TESTSECRET : process.env.RAZORPAY_LIVESECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generated_signature === razorpay_signature) {
      const referenceId = uuidv4().split('-')[0];

      // Generate a PNR and ensure uniqueness
      let pnr;
      let isUnique = false;

      while (!isUnique) {
        pnr = generatePNR();
        const existingPNR = await bookings.findOne({ pnr: pnr });
        if (!existingPNR) isUnique = true; // Ensure unique PNR
      }

      // Update the booking with status, reference ID, and PNR
      await bookings.findOneAndUpdate(
        { transactionId: id },
        {
          status: "paid",
          referenceId: referenceId,
          pnr: pnr
        }
      );
      // console.log("redirecting...");
      // res.redirect(`${process.env.CORS_ORIGIN}/paymentStatus/${id}`);
      const origin = req.headers.origin;

      // If the origin is allowed, redirect back to that origin
      const redirectBase = allowedOrigins.includes(origin)
        ? origin
        : allowedOrigins[0]; // fallback option

      res.redirect(`${redirectBase}/paymentStatus/${id}`);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error
    });
  }
}


// Use raw body parser specifically for this route
const razorpayWebhookHandler = async (req, res) => {

  const secret = process.env.NODE_ENV === 'development'
    ? process.env.RAZORPAY_TESTSECRET
    : process.env.RAZORPAY_LIVESECRET;

  const signature = req.headers['x-razorpay-signature'];
  const body = req.body.toString();

  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(body)
    .digest('hex');

  if (signature !== expectedSignature) {
    return res.status(400).send('Invalid signature');
  }

  const event = JSON.parse(body);

  if (event.event === 'payment.captured') {
    const paymentEntity = event.payload.payment.entity;
    const orderId = paymentEntity.order_id;

    try {
      const order = await bookings.findOne({ razorpayOrderId: orderId });

      if (!order) {
        return res.status(404).json({ success: false, message: 'Order not found' });
      }
      console.log(order);
      if (order.status === 'paid') {
        console.log(order);
        return res.status(200).json({ success: true, message: 'Booking already marked as paid' });
      }

      const referenceId = uuidv4().split('-')[0];

      // Ensure unique PNR
      let pnr;
      let isUnique = false;

      while (!isUnique) {
        pnr = generatePNR();
        const existingPNR = await bookings.findOne({ pnr });
        if (!existingPNR) isUnique = true;
      }

      await bookings.findOneAndUpdate(
        { razorpayOrderId: orderId },
        {
          status: 'paid',
          referenceId,
          pnr
        }
      );

      return res.status(200).json({ success: true });
    } catch (err) {
      console.error('Webhook DB update error:', err);
      return res.status(500).json({ success: false, message: 'Internal error' });
    }
  } else {
    return res.status(200).send('Event ignored');
  }
};


const initiateRazorpayHotelPayment = async (req, res) => {
  try {
    const { contactDetails, passengers } = req.body;

    if (!contactDetails || !passengers || !req.body.city || !req.body.checkinDate || !req.body.checkoutDate || !req.body.travellers || !req.body.purpose) {

      res.status(400).json('Mandatory fields missing');
    }

    else {
      var pd = req.body;

      const existingOrder = await hotelBooking.findOne({ transactionId: pd.txnid });

      if (existingOrder) {
        return res.status(200).json({
          success: true,
          message: 'Booking already exists',
          order: {
            id: existingOrder.razorpayOrderId,
            amount: existingOrder.amount * 100,
            currency: "INR"
          }
        });
      }

      var instance = new Razorpay({ key_id: process.env.NODE_ENV === "development" ? process.env.RAZORPAY_TESTKEY : process.env.RAZORPAY_LIVEKEY, key_secret: process.env.NODE_ENV === "development" ? process.env.RAZORPAY_TESTSECRET : process.env.RAZORPAY_LIVESECRET });

      const order = await instance.orders.create({
        amount: pd.amount * 100, // amount in the smallest currency unit
        currency: "INR",
      })

      if (!order) return res.status(500).send("Some error occured");


      const hotelbooking = new hotelBooking({
        transactionId: pd.txnid,
        razorpayOrderId: order.id,
        city: req.body.city,
        checkinDate: req.body.checkinDate,
        checkoutDate: req.body.checkoutDate,
        amount: pd.amount,
        travellers: req.body.travellers,
        purpose: req.body.purpose,
        status: "pending",
        contactDetails,
        passengers,
        hotelInfo: req.body.hotelInfo,
        source: allowedOrigins[0]
      })

      await hotelbooking.save();


      res.status(200).send({ message: "Booking added successfully with status pending", order });
    }
  } catch (error) {
    // //consolelog(error);
    res.status(500).send({
      error
    });
  }
}


const verifyRazorpayPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  const { id } = req.params;

  try {
    const order = await hotelBooking.findOne({ transactionId: id });

    if (!order) {
      res.status(404).json({ success: false, message: "Order not found!" });
      return;
    }

    const generated_signature = crypto
      .createHmac("sha256", process.env.NODE_ENV === "development" ? process.env.RAZORPAY_TESTSECRET : process.env.RAZORPAY_LIVESECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generated_signature === razorpay_signature) {

      const referenceId = uuidv4().split('-')[0];


      await hotelBooking.findOneAndUpdate(
        { transactionId: id },
        {
          status: 'paid',
          referenceId: referenceId
        }
      );

      res.redirect(`${process.env.CORS_ORIGIN}/hotelpaymentsuccess/${id}`);
    } else {
      res.status(400).json({ success: false, message: "Payment verification failed!" });
    }

  } catch (error) {
    // //consolelog(error);
    res.status(500).send({
      error
    });
  }

}


const initiateInsurancePayment = async (req, res) => {
  try {
    const { contactDetails, passengers, insuranceData } = req.body;
    if (!contactDetails || !passengers || !insuranceData.from || !insuranceData.to || !insuranceData.departureDate || !insuranceData.returnDate || !insuranceData.purpose) {

      res.status(400).json('Mandatory fields missing');
    }

    else {
      var pd = req.body;

      var instance = new Razorpay({ key_id: process.env.NODE_ENV === "development" ? process.env.RAZORPAY_TESTKEY : process.env.RAZORPAY_LIVEKEY, key_secret: process.env.NODE_ENV === "development" ? process.env.RAZORPAY_TESTSECRET : process.env.RAZORPAY_LIVESECRET });

      const order = await instance.orders.create({
        amount: pd.amount * 100, // amount in the smallest currency unit
        currency: "INR",
      })

      if (!order) return res.status(500).send("Some error occured");

      const insuranceBookingData = new insuranceBooking({
        transactionId: pd?.txnid,
        razorpayOrderId: order.id,
        from: insuranceData?.from,
        to: insuranceData?.to,
        departureDate: insuranceData?.departureDate,
        returnDate: insuranceData?.returnDate,
        amount: pd?.amount,
        purpose: insuranceData?.purpose,
        status: "pending",
        contactDetails,
        passengers,
        source: allowedOrigins[0]
      })

      await insuranceBookingData.save();


      res.status(200).send({ message: "Booking added successfully with status pending", order });
    }
  } catch (error) {

    res.status(500).send({
      error
    });
  }
}


const verifyRazorpayPaymentForInsurance = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  const { id } = req.params;

  const order = await insuranceBooking.findOne({ transactionId: id });

  if (!order) {
    res.status(404).json({ success: false, message: "Order not found!" });
    return;
  }

  const generated_signature = crypto
    .createHmac("sha256", process.env.NODE_ENV === "development" ? process.env.RAZORPAY_TESTSECRET : process.env.RAZORPAY_LIVESECRET)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (generated_signature === razorpay_signature) {

    const referenceId = uuidv4().split('-')[0];


    await insuranceBooking.findOneAndUpdate(
      { transactionId: id },
      {
        status: 'paid',
        referenceId: referenceId
      }
    );

    res.redirect(`${process.env.CORS_ORIGIN}/insurancepaymentsuccess/${id}`);
  } else {
    res.status(400).json({ success: false, message: "Payment verification failed!" });
  }
}







const hotelpaymentSuccess = async (req, res) => {
  try {
    // Find the order by txnid
    const order = await hotelBooking.findOne({ transactionId: req.body.txnid });

    if (order) {
      // Generate a unique reference ID (UUID or timestamp-based)
      const referenceId = uuidv4().split('-')[0]; // Alternative: Date.now().toString()

      // Update the order with status 'paid' and the generated referenceId
      await hotelBooking.findOneAndUpdate(
        { transactionId: req.body.txnid },
        {
          status: 'paid',
          referenceId: referenceId
        }
      );

      // //consolelog(`Payment successful for txnid: ${req.body.txnid}, Reference ID: ${referenceId}`);

      // Redirect to frontend with the transaction ID
      res.redirect(`https://dummyticket.tripcafeholidays.com/hotelpaymentsuccess/${req.body.txnid}`);

    } else {
      res.status(404).send({
        status: 'failure',
        message: `Order with transaction ID: ${req.body.txnid} not found.`,
      });
    }
  } catch (err) {
    // //consoleerror("Error processing payment success:", err);
    res.status(500).send('An error occurred while processing the payment');
  }
};



const generatePNR = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let pnr = "";
  for (let i = 0; i < 6; i++) {
    pnr += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return pnr;
};




const paymentSuccess = async (req, res) => {
  try {
    // Find the order by txnid
    const order = await bookings.findOne({ transactionId: req.body.txnid });

    if (order) {
      // Generate a unique reference ID
      const referenceId = uuidv4().split('-')[0];

      // Generate a PNR and ensure uniqueness
      let pnr;
      let isUnique = false;

      while (!isUnique) {
        pnr = generatePNR();
        const existingPNR = await bookings.findOne({ pnr: pnr });
        if (!existingPNR) isUnique = true; // Ensure unique PNR
      }

      // Update the booking with status, reference ID, and PNR
      await bookings.findOneAndUpdate(
        { transactionId: req.body.txnid },
        {
          status: "paid",
          referenceId: referenceId,
          pnr: pnr
        }
      );

      res.redirect(`https://dummyticket.tripcafeholidays.com/paymentStatus/${req.body.txnid}`); // Change URL to frontend
    } else {
      res.status(404).send({
        status: "failure",
        message: `Order with transaction ID: ${req.body.txnid} not found.`,
      });

    }
  } catch (err) {
    // //consolelog(err);
    res.status(500).send("An error occurred while processing the payment");
  }
};


const paymentFailed = async (req, res) => {
  try {

    // Find the order by txnid
    const order = await bookings.findOne({ transactionId: req.body.txnid });

    // If the order exists and the payment status is 'failure', update the status to 'failed'
    if (order && req.body.status === 'failure') {
      await bookings.findOneAndUpdate(
        { transactionId: req.body.txnid },
        { status: 'failed', error_Message: req.body.error || "Payment failed" }, // Mark the payment as failed
        { new: true }
      );

      res.redirect(`https://dummyticket.tripcafeholidays.com/paymentStatus/${req.body.txnid}`);
    } else if (!order) {
      res.status(404).send({
        status: 'failure',
        message: `Order with transaction ID: ${req.body.txnid} not found.`,
      });
    } else {
      res.status(400).send({
        status: 'failure',
        message: 'Order was not found or payment status does not match.',
      });
    }
  } catch (err) {
    res.status(500).send('An error occurred while processing the payment failure');
  }
}

const hotelpaymentFailed = async (req, res) => {
  try {

    // Find the order by txnid
    const order = await hotelBooking.findOne({ transactionId: req.body.txnid });

    // If the order exists and the payment status is 'failure', update the status to 'failed'
    if (order && req.body.status === 'failure') {
      await hotelBooking.findOneAndUpdate(
        { transactionId: req.body.txnid },
        { status: 'failed', error_Message: req.body.error || "Payment failed" }, // Mark the payment as failed
        { new: true }
      );

    } else if (!order) {
      res.status(404).send({
        status: 'failure',
        message: `Order with transaction ID: ${req.body.txnid} not found.`,
      });
    } else {
      res.status(400).send({
        status: 'failure',
        message: 'Order was not found or payment status does not match.',
      });
    }
  } catch (err) {
    res.status(500).send('An error occurred while processing the payment failure');
  }
}




export { paymentSuccess, paymentFailed, hotelpaymentSuccess, hotelpaymentFailed, initiateRazorpayHotelPayment, verifyRazorpayPayment, initializeRazorpayFlightPayment, verifyFlightrazorpayPayment, initiateInsurancePayment, verifyRazorpayPaymentForInsurance };
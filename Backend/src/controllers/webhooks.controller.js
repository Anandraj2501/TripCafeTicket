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

const generatePNR = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let pnr = "";
  for (let i = 0; i < 6; i++) {
    pnr += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return pnr;
};


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

      const hotelOrder = await hotelBooking.findOne({ razorpayOrderId: orderId });

      const insuranceOrder = await insuranceBooking.findOne({ razorpayOrderId: orderId });

      if (!order && !hotelOrder && !insuranceOrder) {
        return res.status(200).json({ success: false, message: 'Order not found' });
      }


      //FLight Booking
      if (order) {
        if (order.status === 'paid') {
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
      }

      // Hotel Booking
      else if (hotelOrder) {

        if (hotelOrder.status === 'paid') {
          return res.status(200).json({ success: true, message: 'Hotel booking already marked as paid' });
        }

        const referenceId = uuidv4().split('-')[0];

        await hotelBooking.findOneAndUpdate(
          { razorpayOrderId: orderId },
          {
            status: 'paid',
            referenceId: referenceId
          }
        );

        return res.status(200).json({ success: true });
      }

      // Insurance Booking
      else if (insuranceOrder) {
        
        if (insuranceOrder.status === 'paid') {
          return res.status(200).json({ success: true, message: 'Insurance booking already marked as paid' });
        }

        const referenceId = uuidv4().split('-')[0];


        await insuranceBooking.findOneAndUpdate(
          { razorpayOrderId: orderId },
          {
            status: 'paid',
            referenceId: referenceId
          }
        );

        return res.status(200).json({ success: true });
      }

      return res.status(200).json({ success: true });

    } catch (err) {

      return res.status(200).json({ success: false, message: 'Internal error' });
    }
  } else {
    return res.status(200).send('Event ignored');
  }
};

export { razorpayWebhookHandler };
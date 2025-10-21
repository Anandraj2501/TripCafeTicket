import { bookings } from "../models/booking.model.js";
import { hotelBooking } from "../models/hotelbooking.model.js";
import { getJson } from "serpapi";
import { insuranceBooking } from "../models/insurancebooking.model.js";

const getBookingData = async (req, res) => {
    try {
        // Fetch all tickets from the bookings collection
        const { page = 1, limit = 10 } = req.query;

        const pageNum = parseInt(page, 10);
        const limitNum = parseInt(limit, 10);

        const skip = (pageNum - 1) * limitNum;


        const orders = await bookings.find().skip(skip).limit(limit).sort({ createdAt: -1 });

        const totalBookings = await bookings.countDocuments();
        const totalPages = Math.ceil(totalBookings / limitNum);
        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: 'No tickets found.' });
        }

        // Send the list of tickets as a JSON response
        res.status(200).json({ orders, totalBookings, totalPages });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while fetching tickets.' });
    }
};

const getBookingDataById = async (req, res) => {
    // consolelog(req.params);
    try {
        const { id } = req.params;
        const order = await bookings.findOne({ transactionId: id });;
        // consolelog(order)
        if (!order) {
            res.status(404).json({ message: "Ticket not found" });
        } else {
            res.status(200).json(order);
        }

    } catch (error) {
        res.status(500).json({ message: 'An error occurred while fetching ticket.' });
    }
}

const getSuccessBookingDataById = async (req, res) => {
    // consolelog(req.params);
    try {
        const { id } = req.params;
        const order = await bookings.findOne({ transactionId: id });;
        // consolelog(order)
        if (!order) {
            res.status(404).json({ message: "Ticket not found" });
        } else {
            res.status(200).json(order);
        }

    } catch (error) {
        res.status(500).json({ message: 'An error occurred while fetching ticket.' });
    }
}

const searchBookingData = async (req, res) => {
    try {
        const { fromDate, toDate, pnr, status } = req.query;
        const filter = {};
        if (fromDate) {
            filter.createdAt = { $gte: new Date(fromDate) };
        }

        if (toDate) {
            filter.createdAt.$lte = new Date(toDate);
        }

        if (pnr) {
            filter.pnr = pnr;
        }

        if (status) {
            filter.status = status;
        }

        const orders = await bookings.find(filter);
        const totalBookings = await bookings.find(filter).countDocuments();
        const totalPages = Math.ceil(totalBookings / 10);
        res.status(200).json({ orders, totalBookings, totalPages });

    } catch (error) {

        res.status(500).json({ message: "An error occured while searching the record." });
    }
}


const getHotelBookingData = async (req, res) => {
    try {

        const { page = 1, limit = 10 } = req.query;

        const pageNum = parseInt(page, 10);
        const limitNum = parseInt(limit, 10);

        const skip = (pageNum - 1) * limitNum;

        // Fetch all tickets from the bookings collection
        const orders = await hotelBooking.find().skip(skip).limit(limitNum).sort({ createdAt: -1 });

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: 'No tickets found.' });
        }
        const totalBookings = await hotelBooking.countDocuments();
        const totalPages = Math.ceil(totalBookings / limitNum);
        // Send the list of tickets as a JSON response
        res.status(200).json({ orders, totalBookings, totalPages });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while fetching tickets.' });
    }
};


const getInsuranceBookingData = async (req, res) => {
    try {

        const { page = 1, limit = 10 } = req.query;

        const pageNum = parseInt(page, 10);
        const limitNum = parseInt(limit, 10);

        const skip = (pageNum - 1) * limitNum;

        // Fetch all tickets from the bookings collection
        const orders = await insuranceBooking.find().skip(skip).limit(limitNum).sort({ createdAt: -1 });

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: 'No tickets found.' });
        }
        const totalBookings = await insuranceBooking.countDocuments();
        const totalPages = Math.ceil(totalBookings / limitNum);
        // Send the list of tickets as a JSON response
        res.status(200).json({ orders, totalBookings, totalPages });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while fetching tickets.' });
    }
};

const searchHotelData = async (req, res) => {
    try {
        const { fromDate, toDate, status } = req.query;

        const filter = {};
        if (fromDate) {
            filter.createdAt = { $gte: new Date(fromDate) }
        }

        if (toDate) {
            filter.createdAt.$lte = new Date(toDate);
        }

        if (status) {
            filter.status = status;
        }

        const orders = await hotelBooking.find(filter);
        const totalBookings = await hotelBooking.find(filter).countDocuments();
        const totalPages = Math.ceil(totalBookings / 10);

        res.status(200).json({ orders, totalBookings, totalPages })
    } catch (error) {
        res.status(500).json({ message: "An error occured while searching data" });
    }
}

const getHotelBookingDataById = async (req, res) => {

    try {
        const { id } = req.params;
        const order = await hotelBooking.findOne({ transactionId: id });

        if (!order) {
            res.status(404).json({ message: "Ticket not found" });
        } else {
            res.status(200).json(order);
        }

    } catch (error) {
        res.status(500).json({ message: 'An error occurred while fetching ticket.' });
    }
}

const getInsuranceBookingDataById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await insuranceBooking.findOne({ transactionId: id });

        if (!order) {
            res.status(404).json({ message: "Ticket not found" });
        } else {
            res.status(200).json(order);
        }

    } catch (error) {
        console.error("Error fetching insurance booking data:", error);
        res.status(500).json({ message: 'An error occurred while fetching ticket.' });
    }
}

const updateBookingData = async (req, res) => {
    const { bookingId, passengerId } = req.params; // Get Booking ID & Passenger ID from URL
    const { passengerDetails, pnr } = req.body; // Updated passenger data

    try {
        const updatedBooking = await bookings.findOneAndUpdate(
            { _id: bookingId, "passengers._id": passengerId }, // Match booking & passenger ID
            {
                $set: {
                    "passengers.$.title": passengerDetails.title,
                    "passengers.$.firstName": passengerDetails.firstName,
                    "passengers.$.lastName": passengerDetails.lastName,
                    "passengers.$.nationality": passengerDetails.nationality
                }
            },
            { new: true } // Return updated document
        );

        if (!updatedBooking) {

            return res.status(404).send({ message: "Passenger not found" });
        }
        // consolelog(updatedBooking);
        res.status(200).send({ message: "Passenger updated successfully", updatedBooking });
    } catch (error) {
        res.status(500).send({ message: "Internal server error", error });
    }
};


//update route only for pnr, flightNumber, Class
const updateBookingDetailsData = async (req, res) => {
    const { bookingId } = req.params;
    const { pnr, flightNumber, flightClass } = req.body.editBookingDetails;


    try {
        if (!pnr && !flightNumber && !flightClass) {
            return res.status(400).send({ message: "Please provide pnr or flightNumber or flightClass to update" });
        }

        const updatedBooking = await bookings.findOneAndUpdate(
            { _id: bookingId },
            {
                $set: {
                    ...(pnr && { pnr }),
                    ...(flightNumber && { flightNumber }),
                    ...(flightClass && { flightClass })
                }
            },
            { new: true }
        );

        if (!updatedBooking) {
            return res.status(404).send({ message: "Booking not found" });
        }

        res.status(200).send({ message: "Booking Details updated successfully", updatedBooking });

    } catch (error) {
        res.status(500).send({ message: "Internal Server Error", error });
    }
};


const updateHotelBookingData = async (req, res) => {
    const { bookingId, passengerId } = req.params; // Get Booking ID & Passenger ID from URL
    const { passengerDetails } = req.body; // Updated passenger data

    try {
        const updatedBooking = await hotelBooking.findOneAndUpdate(
            { _id: bookingId, "passengers._id": passengerId }, // Match booking & passenger ID
            {
                $set: {
                    "passengers.$.title": passengerDetails.title,
                    "passengers.$.firstName": passengerDetails.firstName,
                    "passengers.$.lastName": passengerDetails.lastName,
                }
            },
            { new: true } // Return updated document
        );

        if (!updatedBooking) {

            return res.status(404).send({ message: "Passenger not found" });
        }
        // consolelog(updatedBooking);
        res.status(200).send({ message: "Passenger updated successfully", updatedBooking });
    } catch (error) {
        res.status(500).send({ message: "Internal server error", error });
    }
};

const getStats = async (req, res) => {
    let totalHotelBooking;
    let hotelBookingLastThirtyDays;
    let totalFlightBooking;
    let flightbookingLastThirtyDays;
    let totalInsuranceBooking;
    let insuranceBookingLastThirtyDays;

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    try {
        // Count total bookings
        totalHotelBooking = await hotelBooking.countDocuments();
        totalFlightBooking = await bookings.countDocuments();
        totalInsuranceBooking = await insuranceBooking.countDocuments();

        // Count bookings from the last 30 days (Fixed missing `await`)
        hotelBookingLastThirtyDays = await hotelBooking.countDocuments({ createdAt: { $gte: thirtyDaysAgo } });
        flightbookingLastThirtyDays = await bookings.countDocuments({ createdAt: { $gte: thirtyDaysAgo } });
        insuranceBookingLastThirtyDays = await insuranceBooking.countDocuments({ createdAt: { $gte: thirtyDaysAgo } });

        const stats = {
            totalHotelBooking,
            hotelBookingLastThirtyDays,
            totalFlightBooking,
            flightbookingLastThirtyDays,
            totalInsuranceBooking,
            insuranceBookingLastThirtyDays
        };

        res.status(200).json(stats);
    } catch (error) {

        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

const searchHotel = async (req, res) => {
    try {
        const hotelData = req.query;

        if (!hotelData?.city) {
            return res.status(400).json({ error: "Missing query 'city' parameter." });
        }
        getJson({
            engine: "google_hotels",
            q: hotelData?.city,
            check_in_date: hotelData?.checkinDate,
            check_out_date: hotelData?.checkoutDate,
            no_cache: false,
            api_key: process.env.SERAPI_KEY,
            currency: "INR",
        }, (json) => {

            return res.status(200).json(json);
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

export { getBookingData, updateBookingData, getBookingDataById, getHotelBookingDataById, getHotelBookingData, updateHotelBookingData, getStats, searchBookingData, searchHotelData, updateBookingDetailsData, getSuccessBookingDataById, searchHotel, getInsuranceBookingDataById, getInsuranceBookingData };    
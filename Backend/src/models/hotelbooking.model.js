import mongoose, { Schema } from "mongoose";


const PassengerSchema = mongoose.Schema({
    title: { type: String, required: false },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
});

const hotelbooking = new Schema({
    transactionId: {
        type: String, required: true
    },
    razorpayOrderId: { type: String, required: true },
    city: {
        type: String,
        required: true
    },
    checkinDate: {
        type: Date,
        required: true
    },
    checkoutDate: {
        type: Date,
        required: true
    },
    amount:
    {
        type: String,
        required: true
    },
    travellers: {
        type: Number,
        required: true
    },
    purpose: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    referenceId: {
        type: String,
        required: false
    },
    contactDetails: {
        phone: {
            type: Number,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        }
    },
    passengers: [PassengerSchema],
    hotelInfo: {
        type: Object,
        required: false
    }
},
    { timestamps: true }
)

export const hotelBooking = mongoose.model("hotelBooking", hotelbooking);
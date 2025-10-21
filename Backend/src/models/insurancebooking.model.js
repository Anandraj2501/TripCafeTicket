import mongoose, { Schema } from "mongoose";


const PassengerSchema = mongoose.Schema({
    title: { type: String, required: false },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dob: { type: Date, required: true },
    passportNumber: { type: String, required: false },
    nationality: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    zipcode: { type: String, required: true },
    gender: { type: String, required: true }
});

const insurancebooking = new Schema({
    transactionId: {
        type: String, required: true
    },
    razorpayOrderId: { type: String, required: true },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    departureDate: {
        type: Date,
        required: true
    },
    returnDate: {
        type: Date,
        required: true
    },
    amount:
    {
        type: String,
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
    passengers: [PassengerSchema]
},
    { timestamps: true }
)

export const insuranceBooking = mongoose.model("insuranceBooking", insurancebooking);
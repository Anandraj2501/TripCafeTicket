import mongoose, { Schema } from 'mongoose';

const RatingCategorySchema = Schema({
    id: { type: String, required: true },           // e.g., "booking"
    name: { type: String, required: true },         // e.g., "Booking Process"
    rating: { type: Number, required: true },       // e.g., 4
}, { _id: false }); // Don't create separate _id for subdocs

const ReviewSchema = new Schema({
    categories: {
        type: [RatingCategorySchema],
        required: true,
    },
    comment: {
        type: String,
        default: '',
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    }
},
    { timestamps: true }
);

export const Review = mongoose.model('Review', ReviewSchema);

import React, { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import axios from 'axios';
import { MessageSquarePlus } from 'lucide-react';
import ReviewModal from './ReviewModal';

const ReviewsList = () => {
    // Mock data for demonstration
    const [reviews, setReviews] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {

        const fetchReviews = async () => {
            try {
                const response = await axios.get(`${process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_BACKEND_URL : process.env.REACT_APP_PRODUCTION_BACKEND_URL}/user/getReview`, {
                    withCredentials: true
                });

                if (response.status === 201) {
                    
                    setReviews(response.data.reviews);
                }

            } catch (error) {
                
            }
        };

        fetchReviews();

    }, []);

    const renderStars = (rating) => {
        return Array.from({ length: 5 }).map((_, index) => (
            <Star
                key={index}
                size={16}
                className={`${index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                    }`}
            />
        ));
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <>
            <Navbar />
            <ReviewModal open={open} onClose={() => setOpen(false)} />
            {/* <div className="space-y-6"> */}
            <div className="p-6 bg-gray-100">

                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl font-bold text-gray-800 text-center mb-8"
                >
                    Customer Reviews
                </motion.h2>
                <div className='flex justify-center mb-8'>
                    <button
                        onClick={() => setOpen(true)}
                        className="flex items-center px-4 py-2 text-white bg-[#ec601d] rounded-md shadow-md hover:bg-[#ec601d]focus:outline-none focus:ring-2 focus:ring-[#ec601d] focus:ring-offset-2 transition-all duration-200 transform hover:scale-105"
                    >
                        <MessageSquarePlus size={20} className="mr-2" />
                        <span className="font-medium">Submit Review</span>
                    </button>
                </div>

                {reviews.map((review, index) => (
                    <motion.div
                        key={review.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-lg shadow-md p-6 mb-8"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800">{review.username}</h3>
                                <p className="text-gray-500 text-sm">{formatDate(review.createdAt)}</p>
                            </div>
                        </div>

                        <div className="space-y-3 mb-4">
                            {review.categories.map((category) => (
                                <div key={category.id} className="flex items-center justify-between">
                                    <span className="text-gray-600">{category.name}</span>
                                    <div className="flex space-x-1">
                                        {renderStars(category.rating)}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {review.comment && (
                            <div className="mt-4 pt-4 border-t border-gray-100">
                                <p className="text-gray-700">{review.comment}</p>
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>
            <Footer />
        </>
    );
};

export default ReviewsList;

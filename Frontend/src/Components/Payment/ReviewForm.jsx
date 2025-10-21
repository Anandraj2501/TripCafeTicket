import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';

const ReviewForm = ({ bookingdata }) => {
    const [categories, setCategories] = useState([
        { id: 'rating', name: 'Rating', rating: 0 }
        // { id: 'website', name: 'Website Experience', rating: 0 },
        // { id: 'customer', name: 'Customer Service', rating: 0 },
    ]);

    const [comment, setComment] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [username, setUsername] = useState(bookingdata?.contactDetails?.name || bookingdata?.firstname || '');
    const [email, setEmail] = useState(bookingdata?.contactDetails?.email || bookingdata?.email || '');
    const [formErrors, setFormErrors] = useState({});

    const handleStarClick = (categoryId, rating) => {
        setCategories(categories.map(category =>
            category.id === categoryId ? { ...category, rating } : category
        ));
    };

    const validateForm = () => {
        const errors = {};
        if (categories.some(category => category.rating === 0)) {
            errors.categories = 'Please rate all categories';
        }
        if (!username.trim()) {
            errors.username = 'Name is required';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim()) {
            errors.email = 'Email is required';
        } else if (!emailRegex.test(email)) {
            errors.email = 'Please enter a valid email';
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            

            try {
                const response = await axios.post(`${process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_BACKEND_URL : process.env.REACT_APP_PRODUCTION_BACKEND_URL}/user/submitReview`, { categories, comment, username, email }, {
                    withCredentials: true
                });

                if (response.status === 201) {
                    setIsSubmitted(true);
                    setCategories(categories.map(category => ({ ...category, rating: 0 })));
                    setComment('');
                }

            } catch (error) {
                
            }

            
        }
    };

    const renderStars = (categoryId, currentRating) => {
        return Array.from({ length: 5 }).map((_, index) => {
            const starValue = index + 1;
            return (
                <motion.button
                    key={`${categoryId}-star-${starValue}`}
                    type="button"
                    className="focus:outline-none"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleStarClick(categoryId, starValue)}
                >
                    <Star
                        size={24}
                        className={`${starValue <= currentRating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                        cursor-pointer transition-all duration-200 hover:text-yellow-300`}
                    />
                </motion.button>
            );
        });
    };

    if (isSubmitted) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-6 rounded-lg shadow-md  mt-8"
            >
                <div className="text-center">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="mx-auto mb-4 text-green-500"
                    >
                        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                            <circle cx="32" cy="32" r="32" fill="currentColor" fillOpacity="0.2" />
                            <path d="M20 32L28 40L44 24" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </motion.div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Thank You For Your Feedback!</h3>
                    <p className="text-gray-600 mb-6">Your review helps us improve our service for future travelers.</p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-colors duration-300"
                        onClick={() => setIsSubmitted(false)}
                    >
                        Submit Another Review
                    </motion.button>
                </div>
            </motion.div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md  mt-8">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Share Your Experience</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    {categories.map((category) => (
                        <div key={category.id} className="mb-4">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                                <label className="text-gray-700 font-medium mb-1 sm:mb-0">{category.name}:</label>
                                <div className="flex space-x-1">
                                    {renderStars(category.id, category.rating)}
                                </div>
                            </div>
                            {category.rating > 0 && (
                                <p className="text-sm text-gray-500 text-right">
                                    {category.rating === 1 && 'Poor'}
                                    {category.rating === 2 && 'Fair'}
                                    {category.rating === 3 && 'Good'}
                                    {category.rating === 4 && 'Very Good'}
                                    {category.rating === 5 && 'Excellent'}
                                </p>
                            )}
                        </div>
                    ))}
                    {formErrors.categories && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.categories}</p>
                    )}
                </div>

                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700 font-medium mb-2">Your Name</label>
                    <input
                        type="text"
                        id="username"
                        className={`w-full px-4 py-2 border ${formErrors.username ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-red-400`}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    {formErrors.username && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.username}</p>
                    )}
                </div>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        className={`w-full px-4 py-2 border ${formErrors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-red-400`}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {formErrors.email && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                    )}
                </div>

                <div className="mb-6">
                    <label htmlFor="comment" className="block text-gray-700 font-medium mb-2">Additional Comments (Optional)</label>
                    <textarea
                        id="comment"
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
                        placeholder="Please share your thoughts about your booking experience..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                </div>

                <motion.button
                    type="submit"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full bg-red-600 text-white py-3 px-4 rounded-md font-medium hover:bg-red-700 transition-colors duration-300"
                >
                    Submit Review
                </motion.button>
            </form>
        </div>
    );
};

export default ReviewForm;

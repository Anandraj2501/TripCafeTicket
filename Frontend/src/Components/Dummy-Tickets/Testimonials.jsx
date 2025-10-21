import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Testimonials() {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {

        const fetchReviews = async () => {
            try {
                const response = await axios.get(`${process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_BACKEND_URL : process.env.REACT_APP_PRODUCTION_BACKEND_URL}/user/getReview`, {
                    withCredentials: true
                });

                if (response.status === 201) {
                    console.log(response.data.reviews);
                    setReviews(response.data.reviews);
                }

            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();

    }, []);

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 2,
            //slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            //slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            //slidesToSlide: 1 // optional, default to 1.
        }
    };

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

    return (
        <>
            <section
                className="w-full px-3"
                style={{
                    background:
                        "linear-gradient(to bottom, rgba(255,249,249,0) 25%,rgba(250,242,242,0) 34%,rgba(211,189,187,1) 100%)",
                }}
            >
                <div className="container mx-auto px-3 md:px-10">
                    <div className="title-step w-full flex justify-center pt-10">
                        <h2 className="text-3xl md:text-4xl font-bold text-center">
                            What Our Clients Say
                        </h2>
                    </div>
                </div>
                <div className="container mx-auto px-3 md:px-10 py-10">
                    <Carousel
                        swipeable={true}
                        draggable={true}
                        showDots={false}
                        responsive={responsive}
                        ssr={true} // means to render carousel on server-side.
                        infinite={true}
                        autoPlay={true}
                        containerClass="carousel-container"
                        removeArrowOnDeviceType={["desktop", "tablet", "mobile"]}
                        dotListClass="custom-dot-list-style"
                        itemClass="carousel-item-padding-40-px"
                    >
                        {reviews.map((testimonial, index) => (
                            <div className="item" key={index}>
                                <div className="bg-white w-[98%] flex flex-col gap-6 rounded-xl justify-center items-center p-5 min-h-[240px]">
                                    <div className="icon-box m-auto w-[40px]">
                                        <img src="images/tasty-quotes-icon.webp" alt="" />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-center">
                                        <p className="text-center text-base md:text-lg font-[400] mb-3">
                                            {testimonial?.comment}
                                        </p>
                                        <span className='flex justify-center items-center gap-1 mb-3'>
                                            {testimonial?.categories?.map((category) => (renderStars(category.rating)))}
                                        </span>
                                        <p className="text-center font-bold">- {testimonial?.username}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Carousel>
                    <Link to="/review" className='flex justify-center items-center mt-5'>
                        <button className="bg-[rgb(29,181,236)] text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300">View All Experience</button></Link>
                </div>
            </section>
        </>
    );
}

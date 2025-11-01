import React, { useState, useEffect, useRef } from 'react'

const Steps = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const scrollContainerRef = useRef(null);

    // Check if device is mobile
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 640);
        };

        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);

        return () => {
            window.removeEventListener('resize', checkIfMobile);
        };
    }, []);

    // Auto scroll effect for mobile only - right to left
    useEffect(() => {
        let interval;

        if (isMobile && scrollContainerRef.current) {
            interval = setInterval(() => {
                handleNext();
            }, 3000);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isMobile, currentIndex]);

    // Handle navigation
    const handlePrev = () => {
        if (!scrollContainerRef.current) return;

        const newIndex = currentIndex === 0 ? 4 : currentIndex - 1;
        setCurrentIndex(newIndex);

        scrollContainerRef.current.scrollTo({
            left: newIndex * scrollContainerRef.current.children[0].offsetWidth,
            behavior: 'smooth'
        });
    };

    const handleNext = () => {
        if (!scrollContainerRef.current) return;

        const newIndex = currentIndex === 4 ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);

        scrollContainerRef.current.scrollTo({
            left: newIndex * scrollContainerRef.current.children[0].offsetWidth,
            behavior: 'smooth'
        });
    };

    // Benefits data
    const benefits = [
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[rgb(29,181,236)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            ),
            title: "Secure Payment"
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[rgb(29,181,236)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
            ),
            title: "24X7 Support"
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[rgb(29,181,236)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
            title: "5+ Years of Travel Expertise"
        },
        {
            icon: (
                <div className="flex items-center justify-center gap-2">
                    <img src="images/mmt-logo.png" alt="MakeMyTrip" className="h-6" />
                    <img src="images/airiq-logo.jpeg" alt="AirIQ" className="h-6" />
                    <img src="images/tripjack-logo.png" alt="TripJack" className="h-6" />
                </div>
            ),
            title: "Trusted Travel Partners"
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[rgb(29,181,236)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: "Money-Back Guarantee"
        }
    ];

    return (
        <>
            <section className="w-full px-3 bg-white py-6">
                <div className="container mx-auto px-3 sm:px-5 md:px-10">
                    {isMobile ? (
                        <div className="relative">
                            <div
                                ref={scrollContainerRef}
                                className="flex overflow-x-hidden snap-x snap-mandatory"
                            >
                                {benefits.map((benefit, index) => (
                                    <div
                                        key={index}
                                        className="min-w-full p-4 snap-start flex-shrink-0 bg-white rounded-xl shadow-md border-t-4 border-[rgb(29,181,236)] hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center h-full"
                                    >
                                        <div className="h-16 w-16 flex items-center justify-center bg-orange-50 rounded-full mb-3">
                                            {benefit.icon}
                                        </div>
                                        <h3 className="font-bold text-sm sm:text-base text-gray-800">{benefit.title}</h3>
                                    </div>
                                ))}
                            </div>

                            {/* Navigation buttons */}
                            <button
                                onClick={handlePrev}
                                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-[rgb(29,181,236)] text-white rounded-full p-2 shadow-md z-10"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>

                            <button
                                onClick={handleNext}
                                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-[rgb(29,181,236)] text-white rounded-full p-2 shadow-md z-10"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>

                            {/* Dots indicator */}
                            <div className="flex justify-center mt-4 gap-2">
                                {benefits.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            setCurrentIndex(index);
                                            scrollContainerRef.current.scrollTo({
                                                left: index * scrollContainerRef.current.children[0].offsetWidth,
                                                behavior: 'smooth'
                                            });
                                        }}
                                        className={`h-2 rounded-full transition-all ${currentIndex === index ? 'w-4 bg-[rgb(29,181,236)]' : 'w-2 bg-gray-300'
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                            {benefits.map((benefit, index) => (
                                <div
                                    key={index}
                                    className="bg-white p-4 rounded-xl shadow-md border-t-4 border-[rgb(29,181,236)] hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center h-full"
                                >
                                    <div className="h-16 w-16 flex items-center justify-center bg-orange-50 rounded-full mb-3">
                                        {benefit.icon}
                                    </div>
                                    <h3 className="font-bold text-sm sm:text-base text-gray-800">{benefit.title}</h3>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <section className="w-full px-3 bg-white bg-no-repeat bg-cover bg-[center_top_1rem]" style={{ backgroundImage: 'url(images/af-img.png)' }}>
                <div className="container mx-auto px-3 sm:px-5 md:px-10 py-10 sm:py-16 md:py-20">
                    <div className='title-step w-full flex justify-center mb-6 sm:mb-8 md:mb-10'>
                        <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-center'>With TripCafeTicket, getting a flight or hotel ticket for your visa is as EASY as 1-2-3!
                        </h2>
                    </div>

                    <div >
                        <img src="images/Stepsbanner.png" className="w-full" alt=""/>
                        {/* <div className='rounded-[20px] border border-zinc-200 p-4 grid gap-3 bg-white shadow-md'>
                            <div className='card-img h-[150px] sm:h-[180px] md:h-[200px]'>
                                <img src="images/Flight_Booking_Step_2.svg" alt='' className="h-full w-full object-contain" />
                            </div>
                            <h3 className='text-lg sm:text-xl font-bold text-center border-b-2 border-dashed border-[rgb(29,181,236)]'>SEARCH FOR<br />FLIGHT/HOTEL</h3>
                            <p className='text-sm sm:text-base font-[400] text-center'>Provide details & run the flight or hotel search query to pull out available results</p>
                        </div>

                        <div className='rounded-[20px] border border-zinc-200 p-4 grid gap-3 bg-white shadow-md'>
                            <div className='card-img h-[150px] sm:h-[180px] md:h-[200px]'>
                                <img src="images/Flight_Booking_Step_3.svg" alt='' className="h-full w-full object-contain" />
                            </div>
                            <h3 className='text-lg sm:text-xl font-bold text-center border-b-2 border-dashed border-[rgb(29,181,236)]'>SELECT<br />FLIGHT/HOTEL</h3>
                            <p className='text-sm sm:text-base font-[400] text-center'>View available flight or hotel details and select the most relevant travel itinerary</p>
                        </div>


                        <div className='rounded-[20px] border border-zinc-200 p-4 grid gap-3 bg-white shadow-md'>
                            <div className='card-img h-[150px] sm:h-[180px] md:h-[200px]'>
                                <img src="images/Step_4.svg" alt='' className="h-full w-full object-contain" />
                            </div>
                            <h3 className='text-lg sm:text-xl font-bold text-center border-b-2 border-dashed border-[rgb(29,181,236)]'>CONFIRM YOUR<br />FLIGHT/HOTEL BOOKING</h3>
                            <p className='text-sm sm:text-base font-[400] text-center'>Enter traveler/guest information, and make the payment to confirm your flight/hotel booking</p>
                        </div>


                        <div className='rounded-[20px] border border-zinc-200 p-4 grid gap-3 bg-white shadow-md'>
                            <div className='card-img h-[150px] sm:h-[180px] md:h-[200px]'>
                                <img src="images/step_4-1.svg" alt='' className="h-full w-full object-contain" />
                            </div>
                            <h3 className='text-lg sm:text-xl font-bold text-center border-b-2 border-dashed border-[rgb(29,181,236)]'>DOWNLOAD<br />YOUR BOOKING</h3>
                            <p className='text-sm sm:text-base font-[400] text-center'>Your flight or hotel booking confirmation receipt is available for download or print</p>
                        </div> */}
                    </div>
                </div>
            </section>
        </>
    )
}
export default Steps;



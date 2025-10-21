import React from 'react'
import ScrollToTop from "react-scroll-to-top";
const PricingPlan = () => {


    return (
        <>
            <section className="w-full px-3 bg-white bg-no-repeat bg-cover bg-[center_top_1rem]" style={{ backgroundImage: 'url(images/price-pattrn-bg.webp)' }}>
                <div className="container mx-auto px-3 sm:px-5 md:px-10 lg:px-10 xl:px-10 py-20">
                    <div className='title-step w-full flex justify-center mb-10'>
                        <h2 className='text-3xl sm:text-4xl md:text-4xl lg:text-4xl xl:text-4xl font-bold text-center'>Pricing & Plans</h2>
                    </div>

                    <div className="flex flex-wrap justify-center gap-5 sm:gap-8 md:gap-10 w-full">

                        <div className='rounded-[20px] w-full sm:w-[80%] md:w-[45%] lg:w-[30%] xl:w-[25%] border-solid border-zinc-200 border-2 p-6 grid grid-rows gap-3 bg-white shadow-md'>
                            <h3 className='text-2xl sm:text-2.5xl md:text-2.5xl lg:text-2.5xl xl:text-2.5xl font-bold text-center'>Flight Reservation</h3>
                            <div className='card-img'>
                                <img src="images/flight-booking.jpg" alt='' className="w-full h-auto" />
                            </div>
                            <div className='flex justify-center text-center'>
                                <div className='text-3xl font-[600]'>&#8377;500<small style={{ fontSize: '15px' }}>/Per Person or Child</small></div>
                            </div>
                            <ul className='p-0 m-0 w-full'>
                                <li className='border-b border-b-slate-300 text-center py-4'>Urgent Delivery between 30 to 60 minutes.</li>
                                <li className='border-b border-b-slate-300 text-center py-4'>No Fee To Change Date </li>
                                <li className='text-center py-4'>Price is for oneway and round-trip. Flight reservation for multi-city available at extra cost.</li>
                            </ul>
                            <ScrollToTop smooth component={<button className="w-full border rounded-xl bg-[#ec601d] text-white font-bold py-3 hover:bg-white hover:text-black hover:border hover:border-[#ec601d]"> Get Started</button>} className='!static !w-full' ></ScrollToTop>
                        </div>

                        <div className='rounded-[20px] w-full sm:w-[80%] md:w-[45%] lg:w-[30%] xl:w-[25%] border-solid border-zinc-200 border-2 p-6 grid grid-rows gap-3 bg-white shadow-md'>
                            <h3 className='text-2xl sm:text-2.5xl md:text-2.5xl lg:text-2.5xl xl:text-2.5xl font-bold text-center'>Hotel Reservation</h3>
                            <div className='card-img'>
                                <img src="images/hotal-booking.jpg" alt='' className="w-full h-auto" />
                            </div>

                            <div className='flex justify-center text-center'>
                                <div className='text-3xl font-[600]'>&#8377;500<small style={{ fontSize: '15px' }}>/Per Person or Child</small></div>
                            </div>
                            <ul className='p-0 m-0 w-full'>
                                <li className='border-b border-b-slate-300 text-center py-4'>Urgent Delivery between 30 to 60 minutes.</li>
                                <li className='border-b border-b-slate-300 text-center py-4'>No Fee To Change Date </li>
                                <li className='text-center py-4'>Price is for one hotel booking. Hotel booking for multi city available at extra cost.</li>
                            </ul>
                            <ScrollToTop smooth component={<button className="w-full border rounded-xl bg-[#ec601d] text-white font-bold py-3 hover:bg-white hover:text-black hover:border hover:border-[#ec601d]"> Get Started</button>} className='!static !w-full' ></ScrollToTop>
                        </div>

                        <div className='rounded-[20px] w-full sm:w-[80%] md:w-[45%] lg:w-[30%] xl:w-[25%] border-solid border-zinc-200 border-2 p-6 grid grid-rows gap-3 bg-white shadow-md'>
                            <h3 className='text-2xl sm:text-2.5xl md:text-2.5xl lg:text-2.5xl xl:text-2.5xl font-bold text-center'>Travel Insurance</h3>
                            <div className='card-img'>
                                <img src="images/travelinsurance.png" alt='' className="w-full h-auto" />
                            </div>

                            <div className='flex justify-center text-center'>
                                <div className='text-3xl font-[600]'>&#8377;1500<small style={{ fontSize: '15px' }}>/Per Person or Child</small></div>
                                
                            </div>
                            <div className=' font-bold text-center'>For 6 Days</div>
                            <ul className='p-0 m-0 w-full'>
                                <li className='border-b border-b-slate-300 text-center py-4'>Urgent Delivery between 30 to 60 minutes.</li>
                                <li className='border-b border-b-slate-300 text-center py-4'>Affordable and accepted for visa and immigration.
                                </li>
                                <li className='border-b border-b-slate-300 text-center py-4'>Price is Including Consultant Charge.</li>
                                <li className='border-b border-b-slate-300 text-center py-4'>genuine insurance & Claim if you injured</li>
                            </ul>
                            <ScrollToTop smooth component={<button className="w-full border rounded-xl bg-[#ec601d] text-white font-bold py-3 hover:bg-white hover:text-black hover:border hover:border-[#ec601d]"> Get Started</button>} className='!static !w-full' ></ScrollToTop>
                        </div>

                    </div>

                </div>
            
        </section >

        </>
    )
}
export default PricingPlan;
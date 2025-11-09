import { LaptopMinimalCheck } from 'lucide-react';
import Navbar from '../Navbar/Navbar';
import LeftSide from '../Dummy-Tickets/LeftSide';
const InsurancePage = () => {
    return (
        <>

            <Navbar />
            <section className="custom-bg-section">
                <div className="w-full py-10 lg:bg-[rgba(255,255,255,0.1)]">
                    <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
                        {/* Mobile View - Title followed by search form */}
                        <div className="flex lg:hidden flex-col items-center text-center">
                            <h1 className="text-xl sm:text-4xl font-bold mb-6">
                                Get Verified Flight & Hotel Booking for Only ₹500
                            </h1>
                            <div className="w-full">
                                <LeftSide />
                            </div>
                        </div>

                        {/* Desktop View - Keeping exactly as original */}
                        <div className="hidden lg:flex flex-col lg:flex-row gap-6">
                            {/* Form - Top on mobile, right on desktop */}
                            <div className="w-full order-1 lg:order-2 lg:w-[40%]">
                                <LeftSide />
                            </div>

                            {/* Content - Bottom on mobile (centered), left on desktop */}
                            <div className="w-full order-2 lg:order-1 lg:w-[60%] flex flex-col items-center text-center lg:items-start lg:text-left justify-center gap-y-4 md:gap-y-6">
                                <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                                    Get Verified Flight & Hotel Booking for Only ₹500
                                </h1>
                                <p className="text-[#333] text-lg sm:text-xl font-medium max-w-[600px]">
                                    TripCafeTicket.com Resrevation, Perfect for visa applications, travel proof, or return confirmation.
                                    <span className="block">Quick, reliable, and hassle-free!</span>

                                </p>
                                <p> <b>500</b> tickets booked for <b>350+</b> happy customers</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Manual CSS for background image only */}
                <style jsx>{`
            .custom-bg-section {
              width: 100%;
              min-height: 90vh;
              background-image: url('images/HeaderBanner.jpg');
              background-repeat: no-repeat;
              background-size: cover;
              background-position: top center;
              background-attachment: fixed;
            }
            
            @media (min-width: 768px) {
              .custom-bg-section {
                background-image: url('images/HeaderBanner.jpg');
              }
            }
          `}</style>
            </section>

            <div className="px-36 py-10">
                <section>
                    <div className="flex flex-col lg:flex-row gap-10">
                        <div className="w-full lg:w-1/3">
                            <h3 className=" font-bold text-3xl w-[340px]">Cover All Your Travel Insurance Needs</h3>

                            <div className="mt-7 text-gray-700">
                                Bringing to you, comprehensive travel+medical insurance plans that cover all your travel needs. Whether you are travelling solo, with family or friends, we have a plan for you. Our plans cover trip cancellations, medical emergencies, lost luggage and more. Buy your travel insurance online and travel with peace of mind.
                            </div>
                        </div>
                        <div className="flex flex-1  lg:justify-end lg:items-center">
                            <div className="w-full lg:w-2/3 grid grid-cols-2 gap-4">
                                <div className='flex justify-center items-center border p-4 rounded-lg shadow-lg gap-2'>
                                    <span><LaptopMinimalCheck /></span>
                                    <p>Instant Policy Generation</p>
                                </div>
                                <div className='flex justify-center items-center border p-4 rounded-lg shadow-lg gap-2'>
                                    <span><LaptopMinimalCheck /></span>
                                    <p>Comprehensive Health Insurance Included</p>
                                </div>
                                <div className='flex justify-center items-center border p-4 rounded-lg shadow-lg gap-2'>
                                    <span><LaptopMinimalCheck /></span>
                                    <p>Worldwide Cashless hospitalisation</p>
                                </div>
                                <div className='flex justify-center items-center border p-4 rounded-lg shadow-lg gap-2'>
                                    <span><LaptopMinimalCheck /></span>
                                    <p>Value For Money</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
                <section className='mt-24'>
                    <div className='font-bold text-3xl'>
                        <p >What Kinds of Plans Are Available? </p>
                    </div>
                </section>
                <section className='mt-10'>
                    <div className=' flex  border px-3 rounded-lg shadow-lg p-3 bg-gradient-to-r from-cyan-100 to-blue-100'>
                        <div className='flex-1 flex flex-col gap-4'>
                            <p className='font-bold text-base '>Travel Insurance</p>
                            <div className='flex gap-6'>
                                <span className=' border-l-4 border-black '>
                                    <span className='ml-2'>
                                        Quick & easy claim process in simple 4 steps
                                    </span>

                                </span>
                                <span className='border-l-4 border-black '>
                                    <span className='ml-2'>
                                        100% Digital Claim & Settlement
                                    </span>

                                </span>
                            </div>
                            <p>Powered By</p>
                        </div>
                        <div>
                            Image here
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default InsurancePage;
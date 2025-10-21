import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'

const AboutUs = () => {
  return (
    <>
    <Navbar/>
    <section className='header-title sm:w-[100%] md:w-[100%] lg:w-[100%] xl:w-[100%] 2xl:w-[100%]  px-3  bg-no-repeat bg-cover  bg-center' style={{ backgroundImage: 'url(images/banner-bg-inn.jpg)' }}>
  
  <div className="md:container md:mx-auto px-3 sd:px-10  md:px-10 lg:px-10 xl:px-10 2xl:px-10 py-20">
        <div> <h1 className=" text-4xl md:text-6xl lg:text-6xl xl:text-6xl font-black text-white ">About Us</h1></div>
    </div>
  </section>

  <section className="sm:w-[100%] md:w-[100%] lg:w-[100%] xl:w-[100%] 2xl:w-[100%]  px-3 "   style={{background: 'linear-gradient(to bottom,  rgba(255,249,249,0) 25%,rgba(250,242,242,0) 34%,rgba(211,189,187,1) 100%)'}}>
           
           
           <div className="md:container md:mx-auto py-12 px-3 sd:px-10  md:px-10 lg:px-10 xl:px-10 2xl:px-10  ">
           <div className="flex flex-wrap gap-x-10 items-center ">
           
                <div className="left w-[100%] sm:w-[100%]  md:w-[40%]  lg:w-[40%] xl:w-[40%] font-bold">
                <div className="w-[100%]  sm:w-[100%]  md:w-[100%]  lg:w-[100%] xl:w-[100%] ">
                    <div className="experience-card bg-[#6a1b9a] text-white p-6 rounded-lg shadow-lg mb-6">
                      <h2 className="text-5xl font-bold mb-2">5+</h2>
                      <p className="text-xl">Years of Experience</p>
                    </div>
                    <img src='images/trevel-2.jpg' className='w-[100%]'  alt=""/>
                </div>
                </div>
                <div className="right sm:w-[100%] md:w-[56.5%] lg:w-[56.5%] xl:w-[56.5%] flex flex-col items-center justify-center gap-y-6 ">
                  <div className='w-full'>
                    <h2 className=" text-2xl md:text-4xl lg:text-4xl xl:text-4xl font-bold text-left w-full">Welcome to TripCafeHolidays.com</h2>
                    <h3 className=" text-xl  font-bold text-left w-full">Our mission is to simplify, expedite, and make the visa application process more affordable for you. ensuring a smooth and stress-free experience as you plan your international travels.</h3>
                  </div>
                  <p className='text-base'>TripCafe Holidays is everything about travel and travelers. At TripCafe Holidays, specialized in affordable, custom travel packages designed to suit every occasion—be it family holidays, destination weddings, honeymoons, educational tours, business trips, conventions, technical visits, or sports tours. With TripCafe Holidays, you get convenience, reliability, and the best prices for all your travel needs. We simplify travel by offering dummy hotels and flight tickets tailored to visa processing requirements. We also provide the requested travel services adhering to business ethics and industry regulations. We have a transparent and agile business process to fulfill your request on time.</p>
                  <h3 className=" text-xl  font-bold text-left w-full">Our Mission</h3>
                  <p className='text-base'>Making life easy for travelers – this is what defines TripCafe Holidays. Our customer engagement and service delivery model are designed to achieve this goal efficiently and reliably. Whether it is your first travel to a destination or a repeat visit, TripCafe Holidays ensures you always have a great experience to recall. And, everything comes at a highly competitive rate.</p>
                  
                  <h3 className=" text-xl  font-bold text-left w-full">Why TripCafe Holidays for your next travel?</h3>
                  <p className='text-base'>Your travel is not without a purpose and so is our existence at TripCafe Holidays. 
Our experts actively listen to your travel requirements to ensure we deliver services meeting your expectation. At TripCafe Holidays, we design affordable custom travel packages for family holidays, destination weddings, honeymoons, educational tours, business trips and conventions, technical visits, and sports tours. We also specialize in providing solo woman or women only tours. A dedicated travel counselor is assigned to plan and manage the entire vacation plan from initial enquiry with us to the completion of the trip.
IMPORTANT. We do not put you under any unnecessary obligation to make full payment for hotel booking or flight reservations. Instead, we issue a verifiable flight itinerary and hotel booking (also referred to as dummy reservation) that the authority needs to process your visa request. For this, we charge you the SERVICE FEE AND APPLICABLE TAXES ONLY. Once your visa is approved, you can buy your travel pacakges. There are no hidden charges to surprise at a later stage.
Whether you are a tourist, student, an employee, an individual seeking medical treatment, or a group of travelers, you can leave the fulfillment of visa, hotel, and flight reservations to us and commence on a hassle-free trip to India.</p>

                </div>
            </div>
            </div>
            
            </section> 
    <Footer/>

    </>
  )
}

export default AboutUs

import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <section className='header-title sm:w-[100%] md:w-[100%] lg:w-[100%] xl:w-[100%] 2xl:w-[100%]  px-3  bg-no-repeat bg-cover  bg-center' style={{ backgroundImage: 'url(images/AboutUsBanner.jpg)' }}>

        <div className="md:container md:mx-auto px-3 sd:px-10  md:px-10 lg:px-10 xl:px-10 2xl:px-10 py-20">
          {/* <div> <h1 className=" text-4xl md:text-6xl lg:text-6xl xl:text-6xl font-black text-[rgb(29,181,236)] ">About Us</h1></div> */}
        </div>
      </section>

      <section className="sm:w-[100%] md:w-[100%] lg:w-[100%] xl:w-[100%] 2xl:w-[100%]  px-3 " style={{ background: 'linear-gradient(to bottom,  rgba(255,249,249,0) 25%,rgba(250,242,242,0) 34%,rgba(211,189,187,1) 100%)' }}>


        <div className="md:container md:mx-auto py-12 px-3 sd:px-10  md:px-10 lg:px-10 xl:px-10 2xl:px-10  ">
          <div className="flex flex-wrap gap-x-10 items-center ">

            <div className="left w-[100%] sm:w-[100%]  md:w-[40%]  lg:w-[40%] xl:w-[40%] font-bold">
              <div className="w-[100%]  sm:w-[100%]  md:w-[100%]  lg:w-[100%] xl:w-[100%] ">
                <div className="experience-card bg-[#6a1b9a] text-white p-6 rounded-lg shadow-lg mb-6">
                  <h2 className="text-5xl font-bold mb-2">5+</h2>
                  <p className="text-xl">Years of Experience</p>
                </div>
                <img src='images/Why-Us.png' className='w-[100%]' alt="" />
              </div>
            </div>
            <div className="right sm:w-[100%] md:w-[56.5%] lg:w-[56.5%] xl:w-[56.5%] flex flex-col items-center justify-center gap-y-6 ">
              <div className='w-full'>
                <h2 className=" text-2xl md:text-4xl lg:text-4xl xl:text-4xl font-bold text-left w-full">Welcome to TripCafeTicket.com</h2>
                <h3 className=" text-xl  font-bold text-left w-full">At TripCafeTicket.com, our mission is simple — to make your visa application process faster, easier, and more affordable, ensuring a smooth and stress-free start to your international journey.</h3>
              </div>
              <p className='text-base'>We are passionate about travel and travelers. Our team specializes in creating affordable, customized travel packages for every occasion — from family vacations and destination weddings to honeymoons, educational tours, business trips, conventions, technical visits, and sports tours.
                Beyond travel packages, we also simplify the visa documentation process by offering valid dummy hotel and flight bookings that meet embassy requirements. Every service we offer is backed by transparency, reliability, and adherence to business ethics and travel regulations. With a quick, secure, and flexible process, we ensure your requests are fulfilled on time — every time.
              </p>
              <h3 className=" text-xl  font-bold text-left w-full">Our Mission</h3>
              <p className='text-base'>Making travel effortless.
                That’s the heart of TripCafeTicket.
                Our customer-focused approach and streamlined service model are built to make your travel experience seamless and worry-free. Whether you’re exploring a new destination or returning to a favorite one, TripCafeTicket ensures your journey is memorable — and always at a competitive price.
              </p>

              <h3 className=" text-xl  font-bold text-left w-full">Why TripCafeTicket for your next travel?</h3>
              <p className='text-base'>At TripCafeTicket, we understand that every journey has a purpose, and our goal is to help you fulfill it. Our travel experts carefully listen to your needs to craft solutions that perfectly match your expectations.
                We design personalized and budget-friendly travel packages for:
                Family holidays


                Destination weddings & honeymoons


                Educational & business tours


                Conventions & technical visits


                Sports and group tours


                Women-only & solo travel experiences


                Every customer is assigned a dedicated travel counselor who manages your journey from the first inquiry to your trip’s completion.
                We believe in complete flexibility and transparency — no unnecessary commitments or full prepayments. Instead, we provide verifiable flight itineraries and hotel bookings (dummy reservations) that meet visa processing standards. You only pay a service fee and applicable taxes. Once your visa is approved, you can confirm and purchase your actual travel arrangements with ease — no hidden charges, no surprises.
                Whether you’re a tourist, student, employee, patient, or group traveler, TripCafeTicket ensures a hassle-free experience — from visa assistance to flight and hotel reservations — so you can focus on what matters most: your journey.
              </p>

            </div>
          </div>
        </div>

      </section>
      <Footer />

    </>
  )
}

export default AboutUs

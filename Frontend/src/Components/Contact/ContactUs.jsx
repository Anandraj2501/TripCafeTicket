import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'

const ContactUs = () => {
  return (
    <>
      <Navbar />
      <section className='header-title sm:w-[100%] md:w-[100%] lg:w-[100%] xl:w-[100%] 2xl:w-[100%]   bg-no-repeat bg-cover  bg-center' style={{ backgroundImage: 'url(images/AboutUsBanner.jpg)' }}>

        <div className="md:container md:mx-auto px-3 sm:px-10  md:px-10 lg:px-10 xl:px-10 2xl:px-10 py-5  sm:py-10 md:py-15  lg:py-20 xl:py-20">
          {/* <div> <h1 className=" text-4xl md:text-6xl lg:text-6xl xl:text-6xl font-black text-white ">Contact Us</h1>
            <p className="text-white">Get in touch and let us know how we can help.</p>

          </div> */}
        </div>
      </section>

      <section className="sm:w-[100%] md:w-[100%] lg:w-[100%] xl:w-[100%] 2xl:w-[100%]  px-3 " style={{ background: 'linear-gradient(to bottom,  rgba(255,249,249,0) 25%,rgba(250,242,242,0) 34%,rgba(211,189,187,1) 100%)' }}>


        <div className="md:container md:mx-auto py-12 px-3 sd:px-10  md:px-10 lg:px-10 xl:px-10 2xl:px-10  ">
          <div className="flex flex-wrap gap-x-10 items-center justify-center ">

            <div className="left w-[100%] sm:w-[100%]  md:w-[40%]  lg:w-[40%] xl:w-[40%] font-bold">
              <div className="w-[100%]  sm:w-[100%]  md:w-[100%]  lg:w-[100%] xl:w-[100%] ">
                <img src='images/contactUs.png' className='w-[100%]' alt="" />
              </div>
              <div className='w-[100%] text-center py-3'>
                <h2 className='text-[2rem]'>Help & Support</h2>
                <p className='text-[1rem] font-light'>If you have need any help related to flight or hotel reservation, feel free to contact us</p>

              </div>
            </div>
            <div className="right sm:w-[100%] md:w-[40%] lg:w-[40%] xl:w-[40%] flex flex-col items-center justify-center gap-y-6 ">
              <div className=' w-full text-center grid gap-y-2'>
                <div className='w-[80px] mx-[auto]'><img src='images/email.svg' alt='' /></div>
                <a href="bookings@tripcafeticket.com" className="bg-[#fff] text-[#000000] text-[1.3rem] hover:text-[#fff] mx-[auto] inline-block hover:bg-[#cc2c21] p-3 px-6 mt-2 rounded-md text-center">bookings@tripcafeticket.com</a>
                <a  href="tel:+919821715233" className="bg-[#fff] text-[#000000] text-[1.3rem] hover:text-[#fff] mx-[auto] inline-block hover:bg-[#cc2c21] p-3 px-6 mt-2 rounded-md text-center">+91 9821715233</a>
                {/* <div className='flex items-center gap-2 mx-[auto] justify-center'><div className='w-[40px]'><img src='images/loction.svg' alt='' /></div><label>Office Address - 33 Office 2nd Floor, Supremework EROS City Square, Sector 49 Gurgaon Haryana 122018</label></div> */}
                <div className='flex items-center gap-2 mx-[auto] justify-center'><div className='w-[40px]'></div><label>Office Address - 4/1, Prem Nagar, Janakpuri, New Delhi, Delhi, 110058</label></div>
              </div>

            </div>



          </div>
        </div>
        <div className="md:container md:mx-auto py-12 px-3 sd:px-10  md:px-10 lg:px-10 xl:px-10 2xl:px-10  ">

          <div className='w-[100%] sm:w-[50%] md:w-[50%] lg:w-[50%] xl:w-[50%] mx-auto bg-[#fff] p-5  rounded-md'>
            <div className='font-[1rem] font-[#333] mb-3 text-center'>If you haven't received your reservation,no need to worry<br />Simply type in your email address and download your reservation once again from the link below.</div>
            <div class="mt-8 gap-y-3 flex  flex-col">
              <select class="dropdown border border-1 border-[#bebebe] rounded-md p-3 focus:border-[#cc2c21]" name="BookingType">
                <option value="" disabled="">Booking Type</option>
                <option value="flight">Flight</option>
                <option value="hotel">Hotel</option>
              </select>

              <input type="text" className="w-full text-[.8rem] outline-none border border-1 border-[#bebebe] focus:border-[#cc2c21] rounded-md p-3" placeholder='Email' />


              <input type="text" className="w-full text-[.8rem] outline-none border border-1 border-[#bebebe] focus:border-[#cc2c21] rounded-md p-3" placeholder='Name' />
              <textarea className="w-full text-[.8rem] outline-none border border-1 border-[#bebebe] focus:border-[#cc2c21] rounded-md p-3" id="message" name="msg" placeholder="Message*"></textarea>
              <div className='w-full text-center'>
                <button className="bg-[#cc2c21]  hover:bg-[#ad0e03] text-white p-3 px-7 mt-2 rounded-md  text-center">Submit</button></div>
            </div>
          </div>
        </div>
      </section>
      <Footer />

    </>
  )
}

export default ContactUs

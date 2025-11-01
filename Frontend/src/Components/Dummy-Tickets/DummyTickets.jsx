import { useState } from "react";
import LeftSide from "./LeftSide";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import Flifghtslider from "./Flifghtslider";
import Steps from "./Steps";
import VisaContent from "./VisaContent";
import PricingPlan from "./PricingPlan";
import Testimonials from "./Testimonials";
import AnnouncementBar from "../Add/AnnouncementBar";

const DummyTickets = () => {
  const [activeButton, setActiveButton] = useState('Flight');

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

      <Flifghtslider />
      <Steps />
      <VisaContent />
      <PricingPlan />
      <Testimonials />
      <Footer />
    </>
  )
}

export default DummyTickets;
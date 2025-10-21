import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import DownloadTicketPage from "./DownloadTicketPage";

const PaymentSuccess = () => {
  const { id } = useParams();
  const [bookingdata, setBookingData] = useState(null);
  const [status, setStatus] = useState(null);

  const getBookingData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NODE_ENV === "development"
          ? process.env.REACT_APP_DEV_BACKEND_URL
          : process.env.REACT_APP_PRODUCTION_BACKEND_URL
        }/booking/getSuccessBookingDataById/${id}`
      );
      setBookingData(response?.data);
      setStatus(response?.data.status);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getBookingData();
  }, []);

  const PaymentCard = ({ children }) => (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      {children}
    </div>
  );

  if (status === "paid") {
    return (
      <>
        <Navbar />
        <section className="w-full px-3 py-10 bg-gradient-to-b from-white via-gray-50 to-gray-200">
          <div className="container mx-auto max-w-3xl">
            <PaymentCard>


              {/* User info & details */}
              <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                  Hello, {bookingdata?.firstname}!
                </h1>
                <p className="mb-6 text-gray-700">
                  Your Dummy Flight Ticket from{" "}
                  <span className="font-bold">
                    {bookingdata?.travellingDetails.from}
                  </span>{" "}
                  to{" "}
                  <span className="font-bold">
                    {bookingdata?.travellingDetails.to}
                  </span>{" "}
                  is{" "}
                  <span className="text-green-600 font-bold">confirmed</span>.
                  <br />
                  You will receive your ticket on your registered email shortly.
                </p>
                {/* 🔥 Full row slim download bar */}
                <DownloadTicketPage id={id} booking={bookingdata}>
                  <div className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold text-center text-sm sm:text-base py-2 cursor-pointer transition">
                    Download Ticket
                  </div>
                </DownloadTicketPage>
                {/* Payment Details */}
                <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">
                  Payment Details
                </h2>
                <div className="space-y-2 mb-6 text-sm sm:text-base">
                  <div className="flex flex-wrap">
                    <span className="font-extrabold mr-2">Transaction ID:</span>
                    <span>{bookingdata?.transactionId}</span>
                  </div>
                  <div className="flex flex-wrap">
                    <span className="font-extrabold mr-2">Reference ID:</span>
                    <span>{bookingdata?.referenceId}</span>
                  </div>
                  <div className="flex flex-wrap">
                    <span className="font-extrabold mr-2">Booked on:</span>
                    <span>
                      {bookingdata?.createdAt
                        ? new Intl.DateTimeFormat("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        }).format(new Date(bookingdata.createdAt))
                        : "N/A"}
                    </span>
                  </div>
                </div>

                {/* User Details */}
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm sm:text-base">
                  <li className="bg-gray-100 p-3 rounded">
                    <span className="font-extrabold mr-2">Amount:</span> ₹
                    {bookingdata?.amount}
                  </li>
                  <li className="bg-gray-100 p-3 rounded">
                    <span className="font-extrabold mr-2">Name:</span>
                    {bookingdata?.firstname}
                  </li>
                  <li className="bg-gray-100 p-3 rounded sm:col-span-2">
                    <span className="font-extrabold mr-2">Email:</span>
                    {bookingdata?.email}
                  </li>
                </ul>
              </div>
            </PaymentCard>
          </div>

          <div className="container mx-auto max-w-3xl mt-4">
            <div className="bg-white shadow-md rounded-lg overflow-hidden p-6">
              <p className=" text-gray-600 text-sm ">
                For any queries or urgent support, feel free to reach out:
              </p>
              <div className=" text-gray-800 text-sm mt-2">
                <ul>
                  <li>📞 Contact Support: +91 9821715233</li>
                  <li>💬 WhatsApp: Click Here</li>
                  <li>📧 Email: dummytickets@tripcafe.net</li>
                </ul>

              </div>
              <p className=" text-gray-600 text-sm mt-2">
                We’re here to help you with smooth and hassle-free
              </p>
            </div>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  return null;
};

export default PaymentSuccess;

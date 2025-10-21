import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { FaRegCreditCard, FaUserCircle, FaPhoneAlt, FaEnvelope, FaBed, FaCalendarAlt } from "react-icons/fa";
import { MdHotel } from "react-icons/md";

const HotelPaymentPage = () => {
    const location = useLocation();
    const initialData = location.state || {};
    const [hash, setHash] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Generate unique transaction ID
    const generateTxnId = () => {
        const timestamp = Date.now().toString();
        const randomString = Math.random().toString(36).slice(2, 11);
        return timestamp + randomString;
    };
    const [txnid, setTxnid] = useState(generateTxnId());
    const [bookingData, setBookingData] = useState({ ...initialData, txnid });

    const pricePerPerson = 500;
    const totalAmount = pricePerPerson * (initialData?.passengers?.length || 1);

   

    const initiateRazorpayPayment = async () => {
        setLoading(true);
        try {
            const response = await axios.post(`${process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_BACKEND_URL : process.env.REACT_APP_PRODUCTION_BACKEND_URL}/initiatePayment/hotelrazorpay`, JSON.stringify(bookingData), {
                headers: {
                    "Content-Type": "application/json"
                },
            });
            if (response.status === 200) {
                try{

                    
                    const { amount, currency, id } = response.data.order;
                    var options = {
                        "key": process.env.NODE_ENV === 'development'? process.env.REACT_APP_RAZORPAY_TESTKEY  : process.env.REACT_APP_RAZORPAY_LIVEKEY, // Enter the Key ID generated from the Dashboard
                        "amount": amount.toString(), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                        "currency": currency,
                        "description": "Hotel Booking",
                        "order_id": id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                        "callback_url": `${process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_BACKEND_URL : process.env.REACT_APP_PRODUCTION_BACKEND_URL}/initiatePayment/verifyRazorpayPayment/${bookingData?.txnid}`, //This is the URL where Razorpay will send the payment status
                        "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                            "name": initialData?.contactDetails?.name, //your customer's name
                            "email": initialData?.contactDetails?.email,
                            "contact": initialData?.contactDetails?.phone//Provide the customer's phone number for better conversion rates 
                        },
                    };
                    const rzp1 = new window.Razorpay(options);
                    rzp1.open();
                }catch (error) {
                    setError(error.message);
                }

            } else {
                setError("Failed to initiate Razorpay payment. Please try again.");
            }
        } catch (error) {
            // //console.error("Payment initiation error:", error);
            setError("Failed to initialize Razorpay payment. Please try again.");

        } finally {
            setLoading(false);
        }
    }





    return (
        <>
            <Navbar />
            <section className="min-h-screen bg-gradient-to-b from-white via-white to-orange-100/60 py-8 px-[5.5%]">
                <div className="w-full max-w-5xl mx-auto">
                    <h2 className="text-left font-bold text-3xl md:text-4xl text-[#ec601d] mb-10 pb-2 border-b-2 border-orange-200 inline-block">
                        Review Booking
                    </h2>

                    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#ec601d]/20">
                        {/* Ticket header */}
                        <div className="bg-[#ec601d] py-5 px-6 text-white">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div>
                                    <h1 className="text-2xl font-bold">Hello, {initialData?.contactDetails?.name}!</h1>
                                    <p className="text-white/90 mt-1">Please Review your Hotel Booking Details</p>
                                </div>
                                <div className="flex items-center bg-white/10 rounded-lg px-4 py-2">
                                    <MdHotel className="text-white text-xl mr-2" />
                                    <span className="font-medium">TRANSACTION ID: {txnid}</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 md:p-8">
                            {/* Payment details */}
                            <div className="mb-8">
                                <h3 className="text-xl font-semibold text-[#162856] mb-4 flex items-center">
                                    <FaRegCreditCard className="mr-2 text-[#ec601d]" /> Payment Details
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-gray-50 rounded-lg p-4 flex items-center border border-gray-100 hover:border-[#ec601d]/20 transition-all">
                                        <div className="w-10 h-10 rounded-full bg-[#ec601d]/10 flex items-center justify-center text-[#ec601d] mr-4">₹</div>
                                        <div>
                                            <p className="text-sm text-gray-500">Amount</p>
                                            <p className="font-semibold text-[#162856]">₹{totalAmount}</p>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 rounded-lg p-4 flex items-center border border-gray-100 hover:border-[#ec601d]/20 transition-all">
                                        <div className="w-10 h-10 rounded-full bg-[#ec601d]/10 flex items-center justify-center text-[#ec601d] mr-4">
                                            <FaUserCircle />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Name</p>
                                            <p className="font-semibold text-[#162856] truncate">{initialData?.contactDetails?.name}</p>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 rounded-lg p-4 flex items-center border border-gray-100 hover:border-[#ec601d]/20 transition-all">
                                        <div className="w-10 h-10 rounded-full bg-[#ec601d]/10 flex items-center justify-center text-[#ec601d] mr-4">
                                            <FaPhoneAlt />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Phone</p>
                                            <p className="font-semibold text-[#162856]">{initialData?.contactDetails?.phone}</p>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 rounded-lg p-4 flex items-center border border-gray-100 hover:border-[#ec601d]/20 transition-all">
                                        <div className="w-10 h-10 rounded-full bg-[#ec601d]/10 flex items-center justify-center text-[#ec601d] mr-4">
                                            <FaEnvelope />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Email</p>
                                            <p className="font-semibold text-[#162856] truncate">{initialData?.contactDetails?.email}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Passengers section */}
                            <div className="mb-8">
                                <h3 className="text-xl font-semibold text-[#162856] mb-4 flex items-center">
                                    <FaUserCircle className="mr-2 text-[#ec601d]" /> Guests
                                </h3>
                                <div className="bg-gray-50 rounded-lg border border-gray-100">
                                    <div className="bg-gray-100 py-3 px-4 rounded-t-lg border-b border-gray-200">
                                        <div className="grid grid-cols-12 font-medium text-[#162856]">
                                            <div className="col-span-1">#</div>
                                            <div className="col-span-11">Guest Name</div>
                                        </div>
                                    </div>
                                    <div className="divide-y divide-gray-100">
                                        {initialData?.passengers?.map((passenger, index) => (
                                            <div key={index} className="py-3 px-4 hover:bg-white transition-colors">
                                                <div className="grid grid-cols-12 items-center">
                                                    <div className="col-span-1">
                                                        <div className="w-8 h-8 rounded-full bg-[#ec601d]/10 flex items-center justify-center text-[#ec601d] font-medium">
                                                            {index + 1}
                                                        </div>
                                                    </div>
                                                    <div className="col-span-11 font-medium text-[#162856]">
                                                        {passenger.title} {passenger.firstName} {passenger.lastName}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Hotel details */}
                            <div className="mb-8">
                                <h3 className="text-xl font-semibold text-[#162856] mb-4 flex items-center">
                                    <FaBed className="mr-2 text-[#ec601d]" /> Hotel Details
                                </h3>

                                <div className="bg-gray-50 rounded-lg p-5 border border-gray-100 mb-4">
                                    <div className="flex items-center">
                                        <div className="w-12 h-12 rounded-full bg-[#ec601d]/10 flex items-center justify-center text-[#ec601d] mr-4">
                                            <MdHotel className="text-xl" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-lg text-[#162856]">Dummy - Hotel Booking - {initialData?.city} - {initialData?.hotelInfo?.name}</h4>
                                            <p className="text-gray-500">Reservation for {initialData?.passengers?.length || 1} guest(s)</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Price details */}
                                <div className="bg-gray-50 rounded-lg p-5 border border-gray-100">
                                    <h4 className="font-medium text-[#162856] mb-3">Price Details</h4>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Room × {initialData?.passengers?.length || 1}</span>
                                            <span>₹{pricePerPerson * (initialData?.passengers?.length || 1)}</span>
                                        </div>
                                        <div className="pt-2 border-t border-dashed border-gray-200 flex justify-between font-medium">
                                            <span>Total Amount</span>
                                            <span className="text-[#ec601d]">₹{totalAmount}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Payment button */}
                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6">
                                    {error}
                                </div>
                            )}

                            {bookingData?.selectedPaymentMethod === "PhonePe" ? (
                                <div className="flex justify-center">
                                 
                                    <button
                                        type="button"
                                        className="bg-[#ec601d] hover:bg-[#d15518] text-white font-bold text-lg py-4 px-10 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#ec601d] focus:ring-opacity-50 flex items-center justify-center"
                                        // onClick={initiatePhonePePayment}
                                    >
                                        <FaRegCreditCard className="mr-2" /> Proceed to Payment
                                    </button>
                                </div>
                            ) : bookingData?.selectedPaymentMethod === "Razorpay" ? (
                                <div className="flex justify-center">
                                    <button
                                        type="button"
                                        className="bg-[#ec601d] hover:bg-[#d15518] text-white font-bold text-lg py-4 px-10 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#ec601d] focus:ring-opacity-50 flex items-center justify-center"
                                        onClick={initiateRazorpayPayment} // Make sure you have this function defined
                                    >
                                        <FaRegCreditCard className="mr-2" /> Proceed to Payment
                                    </button>
                                </div>
                            ) : (hash && (
                                <form action={process.env.NODE_ENV === 'development' ? process.env.REACT_APP_PAYU_TEST_URL : process.env.REACT_APP_PAYU_PROD_URL} method="post" className="mt-8">
                                    <input type="hidden" name="key" value="d9BcuQ" />
                                    <input type="hidden" name="txnid" value={txnid} />
                                    <input type="hidden" name="amount" value={bookingData?.amount} />
                                    <input type="hidden" name="productinfo" value="hotelBooking" />
                                    <input type="hidden" name="firstname" value={bookingData?.contactDetails?.name} />
                                    <input type="hidden" name="email" value={bookingData?.contactDetails?.email} />
                                    <input type="hidden" name="hash" value={hash} />
                                    <input type="hidden" name="surl" value={`${process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_BACKEND_URL : process.env.REACT_APP_PRODUCTION_BACKEND_URL}/initiatePayment/hotelpaymentSuccess`} />
                                    <input type="hidden" name="furl" value={`${process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_BACKEND_URL : process.env.REACT_APP_PRODUCTION_BACKEND_URL}/initiatePayment/failed`} />

                                    <div className="flex justify-center">
                                        <button
                                            type="submit"
                                            className="bg-[#ec601d] hover:bg-[#d15518] text-white font-bold text-lg py-4 px-10 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#ec601d] focus:ring-opacity-50 flex items-center justify-center"
                                        >
                                            <FaRegCreditCard className="mr-2" /> Proceed to Payment
                                        </button>
                                    </div>
                                </form>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default HotelPaymentPage;




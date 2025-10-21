import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { HiMiniArrowRight } from "react-icons/hi2";
import { IoAirplane } from "react-icons/io5";
import { FaRegCreditCard, FaUserCircle, FaPhoneAlt, FaEnvelope, FaRegCalendarAlt, FaExchangeAlt } from "react-icons/fa";
import { MdFlight, MdAirplaneTicket } from "react-icons/md";

const PaymentComponent = () => {
    const navigate = useNavigate();

    const generateTxnId = () => {
        const timestamp = Date.now().toString();
        const randomString = Math.random().toString(36).substr(2, 9);
        return timestamp + randomString;
    };

    const location = useLocation();
    const { amount, name, phone, email, passengers, travellingDetails, flightDetails, purpose, travelClass, selectedPaymentMethod,addOnDetails } = location.state || {};
    const [hash, setHash] = useState(null);
    const [txnid, setTxnid] = useState(generateTxnId());
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    //console.log(selectedPaymentMethod)
    const isPaymentRequested = useRef(false);
    console.log("PaymentComponent location state:", location.state.flightDetails);
    const data = {
        txnid,
        amount,
        productinfo: `dummyTicket - ${purpose}`,
        firstname: name,
        phone,
        travelClass,
        udf1: JSON.stringify(passengers),
        udf2: JSON.stringify(travellingDetails),
        udf3: JSON.stringify(flightDetails),
        email,
        addOnDetails
    };



    const initiateRazorpayPayment = async () => {
        setLoading(true);
        console.log("Initiating Razorpay payment with data:", data);
        try {
           
            const response = await axios.post(`${process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_BACKEND_URL : process.env.REACT_APP_PRODUCTION_BACKEND_URL}/initiatePayment/flightrazorpay`, JSON.stringify(data), {
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
                        "description": "Flight Booking",
                        "order_id": id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                        "callback_url": `${process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_BACKEND_URL : process.env.REACT_APP_PRODUCTION_BACKEND_URL}/initiatePayment/verifyflightPayment/${data?.txnid}`, //This is the URL where Razorpay will send the payment status
                        "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                            "name": name, //your customer's name
                            "email": email,
                            "contact": phone//Provide the customer's phone number for better conversion rates 
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

    // useEffect(() => {
    //     const initiatePayment = async () => {
    //         if (!isPaymentRequested.current) {
    //             await paymentReq();
    //             isPaymentRequested.current = true;
    //         }
    //     };
    //     if (selectedPaymentMethod === "PayU") initiatePayment();
    // }, []);



    return (
        <>
            <Navbar />
            <section className="min-h-screen bg-gradient-to-b from-white via-white to-orange-100/60 py-8 px-[5.5%]">
                <div className="w-full max-w-5xl mx-auto">
                    <h2 className="text-left font-bold text-3xl md:text-4xl text-[#ec601d] mb-10 pb-2 border-b-2 border-orange-200 inline-block">
                        Review Ticket
                    </h2>

                    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#ec601d]/20">
                        {/* Ticket header */}
                        <div className="bg-[#ec601d] py-5 px-6 text-white">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div>
                                    <h1 className="text-2xl font-bold">Hello, {name}!</h1>
                                    <p className="text-white/90 mt-1">Please Review your Ticket Details</p>
                                </div>
                                <div className="flex items-center bg-white/10 rounded-lg px-4 py-2">
                                    <MdAirplaneTicket className="text-white text-xl mr-2" />
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
                                            <p className="font-semibold text-[#162856]">₹{amount}</p>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 rounded-lg p-4 flex items-center border border-gray-100 hover:border-[#ec601d]/20 transition-all">
                                        <div className="w-10 h-10 rounded-full bg-[#ec601d]/10 flex items-center justify-center text-[#ec601d] mr-4">
                                            <FaUserCircle />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Name</p>
                                            <p className="font-semibold text-[#162856] truncate">{name}</p>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 rounded-lg p-4 flex items-center border border-gray-100 hover:border-[#ec601d]/20 transition-all">
                                        <div className="w-10 h-10 rounded-full bg-[#ec601d]/10 flex items-center justify-center text-[#ec601d] mr-4">
                                            <FaPhoneAlt />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Phone</p>
                                            <p className="font-semibold text-[#162856]">{phone}</p>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 rounded-lg p-4 flex items-center border border-gray-100 hover:border-[#ec601d]/20 transition-all">
                                        <div className="w-10 h-10 rounded-full bg-[#ec601d]/10 flex items-center justify-center text-[#ec601d] mr-4">
                                            <FaEnvelope />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Email</p>
                                            <p className="font-semibold text-[#162856] truncate">{email}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Passengers section */}
                            <div className="mb-8">
                                <h3 className="text-xl font-semibold text-[#162856] mb-4 flex items-center">
                                    <FaUserCircle className="mr-2 text-[#ec601d]" /> Passengers
                                </h3>
                                <div className="bg-gray-50 rounded-lg border border-gray-100">
                                    <div className="bg-gray-100 py-3 px-4 rounded-t-lg border-b border-gray-200">
                                        <div className="grid grid-cols-12 font-medium text-[#162856]">
                                            <div className="col-span-1">#</div>
                                            <div className="col-span-11">Passenger Name</div>
                                        </div>
                                    </div>
                                    <div className="divide-y divide-gray-100">
                                        {passengers?.map((passenger, index) => (
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

                            {/* Travel details */}
                            <div className="mb-8">
                                <h3 className="text-xl font-semibold text-[#162856] mb-4 flex items-center">
                                    <MdFlight className="mr-2 text-[#ec601d]" /> Travel Details
                                </h3>

                                {/* Journey */}
                                <div className="bg-gray-50 rounded-lg p-5 border border-gray-100 mb-4">
                                    <div className="grid grid-cols-11 gap-2">
                                        <div className="col-span-5">
                                            <div className="bg-[#ec601d]/90 text-white p-4 rounded-lg">
                                                <p className="text-sm text-white/80 mb-1">From</p>
                                                <p className="font-bold truncate">{travellingDetails?.from}</p>
                                            </div>
                                        </div>

                                        <div className="col-span-1 flex items-center justify-center">
                                            <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#ec601d]">
                                                <HiMiniArrowRight className="w-5 h-5" />
                                            </div>
                                        </div>

                                        <div className="col-span-5">
                                            <div className="bg-[#ec601d]/90 text-white p-4 rounded-lg">
                                                <p className="text-sm text-white/80 mb-1">To</p>
                                                <p className="font-bold truncate">{travellingDetails?.to}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Travel dates */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-gray-50 rounded-lg p-4 flex items-center border border-gray-100">
                                        <div className="w-10 h-10 rounded-full bg-[#ec601d]/10 flex items-center justify-center text-[#ec601d] mr-4">
                                            <FaRegCalendarAlt />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Departure Date</p>
                                            <p className="font-semibold text-[#162856]">
                                                {new Date(travellingDetails?.departureDate).toLocaleDateString('en-GB', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                    </div>

                                    {travellingDetails?.returnDate && (
                                        <div className="bg-gray-50 rounded-lg p-4 flex items-center border border-gray-100">
                                            <div className="w-10 h-10 rounded-full bg-[#ec601d]/10 flex items-center justify-center text-[#ec601d] mr-4">
                                                <FaRegCalendarAlt />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Return Date</p>
                                                <p className="font-semibold text-[#162856]">
                                                    {new Date(travellingDetails?.returnDate).toLocaleDateString('en-GB', {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        year: 'numeric'
                                                    })}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    <div className="bg-gray-50 rounded-lg p-4 flex items-center border border-gray-100">
                                        <div className="w-10 h-10 rounded-full bg-[#ec601d]/10 flex items-center justify-center text-[#ec601d] mr-4">
                                            <FaExchangeAlt />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Trip Type</p>
                                            <p className="font-semibold text-[#162856]">{travellingDetails?.tripType}</p>
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
                            {selectedPaymentMethod === "PhonePe" ? (
                                <div className="flex flex-col items-center">
                                    <div className="text-sm text-[#162856] bg-[#ec601d]/5 px-3 py-1 rounded-md mb-3">
                                        Pay through UPI and get cashback
                                    </div>
                                    <button
                                        type="button"
                                        className="bg-[#ec601d] hover:bg-[#d15518] text-white font-bold text-lg py-4 px-10 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#ec601d] focus:ring-opacity-50 flex items-center justify-center"
                                        // onClick={initiatePhonePePayment}
                                    >
                                        <FaRegCreditCard className="mr-2" /> Proceed to Payment
                                    </button>
                                </div>
                            ) : selectedPaymentMethod === "Razorpay" ? (
                                <div className="flex flex-col items-center">
                                    <div className="text-sm text-[#162856] bg-[#ec601d]/5 px-3 py-1 rounded-md mb-3">
                                        Pay through UPI and get cashback
                                    </div>
                                    <button
                                        type="button"
                                        className="bg-[#ec601d] hover:bg-[#d15518] text-white font-bold text-lg py-4 px-10 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#ec601d] focus:ring-opacity-50 flex items-center justify-center"
                                        onClick={initiateRazorpayPayment} // Make sure you have this function defined
                                    >
                                        <FaRegCreditCard className="mr-2" /> Proceed to Payment
                                    </button>
                                </div>
                            ) :
                                (
                                    hash && (
                                        <form action={process.env.NODE_ENV === 'development' ? process.env.REACT_APP_PAYU_TEST_URL : process.env.REACT_APP_PAYU_PROD_URL} method="post" className="mt-8">
                                            <input type="hidden" name="key" value={process.env.NODE_ENV === 'development' ? process.env.REACT_APP_PAYU_TEST_KEY : process.env.REACT_APP_PAYU_PROD_KEY} />
                                            <input type="hidden" name="txnid" value={txnid} />
                                            <input type="hidden" name="amount" value={amount} />
                                            <input type="hidden" name="productinfo" value={`dummyTicket - ${purpose}`} />
                                            <input type="hidden" name="firstname" value={name} />
                                            <input type="hidden" name="email" value={email} />
                                            <input type="hidden" name="hash" value={hash} />
                                            <input type="hidden" name="udf1" value={JSON.stringify(passengers)} />
                                            <input type="hidden" name="udf2" value={JSON.stringify(travellingDetails)} />
                                            <input type="hidden" name="surl" value={`${process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_BACKEND_URL : process.env.REACT_APP_PRODUCTION_BACKEND_URL}/initiatePayment/success`} />
                                            <input type="hidden" name="furl" value={`${process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_BACKEND_URL : process.env.REACT_APP_PRODUCTION_BACKEND_URL}/initiatePayment/failed`} />

                                            <div className="flex flex-col items-center">
                                                <div className="text-sm text-[#162856] bg-[#ec601d]/5 px-3 py-1 rounded-md mb-3">
                                                    Pay through UPI and get cashback
                                                </div>
                                                <div className="flex justify-center">
                                                    
                                                    <button
                                                        type="submit"
                                                        className="bg-[#ec601d] hover:bg-[#d15518] text-white font-bold text-lg py-4 px-10 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#ec601d] focus:ring-opacity-50 flex items-center justify-center"
                                                    >
                                                        <FaRegCreditCard className="mr-2" /> Proceed to Payment
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    )
                                )}
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default PaymentComponent;


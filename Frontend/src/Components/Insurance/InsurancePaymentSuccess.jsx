import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import ReviewForm from '../Payment/ReviewForm';
// import ReviewForm from './ReviewForm';

const InsurancePaymentSuccess = () => {

    const { id } = useParams();
    const [bookingdata, setBookingData] = useState();
    const [status, setStatus] = useState(null);

    const getBookingData = async () => {
        try {
            const response = await axios.get(`${process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_BACKEND_URL : process.env.REACT_APP_PRODUCTION_BACKEND_URL}/booking/getinsurancebookingdatabyid/${id}`);
            // console.log(response);
            setBookingData(response?.data);
            setStatus(response?.data.status);
        } catch (error) {
            // console.log(error);
        }
    }

    useEffect(() => {
        getBookingData();
    }, [])

    if (status === "paid") {
        return (
            <>
                <Navbar />
                <section className="sm:w-[100%] md:w-[100%] lg:w-[100%] xl:w-[100%] 2xl:w-[100%] px-3 " style={{ background: 'linear-gradient(to bottom,  rgba(255,249,249,0) 25%,rgba(250,242,242,0) 34%,rgba(211,189,187,1) 100%)' }} >
                    <div className="container mx-auto sm:w-[60%] md:w-[60%] lg:w-[60%] xl:w-[60%] 2xl:w-[60%] px-[2%] sm:px-[5.5%] md:px-[5.5%] lg:px-[5.5%] xl:px-[5.5%] py-10">
                        <div className="bg-white shadow-md rounded-lg p-6">
                            <div className="w-full">
                                <h1 className="text-2xl font-bold mb-4">Hello, {bookingdata?.contactDetails.name}!</h1>
                                <p>Your Insurance Booking Payment is <span className=" text-green-500 font-bold">Confirmed</span>. You will recieve your insurance on your email soon.</p>
                            </div>

                            <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
                            <div className="payment-details">
                                <div className="mb-2 uppercase flex"><label className="font-extrabold">Transaction ID: &nbsp;</label><span className="font-extrabold">{bookingdata?.transactionId}</span></div>
                                <div className="mb-2 uppercase flex"><label className="font-extrabold">Reference ID: &nbsp;</label><span className="font-extrabold">{bookingdata?.referenceId}</span></div>
                                <div className="mb-2 uppercase flex"><label className="font-extrabold">Booked on: &nbsp;</label><span className="font-extrabold">{bookingdata?.createdAt
                                    ? new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(bookingdata.createdAt))
                                    : "N/A"}</span></div>
                                <ul className="w-full gap-1 grid grid-cols-2">
                                    <li className="bg-[#f3f3f3] p-2 flex"><label className="font-extrabold ">Amount: </label> &#8377;{400}</li>
                                    <li className="bg-[#f3f3f3] p-2 flex"><label className="font-extrabold ">Name: </label> {bookingdata?.contactDetails.name}</li>
                                    {/* <li className="bg-[#f3f3f3] p-2 flex"><label className="font-extrabold ">Phone:</label> {phone}</li> */}
                                    <li className="bg-[#f3f3f3] p-2 flex"><label className="font-extrabold ">Email: </label> {bookingdata?.contactDetails.email}</li>
                                </ul>
                            </div>
                        </div>
                        {/* <ReviewForm bookingdata={bookingdata}/> */}
                    </div>

                </section>
                <Footer />
            </>
        )
    }
    else if (status === "failed") {
        return (
            <>
                <Navbar />
                <section className="sm:w-[100%] md:w-[100%] lg:w-[100%] xl:w-[100%] 2xl:w-[100%] px-3 h-screen" style={{ background: 'linear-gradient(to bottom,  rgba(255,249,249,0) 25%,rgba(250,242,242,0) 34%,rgba(211,189,187,1) 100%)' }} >
                    <div className="container mx-auto sm:w-[60%] md:w-[60%] lg:w-[60%] xl:w-[60%] 2xl:w-[60%] px-[2%] sm:px-[5.5%] md:px-[5.5%] lg:px-[5.5%] xl:px-[5.5%] py-10">
                        <div className="bg-white shadow-md rounded-lg p-6">
                            <div className="w-full">
                                <h1 className="text-2xl font-bold mb-4">Hello, {bookingdata?.contactDetails.name}!</h1>
                                <p>Your Dummy Hotel Ticket for {bookingdata?.city} Booking Payment is <span className=" text-red-500 font-bold">Failed</span>. Sorry for the inconvenience caused, you can try making the payment on TripCafe Holiday's UPI ID: <span className=" font-bold">m22ixzctr8tty@ybl
                                </span>  Once You make payment then please share the screenshot of your payment proof on  <span className=" font-bold">dummytickets@tripcafe.net</span>, this will help us to send you ticket ASAP to you on your email id. </p>
                            </div>
                            <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
                            <div className="payment-details">
                                <div className="mb-2 uppercase flex"><label className="font-extrabold">Transaction ID: &nbsp;</label><span className="font-extrabold">{bookingdata?.transactionId}</span></div>
                                <div className="mb-2 uppercase flex"><label className="font-extrabold">Booked on: &nbsp;</label><span className="font-extrabold">{bookingdata?.createdAt
                                    ? new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(bookingdata.createdAt))
                                    : "N/A"}</span></div>
                                <ul className="w-full gap-1 grid grid-cols-2">
                                    <li className="bg-[#f3f3f3] p-2 flex"><label className="font-extrabold ">Amount: </label> &#8377;{400}</li>
                                    <li className="bg-[#f3f3f3] p-2 flex"><label className="font-extrabold ">Name: </label> {bookingdata?.contactDetails.name}</li>
                                    {/* <li className="bg-[#f3f3f3] p-2 flex"><label className="font-extrabold ">Phone:</label> {phone}</li> */}
                                    <li className="bg-[#f3f3f3] p-2 flex"><label className="font-extrabold ">Email: </label> {bookingdata?.contactDetails.email}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
            </>
        )
    }
    else if (status === "pending") {
        return (
            <>
                <Navbar />
                <section className="sm:w-[100%] md:w-[100%] lg:w-[100%] xl:w-[100%] 2xl:w-[100%] px-3 h-screen" style={{ background: 'linear-gradient(to bottom,  rgba(255,249,249,0) 25%,rgba(250,242,242,0) 34%,rgba(211,189,187,1) 100%)' }} >
                    <div className="container mx-auto sm:w-[60%] md:w-[60%] lg:w-[60%] xl:w-[60%] 2xl:w-[60%] px-[2%] sm:px-[5.5%] md:px-[5.5%] lg:px-[5.5%] xl:px-[5.5%] py-10">
                        <div className="bg-white shadow-md rounded-lg p-6">
                            <div className="w-full">
                                <h1 className="text-2xl font-bold mb-4">Hello, {bookingdata?.contactDetails.name}!</h1>
                                <p>Your Dummy Hotel Ticket for {bookingdata?.city} Booking Payment is <span className=" text-yellow-500 font-bold">pending</span>. You will recieve your Dummy Hotel Ticket on your email soon.</p>
                            </div>

                            <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
                            <div className="payment-details">
                                <div className="mb-2 uppercase flex"><label className="font-extrabold">Transaction ID: &nbsp;</label><span className="font-extrabold">{bookingdata?.transactionId}</span></div>
                                <div className="mb-2 uppercase flex"><label className="font-extrabold">Booked on: &nbsp;</label><span className="font-extrabold">{bookingdata?.createdAt
                                    ? new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(bookingdata.createdAt))
                                    : "N/A"}</span></div>
                                <ul className="w-full gap-1 grid grid-cols-2">
                                    <li className="bg-[#f3f3f3] p-2 flex"><label className="font-extrabold ">Amount: </label> &#8377;{400}</li>
                                    <li className="bg-[#f3f3f3] p-2 flex"><label className="font-extrabold ">Name: </label> {bookingdata?.contactDetails.name}</li>
                                    {/* <li className="bg-[#f3f3f3] p-2 flex"><label className="font-extrabold ">Phone:</label> {phone}</li> */}
                                    <li className="bg-[#f3f3f3] p-2 flex"><label className="font-extrabold ">Email: </label> {bookingdata?.contactDetails.email}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
            </>
        )
    }
}

export default InsurancePaymentSuccess;

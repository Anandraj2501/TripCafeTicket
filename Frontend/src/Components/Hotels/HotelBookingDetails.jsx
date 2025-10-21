import { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import { IoMdClose } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { GoArrowRight } from "react-icons/go";
import { FaUser, FaEnvelope, FaPhone, FaPlus, FaHotel, FaCalendarAlt, FaUserFriends } from "react-icons/fa";

const HotelBookingDetails = () => {
    const location = useLocation();
    const [hotelData, setHotelData] = useState(location.state || {});
    const navigate = useNavigate();

    const [hotelTravellersDetails, setHotelTravellerDetails] = useState({
        contactDetails: {
            phone: "",
            name: "",
            email: ""
        },
        passengers: []
    });

    // Extract number of travellers
    const numberOfTravellers = parseInt(hotelData?.travellers) || 1; // Default to 1

    // Initialize passengers when the component mounts
    useEffect(() => {
        const initialPassengers = Array.from({ length: numberOfTravellers }, () => ({
            title: "Mr",
            firstName: "",
            lastName: "",
            dob: "",
        }));

        setHotelTravellerDetails((prevState) => ({
            ...prevState,
            passengers: initialPassengers,
        }));
    }, [numberOfTravellers]); // Runs when numberOfTravellers changes

    // Handle Contact Details Change
    const handleInputsChange = (e) => {
        setHotelTravellerDetails((prevState) => ({
            ...prevState,
            contactDetails: {
                ...prevState.contactDetails,
                [e.target.name]: e.target.value
            }
        }));
    };

    // Handle Passenger Details Change
    const handlePassengerChange = (index, e) => {
        const { name, value } = e.target;
        const updatedPassengers = [...hotelTravellersDetails.passengers];
        updatedPassengers[index][name] = value;

        setHotelTravellerDetails((prevState) => ({
            ...prevState,
            passengers: updatedPassengers
        }));
    };

    // Add New Passenger
    const addPassenger = () => {
        setHotelTravellerDetails((prevState) => ({
            ...prevState,
            passengers: [
                ...prevState.passengers,
                { title: "Mr", firstName: "", lastName: "", dob: "" }
            ]
        }));
    };

    // Remove Passenger
    const handleClose = (index) => {
        if (hotelTravellersDetails.passengers.length === 1) {
            toast.error("At least one passenger is required.");
            return;
        }
        const updatedPassengers = hotelTravellersDetails.passengers.filter((_, i) => i !== index);
        setHotelTravellerDetails((prevState) => ({
            ...prevState,
            passengers: updatedPassengers
        }));

        setHotelData((prevHotelData) => ({
            ...prevHotelData,
            travellers: updatedPassengers.length,
        }));
    };

    const validateContactDetails = () => {
        if (!hotelTravellersDetails.contactDetails?.name || !hotelTravellersDetails.contactDetails?.phone || !hotelTravellersDetails.contactDetails.email) {
            toast.error("Please fill in all contact details (name, phone, and email) before making the payment.");
            return false;
        }
        else if (hotelTravellersDetails.passengers.length < 1) {
            toast.error("Please add Passenger");
            return false;
        }
        for (let i = 0; i < hotelTravellersDetails.passengers.length; i++) {
            const passenger = hotelTravellersDetails.passengers[i];
            if (!passenger.title || !passenger.firstName || !passenger.lastName) {
                toast.error(`Please fill in all details for passenger ${i + 1}.`);
                return false;
            }
        }
        return true;
    };

    const handlePaymentClick = () => {
        const finalData = { ...hotelTravellersDetails, ...hotelData };

        if (validateContactDetails()) {
            navigate("/hotel-paymentPage", { state: finalData });
        }
    };
    
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("PhonePe");
    const handlePaymentMethodChange = (event) => {
        setSelectedPaymentMethod(event.target.id);
    };

    // Common input classes for consistent height
    const inputClasses = "h-[52px] border border-gray-300 py-3.5 px-4 focus:outline-none focus:ring-2 focus:ring-[rgb(29,181,236)]/50 focus:border-[rgb(29,181,236)] transition-all duration-300 rounded-md";
    const selectClasses = "h-[52px] border border-gray-300 py-3.5 px-4 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[rgb(29,181,236)]/50 focus:border-[rgb(29,181,236)] transition-all duration-300 rounded-md";
    const labelClasses = "block text-sm font-medium text-gray-600 mb-2 flex items-center";

    return (
        <>
            <Navbar />
            <section className="min-h-screen bg-gradient-to-b from-white via-white to-orange-100/60 py-8 px-[5.5%]">
                <div className="w-full mx-auto">
                    <h2 className="text-left font-bold text-3xl md:text-4xl text-[rgb(29,181,236)] mb-10 pb-2 border-b-2 border-orange-200 inline-block">
                        Hotel Booking Details
                    </h2>
                    
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Left side - Forms */}
                        <div className="w-full lg:w-[65%]">
                            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-orange-100 transition-all duration-300 hover:shadow-xl">
                                <div className="bg-gradient-to-r from-[rgb(29,181,236)] to-[rgb(29,181,236)]/80 py-5 px-6 text-white font-bold text-center text-lg rounded-t-xl relative overflow-hidden">
                                    <div className="absolute -top-6 -left-6 w-12 h-12 rounded-full bg-white/10"></div>
                                    <div className="absolute -bottom-6 -right-6 w-16 h-16 rounded-full bg-white/10"></div>
                                    Contact & Guest Details
                                </div>

                                <div className="p-8">
                                    <div className="flex flex-col gap-8">
                                        <h4 className="text-xl font-medium text-gray-800 flex items-center">
                                            <span className="inline-block w-8 h-8 bg-[rgb(29,181,236)]/10 rounded-full mr-3 flex items-center justify-center">
                                                <FaUser className="text-[rgb(29,181,236)]" />
                                            </span>
                                            Contact Details
                                        </h4>
                                        
                                        {/* Phone input with country code */}
                                        <div className="group w-full transform transition-all duration-300">
                                            <label className={labelClasses}>
                                                <FaPhone className="mr-2 text-[rgb(29,181,236)]" />
                                                Phone Number
                                            </label>
                                            <div className="flex shadow-sm hover:shadow transition-shadow duration-300 rounded-md overflow-hidden">
                                                <select className={`${selectClasses} min-w-[120px] border-r-0 rounded-l-md rounded-r-none`}>
                                                    <option value="+91" selected>+91 India</option>
                                                    <option value="+1">+1 United States</option>
                                                    <option value="+44">+44 United Kingdom</option>
                                                    <option value="+61">+61 Australia</option>
                                                    {/* Add more common country codes */}
                                                </select>
                                                <input
                                                    type="tel"
                                                    placeholder="Phone Number"
                                                    className={`${inputClasses} flex-1 rounded-l-none`}
                                                    name="phone"
                                                    value={hotelTravellersDetails.contactDetails.phone}
                                                    onChange={handleInputsChange}
                                                    maxLength={15}
                                                />
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-5 sm:flex-row">
                                            <div className="w-full sm:w-1/2 group transform transition-all duration-300">
                                                <label className={labelClasses}>
                                                    <FaUser className="mr-2 text-[rgb(29,181,236)]" /> 
                                                    Full Name
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Enter your full name"
                                                    className={`${inputClasses} w-full shadow-sm hover:shadow`}
                                                    name="name"
                                                    value={hotelTravellersDetails.contactDetails.name}
                                                    onChange={handleInputsChange}
                                                />
                                            </div>
                                            <div className="w-full sm:w-1/2 group transform transition-all duration-300">
                                                <label className={labelClasses}>
                                                    <FaEnvelope className="mr-2 text-[rgb(29,181,236)]" />
                                                    Email Address
                                                </label>
                                                <input
                                                    type="email"
                                                    placeholder="Enter your email address"
                                                    className={`${inputClasses} w-full shadow-sm hover:shadow`}
                                                    name="email"
                                                    value={hotelTravellersDetails.contactDetails.email}
                                                    onChange={handleInputsChange}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Guest cards */}
                                    {hotelTravellersDetails.passengers.map((passenger, index) => (
                                        <div key={index} className="mt-10 pt-8 border-t border-gray-200 relative">
                                            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-white px-4">
                                                <div className="w-6 h-6 bg-[rgb(29,181,236)]/10 rounded-full flex items-center justify-center text-xs text-[rgb(29,181,236)] font-medium">{index + 1}</div>
                                            </div>
                                            <div className="flex justify-between items-center mb-5">
                                                <h4 className="text-xl font-medium text-gray-800 flex items-center">
                                                    <span className="inline-block w-8 h-8 bg-[rgb(29,181,236)]/10 rounded-full mr-3 flex items-center justify-center">
                                                        <FaUser className="text-[rgb(29,181,236)]" />
                                                    </span>
                                                    Guest {index + 1}
                                                </h4>
                                                <button 
                                                    className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50 group"
                                                    onClick={() => handleClose(index)}
                                                >
                                                    <IoMdClose className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                                                </button>
                                            </div>
                                            <div className="flex flex-col gap-5 sm:flex-row">
                                                <div className="w-full sm:w-1/2">
                                                    <div className="flex shadow-sm hover:shadow transition-shadow duration-300 rounded-md overflow-hidden">
                                                        <select
                                                            className={`${selectClasses} border-r-0 rounded-l-md bg-gray-50 hover:bg-gray-100 w-24 rounded-r-none`}
                                                            value={passenger.title}
                                                            onChange={(e) => handlePassengerChange(index, e)}
                                                            name="title"
                                                        >
                                                            <option value="Mr">Mr</option>
                                                            <option value="Ms">Ms</option>
                                                            <option value="Mrs">Mrs</option>
                                                        </select>
                                                        <input
                                                            type="text"
                                                            name="firstName"
                                                            placeholder="First Name"
                                                            className={`${inputClasses} flex-1 rounded-l-none`}
                                                            value={passenger.firstName}
                                                            onChange={(e) => handlePassengerChange(index, e)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="w-full sm:w-1/2">
                                                    <input
                                                        type="text"
                                                        name="lastName"
                                                        placeholder="Last Name"
                                                        className={`${inputClasses} w-full shadow-sm hover:shadow`}
                                                        value={passenger.lastName}
                                                        onChange={(e) => handlePassengerChange(index, e)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    
                                    <button
                                        className="mt-8 inline-flex items-center gap-2 text-[rgb(29,181,236)] font-semibold hover:text-[#d15518] transition-all duration-300 py-2 px-4 rounded-lg hover:bg-[rgb(29,181,236)]/5 group"
                                        onClick={addPassenger}
                                    >
                                        <span className="flex items-center justify-center w-6 h-6 bg-[rgb(29,181,236)] rounded-full text-white group-hover:scale-110 transition-transform duration-300">
                                            <FaPlus className="w-3 h-3" />
                                        </span> 
                                        Add Guest
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Right side - Order Summary */}
                        <div className="w-full lg:w-[30%] mt-4 lg:mt-0">
                            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[rgb(29,181,236)]/20">
                                {/* Order summary header */}
                                <div className="bg-[rgb(29,181,236)] py-4 px-5 text-white font-bold text-center text-lg rounded-t-xl">
                                    Order Summary
                                </div>
                                
                                {/* Hotel details section */}
                                <div className="p-5 space-y-5">
                                    <h3 className="bg-gradient-to-r from-[rgb(29,181,236)] to-[rgb(29,181,236)]/80 text-white font-semibold py-3 px-4 rounded-lg text-center shadow-sm">
                                        Hotel Details
                                    </h3>
                                    
                                    {/* Hotel overview */}
                                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                                        <div className="flex items-center mb-3">
                                            <div className="h-10 w-10 bg-[rgb(29,181,236)]/10 rounded-full flex items-center justify-center mr-3">
                                                <FaHotel className="text-[rgb(29,181,236)]" />
                                            </div>
                                            <div className="font-medium text-lg text-[#162856]">{hotelData?.city || "City Name"}</div>
                                        </div>
                                        
                                        <div className="flex items-center justify-between text-sm bg-gray-50 p-3 rounded-lg">
                                            <div className="text-center">
                                                <div className="text-gray-500 mb-1 flex items-center justify-center">
                                                    <FaCalendarAlt className="text-[rgb(29,181,236)] mr-1" size={12} />
                                                    Check-in
                                                </div>
                                                <div className="font-medium">
                                                    {hotelData?.checkinDate
                                                        ? new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(hotelData.checkinDate))
                                                        : "N/A"}
                                                </div>
                                            </div>
                                            
                                            <div className="text-[rgb(29,181,236)]">
                                                <GoArrowRight size={18} />
                                            </div>
                                            
                                            <div className="text-center">
                                                <div className="text-gray-500 mb-1 flex items-center justify-center">
                                                    <FaCalendarAlt className="text-[rgb(29,181,236)] mr-1" size={12} />
                                                    Check-out
                                                </div>
                                                <div className="font-medium">
                                                    {hotelData?.checkoutDate
                                                        ? new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(hotelData.checkoutDate))
                                                        : "N/A"}
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="mt-3 flex items-center text-sm text-gray-600">
                                            <FaUserFriends className="text-[rgb(29,181,236)] mr-2" />
                                            <span>{hotelTravellersDetails.passengers.length} {hotelTravellersDetails.passengers.length === 1 ? 'Guest' : 'Guests'}</span>
                                        </div>
                                    </div>
                                    
                                    {/* Price breakdown */}
                                    <div className="border border-gray-100 rounded-lg overflow-hidden">
                                        <div className="p-4 border-b border-gray-100">
                                            <h4 className="font-medium text-gray-800">Price Details</h4>
                                        </div>
                                        <div className="p-4 space-y-3">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">Room × {hotelTravellersDetails.passengers.length}</span>
                                                <span className="font-medium">₹{400 * hotelTravellersDetails.passengers.length}</span>
                                            </div>
                                            
                                            <div className="border-t border-dashed border-gray-200 pt-3 flex justify-between">
                                                <span className="font-medium">Total Amount</span>
                                                <span className="font-bold text-[rgb(29,181,236)]">₹{400 * hotelTravellersDetails.passengers.length}</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="rounded-lg border border-gray-100 flex flex-col">
                                        <div className="w-full  text-center bg-[rgb(29,181,236)] hover:bg-[#d15518] text-white font-bold text-lg py-2 px-3 rounded-lg  transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[rgb(29,181,236)] focus:ring-opacity-50"
                                        // onClick={handlePaymentClick}
                                        >
                                            Pay Using
                                        </div>

                                        <div className="flex flex-col gap-y-2 text-lg font-medium text-[#162856] mt-4">
                                            <div className="flex items-center gap-2 ">
                                                <input
                                                    type="radio"
                                                    name="paymentMethod"
                                                    id="PhonePe"
                                                    className="appearance-none w-5 h-5 border-2 border-[rgb(29,181,236)] rounded-full checked:bg-[rgb(29,181,236)] checked:border-[rgb(29,181,236)] focus:outline-none"
                                                    checked={selectedPaymentMethod === "PhonePe"}
                                                    onChange={handlePaymentMethodChange}
                                                />
                                                <label htmlFor="phonepay">PhonePe</label>
                                            </div>
                                            <div className="flex items-center gap-2 ">
                                                <input
                                                    type="radio"
                                                    name="paymentMethod"
                                                    id="PayU"
                                                    className="appearance-none w-5 h-5 border-2 border-[rgb(29,181,236)] rounded-full checked:bg-[rgb(29,181,236)] checked:border-[rgb(29,181,236)] focus:outline-none"
                                                    checked={selectedPaymentMethod === "PayU"}
                                                    onChange={handlePaymentMethodChange}
                                                />
                                                <label htmlFor="PayU">PayU</label>
                                            </div>

                                            <div className="w-full  text-center bg-[rgb(29,181,236)] hover:bg-[#d15518] text-white font-bold text-lg py-2 px-3 rounded-lg mt-4  transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[rgb(29,181,236)] focus:ring-opacity-50" onClick={handlePaymentClick}>
                                                Pay Now
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
            <ToastContainer />
        </>
    );
};

export default HotelBookingDetails;
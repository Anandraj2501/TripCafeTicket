import { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import { IoMdClose } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { GoArrowRight } from "react-icons/go";
import countries from "../../data/countries";
import { FaUser, FaEnvelope, FaPhone, FaPlus, FaHotel, FaCalendarAlt, FaUserFriends } from "react-icons/fa";
import axios from "axios";
import { Star } from "lucide-react";
import { address } from "motion/react-client";



const InsuranceBooking = () => {
    const location = useLocation();
    const [insuranceData, setInsuranceData] = useState(location.state || {});
    console.log("Insurance Data:", insuranceData);

    const [travelDays, setTravelDays] = useState(1); // Default to 3 days if not provided

    useEffect(() => {
        if (insuranceData) {
            
            let diff = new Date(insuranceData?.insuranceData.returnDate) - new Date(insuranceData?.insuranceData.departureDate);
            if (diff >= 0) {
                setTravelDays(Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1); // Calculate days including both start and end dates
            }
        }
    }, [insuranceData]);

    const navigate = useNavigate();

    const [insuranceHolderDetails, setInsuranceHolderDetails] = useState({
        contactDetails: {
            phone: "",
            name: "",
            email: ""
        },
        passengers: []
    });

    const numberOfTravellers = insuranceData?.travellers || 1; // Default to 1 if not provided

    // Initialize passengers when the component mounts

    useEffect(() => {
        const initialPassengers = Array.from({ length: numberOfTravellers }, () => ({
            title: "Mr",
            firstName: "",
            lastName: "",
            dob: "",
            passportNumber: "",
            nationality: "India",
            address: "",
            state: "",
            city: "",
            zipcode: "",
            phone: "",
            email: "",
            gender: "Male",
        }));

        setInsuranceHolderDetails((prevState) => ({
            ...prevState,
            passengers: initialPassengers,
        }));
    }, [numberOfTravellers]); // Runs when numberOfTravellers changes

    // Handle Contact Details Change
    const handleInputsChange = (e) => {
        setInsuranceHolderDetails((prevState) => ({
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
        const updatedPassengers = [...insuranceHolderDetails.passengers];
        updatedPassengers[index][name] = value;

        setInsuranceHolderDetails((prevState) => ({
            ...prevState,
            passengers: updatedPassengers
        }));
    };

    // Add New Passenger
    const addPassenger = () => {
        setInsuranceHolderDetails((prevState) => ({
            ...prevState,
            passengers: [
                ...prevState.passengers,
                {
                    title: "Mr", firstName: "", lastName: "", dob: "",
                    passportNumber: "",
                    nationality: "India",
                    address: "",
                    state: "",
                    city: "",
                    zipcode: "",
                    phone: "",
                    email: "",
                    gender: "Male",
                }
            ]
        }));
    };

    // Remove Passenger
    const handleClose = (index) => {
        if (insuranceHolderDetails.passengers.length === 1) {
            toast.error("At least one passenger is required.");
            return;
        }
        const updatedPassengers = insuranceHolderDetails.passengers.filter((_, i) => i !== index);
        setInsuranceHolderDetails((prevState) => ({
            ...prevState,
            passengers: updatedPassengers
        }));

        setInsuranceData((prevHotelData) => ({
            ...prevHotelData,
            travellers: updatedPassengers.length,
        }));
    };

    const validateContactDetails = () => {
        if (!insuranceHolderDetails.contactDetails?.name || !insuranceHolderDetails.contactDetails?.phone || !insuranceHolderDetails.contactDetails.email) {
            toast.error("Please fill in all contact details (name, phone, and email) before making the payment.");
            return false;
        }
        else if (insuranceHolderDetails.passengers.length < 1) {
            toast.error("Please add Passenger");
            return false;
        }
        for (let i = 0; i < insuranceHolderDetails.passengers.length; i++) {
            const passenger = insuranceHolderDetails.passengers[i];
            if (!passenger.title || !passenger.firstName || !passenger.lastName || !passenger.dob || !passenger.nationality || !passenger.address || !passenger.state || !passenger.city || !passenger.zipcode || !passenger.phone || !passenger.email) {
                toast.error(`Please fill in all details for passenger ${i + 1}.`);
                return false;
            }
        }
        return true;
    };
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("Razorpay");
    const handlePaymentMethodChange = (event) => {
        setSelectedPaymentMethod(event.target.id);
    };

    const handlePaymentClick = () => {
        const amount = (insuranceHolderDetails?.passengers?.length * 250)*travelDays;
        const finalData = { ...insuranceHolderDetails, amount, ...insuranceData, selectedPaymentMethod, }
        console.log(finalData)
        if (validateContactDetails()) {
            console.log("Final Data:", finalData);
            navigate("/insurance-paymentPage", { state: finalData });
        }
    };

    // Common input classes for consistent height
    const inputClasses = "h-[52px] border border-gray-300 py-3.5 px-4 focus:outline-none focus:ring-2 focus:ring-[#ec601d]/50 focus:border-[#ec601d] transition-all duration-300 rounded-md";
    const selectClasses = "h-[52px] border border-gray-300 py-3.5 px-4 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#ec601d]/50 focus:border-[#ec601d] transition-all duration-300 rounded-md";
    const labelClasses = "block text-sm font-medium text-gray-600 mb-2 flex items-center";


    return (
        <>
            <Navbar />
            <section className="min-h-screen bg-gradient-to-b from-white via-white to-orange-100/60 py-8 px-[5.5%]">
                <div className="w-full mx-auto">
                    <h2 className="text-left font-bold text-3xl md:text-4xl text-[#ec601d] mb-10 pb-2 border-b-2 border-orange-200 inline-block">
                        Insurance Details
                    </h2>

                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Left side - Forms */}
                        <div className="w-full lg:w-[65%]">
                            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-orange-100 transition-all duration-300 hover:shadow-xl">
                                <div className="bg-gradient-to-r from-[#ec601d] to-[#ec601d]/80 py-5 px-6 text-white font-bold text-center text-lg rounded-t-xl relative overflow-hidden">
                                    <div className="absolute -top-6 -left-6 w-12 h-12 rounded-full bg-white/10"></div>
                                    <div className="absolute -bottom-6 -right-6 w-16 h-16 rounded-full bg-white/10"></div>
                                    Contact & Traveller Details
                                </div>

                                <div className="p-8">
                                    <div className="flex flex-col gap-8">
                                        <h4 className="text-xl font-medium text-gray-800 flex items-center">
                                            <span className="inline-block w-8 h-8 bg-[#ec601d]/10 rounded-full mr-3 flex items-center justify-center">
                                                <FaUser className="text-[#ec601d]" />
                                            </span>
                                            Contact Details
                                        </h4>

                                        {/* Phone input with country code */}
                                        <div className="group w-full transform transition-all duration-300">
                                            <label className={labelClasses}>
                                                <FaPhone className="mr-2 text-[#ec601d]" />
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
                                                    value={insuranceHolderDetails.contactDetails.phone}
                                                    onChange={handleInputsChange}
                                                    maxLength={15}
                                                />
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-5 sm:flex-row">
                                            <div className="w-full sm:w-1/2 group transform transition-all duration-300">
                                                <label className={labelClasses}>
                                                    <FaUser className="mr-2 text-[#ec601d]" />
                                                    Full Name
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Enter your full name"
                                                    className={`${inputClasses} w-full shadow-sm hover:shadow`}
                                                    name="name"
                                                    value={insuranceHolderDetails.contactDetails.name}
                                                    onChange={handleInputsChange}
                                                />
                                            </div>
                                            <div className="w-full sm:w-1/2 group transform transition-all duration-300">
                                                <label className={labelClasses}>
                                                    <FaEnvelope className="mr-2 text-[#ec601d]" />
                                                    Email Address
                                                </label>
                                                <input
                                                    type="email"
                                                    placeholder="Enter your email address"
                                                    className={`${inputClasses} w-full shadow-sm hover:shadow`}
                                                    name="email"
                                                    value={insuranceHolderDetails.contactDetails.email}
                                                    onChange={handleInputsChange}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Guest cards */}
                                    {insuranceHolderDetails?.passengers?.map((passenger, index) => (
                                        <div key={index} className="mt-10 pt-8 border-t border-gray-200 relative">
                                            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-white px-4">
                                                <div className="w-6 h-6 bg-[#ec601d]/10 rounded-full flex items-center justify-center text-xs text-[#ec601d] font-medium">{index + 1}</div>
                                            </div>
                                            <div className="flex justify-between items-center mb-5">
                                                <h4 className="text-xl font-medium text-gray-800 flex items-center">
                                                    <span className="inline-block w-8 h-8 bg-[#ec601d]/10 rounded-full mr-3 flex items-center justify-center">
                                                        <FaUser className="text-[#ec601d]" />
                                                    </span>
                                                    Traveller {index + 1}
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
                                                            value={passenger?.title}
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
                                                            value={passenger?.firstName}
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
                                                        value={passenger?.lastName}
                                                        onChange={(e) => handlePassengerChange(index, e)}
                                                    />
                                                </div>

                                            </div>
                                            <div className="mt-8 grid grid-cols-2 gap-x-2 gap-y-10 grid-rows-3 sm:grid-cols-4">
                                                <input
                                                    type="date"
                                                    name="dob"
                                                    placeholder="Date of Birth"
                                                    className={`${inputClasses} w-full shadow-sm hover:shadow`}
                                                    value={passenger?.dob}
                                                    onChange={(e) => handlePassengerChange(index, e)}
                                                />
                                                <select
                                                    className={`${inputClasses} w-full shadow-sm hover:shadow`}
                                                    value={passenger?.gender}
                                                    onChange={(e) => handlePassengerChange(index, e)}
                                                    name="gender"
                                                >
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                    <option value="other">Other</option>
                                                </select>
                                                <input
                                                    type="text"
                                                    name="phone"
                                                    placeholder="Phone"
                                                    className={`${inputClasses} w-full shadow-sm hover:shadow`}
                                                    value={passenger?.phone}
                                                    onChange={(e) => handlePassengerChange(index, e)}
                                                />
                                                <input
                                                    type="email"
                                                    name="email"
                                                    placeholder="Email"
                                                    className={`${inputClasses} w-full shadow-sm hover:shadow`}
                                                    value={passenger?.email}
                                                    onChange={(e) => handlePassengerChange(index, e)}
                                                />

                                                <input
                                                    type="text"
                                                    name="address"
                                                    placeholder="Address"
                                                    className={`${inputClasses} w-full shadow-sm hover:shadow`}
                                                    value={passenger?.address}
                                                    onChange={(e) => handlePassengerChange(index, e)}
                                                />

                                                <input
                                                    type="text"
                                                    name="state"
                                                    placeholder="State"
                                                    className={`${inputClasses} w-full shadow-sm hover:shadow`}
                                                    value={passenger?.state}
                                                    onChange={(e) => handlePassengerChange(index, e)}
                                                />
                                                <input
                                                    type="text"
                                                    name="city"
                                                    placeholder="City"
                                                    className={`${inputClasses} w-full shadow-sm hover:shadow`}
                                                    value={passenger?.city}
                                                    onChange={(e) => handlePassengerChange(index, e)}
                                                />
                                                <input
                                                    type="text"
                                                    name="zipcode"
                                                    placeholder="Zip Code"
                                                    className={`${inputClasses} w-full shadow-sm hover:shadow`}
                                                    value={passenger?.zipcode}
                                                    onChange={(e) => handlePassengerChange(index, e)}
                                                />
                                                <select name="nationality" className={`${inputClasses} col-span-2`} onChange={(e) => handlePassengerChange(index, e)}>
                                                    {
                                                        countries.map((country) => (
                                                            <option key={country?.code} value={country?.name} selected={passenger?.nationality === country?.name}>
                                                                {country?.name}
                                                            </option>
                                                        ))
                                                    }
                                                </select>
                                                <input
                                                    type="text"
                                                    name="passportNumber"
                                                    placeholder="Passport Number(Optional)"
                                                    className={`${inputClasses} w-full shadow-sm hover:shadow col-span-2`}
                                                    value={passenger?.passportNumber}
                                                    onChange={(e) => handlePassengerChange(index, e)}
                                                />
                                            </div>

                                        </div>
                                    ))}

                                    <button
                                        className="mt-8 inline-flex items-center gap-2 text-[#ec601d] font-semibold hover:text-[#d15518] transition-all duration-300 py-2 px-4 rounded-lg hover:bg-[#ec601d]/5 group"
                                        onClick={addPassenger}
                                    >
                                        <span className="flex items-center justify-center w-6 h-6 bg-[#ec601d] rounded-full text-white group-hover:scale-110 transition-transform duration-300">
                                            <FaPlus className="w-3 h-3" />
                                        </span>
                                        Add Traveller
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Right side - Order Summary */}
                        <div className="w-full lg:w-[30%] mt-4 lg:mt-0">
                            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#ec601d]/20">
                                {/* Order summary header */}
                                <div className="bg-[#ec601d] py-4 px-5 text-white font-bold text-center text-lg rounded-t-xl">
                                    Order Summary
                                </div>

                                {/* Hotel details section */}
                                <div className="p-5 space-y-5">
                                    <h3 className="bg-gradient-to-r from-[#ec601d] to-[#ec601d]/80 text-white font-semibold py-3 px-4 rounded-lg text-center shadow-sm">
                                        Insurance Details
                                    </h3>


                                    {/* Price breakdown */}
                                    <div className="border border-gray-100 rounded-lg overflow-hidden">
                                        <div className="p-4 border-b border-gray-100">
                                            <h4 className="font-medium text-gray-800">Price Details</h4>
                                        </div>
                                        <div className="p-4 space-y-3">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">Travel Insurance × {insuranceHolderDetails?.passengers?.length}</span>
                                                <span className="font-medium">₹{250 * insuranceHolderDetails?.passengers?.length}</span>
                                            </div>

                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">Travel Days</span>
                                                <span className="font-medium">{travelDays}</span>
                                            </div>

                                            <div className="border-t border-dashed border-gray-200 pt-3 flex justify-between">
                                                <span className="font-medium">Total Amount</span>
                                                <span className="font-bold text-[#ec601d]">₹{(250 * insuranceHolderDetails?.passengers?.length)*travelDays}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="rounded-lg border border-gray-100 flex flex-col">
                                        {/* <div className="w-full  text-center bg-[#ec601d] hover:bg-[#d15518] text-white font-bold text-lg py-2 px-3 rounded-lg  transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#ec601d] focus:ring-opacity-50"
                                        // onClick={handlePaymentClick}
                                        >
                                            Pay Using
                                        </div> */}

                                        <div className="flex flex-col gap-y-2 text-lg font-medium text-[#162856] mt-4">
                                            <div className="flex items-center gap-2 ">
                                                <input
                                                    type="radio"
                                                    name="paymentMethod"
                                                    id="Razorpay"
                                                    className="appearance-none w-5 h-5 border-2 border-[#ec601d] rounded-full checked:bg-[#ec601d] checked:border-[#ec601d] focus:outline-none"
                                                    checked={selectedPaymentMethod === "Razorpay"}
                                                    onChange={handlePaymentMethodChange}
                                                />
                                                <label htmlFor="Razorpay">Razorpay</label>
                                            </div>

                                            <div className="w-full  text-center bg-[#ec601d] hover:bg-[#d15518] text-white font-bold text-lg py-2 px-3 rounded-lg mt-4  transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#ec601d] focus:ring-opacity-50 cursor-pointer" onClick={handlePaymentClick}>
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

export default InsuranceBooking; 
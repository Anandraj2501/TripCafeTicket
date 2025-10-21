import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Insurance from "../Forms/Insurance";

const ModernCalendar = ({
    selectedDate,
    onDateChange,
    minDate,
    inputRef,
    onClose,
    isRange = false,
    startDate,
    endDate
}) => {
    const calendarRef = useRef(null);
    const [currentMonth, setCurrentMonth] = useState(selectedDate ? new Date(selectedDate) : new Date());
    const [calendarDays, setCalendarDays] = useState([]);
    const [showMonthSelector, setShowMonthSelector] = useState(false);
    const [showYearSelector, setShowYearSelector] = useState(false);


    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

    // Generate an array of years (current year -5 to current year +5)
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);

    useEffect(() => {
        generateCalendarDays();

        // Handle click outside
        const handleClickOutside = (event) => {
            if (
                calendarRef.current &&
                !calendarRef.current.contains(event.target) &&
                inputRef.current &&
                !inputRef.current.contains(event.target)
            ) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [currentMonth, selectedDate, startDate, endDate]);

    const generateCalendarDays = () => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();

        // Get first day of the month
        const firstDay = new Date(year, month, 1);
        const firstDayIndex = firstDay.getDay();

        // Get last day of the month
        const lastDay = new Date(year, month + 1, 0);
        const lastDate = lastDay.getDate();

        // Get last day of previous month
        const prevLastDay = new Date(year, month, 0);
        const prevLastDate = prevLastDay.getDate();

        // Calculate total days to show (previous month, current month, next month)
        const totalDays = 42; // 6 rows of 7 days

        const days = [];

        // Add days from previous month
        for (let i = firstDayIndex - 1; i >= 0; i--) {
            days.push({
                day: prevLastDate - i,
                month: month - 1,
                year: month === 0 ? year - 1 : year,
                isCurrentMonth: false,
                isToday: false,
                isSelected: false,
                inRange: false
            });
        }

        // Add days from current month
        const today = new Date();

        for (let i = 1; i <= lastDate; i++) {
            const date = new Date(year, month, i);
            const isToday =
                today.getDate() === i &&
                today.getMonth() === month &&
                today.getFullYear() === year;

            const isSelected = selectedDate ?
                new Date(selectedDate).getDate() === i &&
                new Date(selectedDate).getMonth() === month &&
                new Date(selectedDate).getFullYear() === year : false;

            // Check if this date is within the selected range
            let inRange = false;
            if (isRange && startDate && endDate) {
                const currentDate = new Date(year, month, i).getTime();
                const start = new Date(startDate).getTime();
                const end = new Date(endDate).getTime();
                inRange = currentDate >= start && currentDate <= end;
            }

            days.push({
                day: i,
                month,
                year,
                isCurrentMonth: true,
                isToday,
                isSelected,
                inRange
            });
        }

        // Add days from next month
        const remainingDays = totalDays - days.length;
        for (let i = 1; i <= remainingDays; i++) {
            days.push({
                day: i,
                month: month + 1,
                year: month === 11 ? year + 1 : year,
                isCurrentMonth: false,
                isToday: false,
                isSelected: false,
                inRange: false
            });
        }

        setCalendarDays(days);
    };

    const formatDateISO = (year, month, day) => {
        return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    };

    const handlePrevMonth = () => {
        setCurrentMonth(prev => {
            const prevMonth = new Date(prev);
            prevMonth.setMonth(prevMonth.getMonth() - 1);
            return prevMonth;
        });
    };

    const handleNextMonth = () => {
        setCurrentMonth(prev => {
            const nextMonth = new Date(prev);
            nextMonth.setMonth(nextMonth.getMonth() + 1);
            return nextMonth;
        });
    };

    const handleDayClick = (day) => {
        const dateStr = formatDateISO(day.year, day.month, day.day);
        onDateChange(dateStr);
    };

    const handleMonthSelect = (monthIndex) => {
        setCurrentMonth(prev => {
            const newDate = new Date(prev);
            newDate.setMonth(monthIndex);
            return newDate;
        });
        setShowMonthSelector(false);
    };

    const handleYearSelect = (year) => {
        setCurrentMonth(prev => {
            const newDate = new Date(prev);
            newDate.setFullYear(year);
            return newDate;
        });
        setShowYearSelector(false);
    };

    // Check if date is before min date
    const isDisabled = (day) => {
        if (!minDate) return false;

        const dateToCheck = new Date(day.year, day.month, day.day);
        const min = new Date(minDate);
        return dateToCheck < min;
    };

    // Format for today and clear buttons
    const formatDate = (date) => {
        const d = new Date(date);
        return `${d.getDate()} ${months[d.getMonth()].substring(0, 3)} ${d.getFullYear()}`;
    };

    const handleTodayClick = () => {
        const today = new Date();
        setCurrentMonth(today);
        onDateChange(formatDateISO(today.getFullYear(), today.getMonth(), today.getDate()));
    };

    const handleClearClick = () => {
        onDateChange('');
    };


    return (
        <div
            ref={calendarRef}
            className="absolute z-50 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 p-4 w-80"
            style={{ transform: 'translateY(2px)' }}
        >
            {/* Calendar Header */}
            <div className="flex justify-between items-center mb-4">
                <button
                    className="text-gray-600 hover:text-[#ec601d] focus:outline-none"
                    onClick={handlePrevMonth}
                >
                    {/* Left arrow icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                </button>

                <div className="flex flex-col items-center">
                    <div className="flex gap-1">
                        <button
                            className="text-[#ec601d] font-medium hover:bg-gray-100 rounded px-2 py-1"
                            onClick={() => setShowMonthSelector(!showMonthSelector)}
                        >
                            {months[currentMonth.getMonth()]}
                        </button>
                        <button
                            className="text-[#ec601d] font-medium hover:bg-gray-100 rounded px-2 py-1"
                            onClick={() => setShowYearSelector(!showYearSelector)}
                        >
                            {currentMonth.getFullYear()}
                        </button>
                    </div>

                    {/* Month Selector */}
                    {showMonthSelector && (
                        <div className="absolute top-16 left-0 right-0 bg-white rounded-lg shadow-lg border border-gray-200 p-2 grid grid-cols-3 gap-1 z-10">
                            {months.map((month, index) => (
                                <button
                                    key={month}
                                    className={`p-2 rounded hover:bg-gray-100 ${index === currentMonth.getMonth() ? 'bg-[#ec601d] text-white hover:bg-[#ec601d]' : ''
                                        }`}
                                    onClick={() => handleMonthSelect(index)}
                                >
                                    {month.substring(0, 3)}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Year Selector */}
                    {showYearSelector && (
                        <div className="absolute top-16 left-0 right-0 bg-white rounded-lg shadow-lg border border-gray-200 p-2 grid grid-cols-3 gap-1 max-h-48 overflow-y-auto z-10">
                            {years.map(year => (
                                <button
                                    key={year}
                                    className={`p-2 rounded hover:bg-gray-100 ${year === currentMonth.getFullYear() ? 'bg-[#ec601d] text-white hover:bg-[#ec601d]' : ''
                                        }`}
                                    onClick={() => handleYearSelect(year)}
                                >
                                    {year}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <button
                    className="text-gray-600 hover:text-[#ec601d] focus:outline-none"
                    onClick={handleNextMonth}
                >
                    {/* Right arrow icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>

            {/* Weekdays */}
            <div className="grid grid-cols-7 mb-2">
                {weekDays.map(day => (
                    <div
                        key={day}
                        className="text-center text-xs font-medium text-gray-500 py-2"
                    >
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day, index) => (
                    <button
                        key={index}
                        className={`
                            w-9 h-9 rounded-full flex items-center justify-center text-sm
                            ${!day.isCurrentMonth ? 'text-gray-400' : 'text-gray-800'}
                            ${day.isToday ? 'border border-[#ec601d]' : ''}
                            ${day.isSelected ? 'bg-[#ec601d] text-white' : 'hover:bg-gray-100'}
                            ${day.inRange && !day.isSelected ? 'bg-[#ec601d]/20' : ''}
                            ${isDisabled(day) ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
                        `}
                        disabled={isDisabled(day)}
                        onClick={() => !isDisabled(day) && handleDayClick(day)}
                    >
                        {day.day}
                    </button>
                ))}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between mt-4 border-t pt-4">
                <button
                    className="text-sm text-[#ec601d] hover:underline"
                    onClick={handleTodayClick}
                >
                    Today
                </button>
                <button
                    className="text-sm text-[#ec601d] hover:underline"
                    onClick={handleClearClick}
                >
                    Clear
                </button>
            </div>
        </div>
    );
};

const LeftSide = () => {
    const navigate = useNavigate();
    const [activeButton, setActiveButton] = useState('Flight');
    const [tripType, setTripType] = useState('One Way');
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [fromResults, setFromResults] = useState([]);
    const [selectedFromAirport, setSelectedFromAirport] = useState(null);
    const [toResults, setToResults] = useState([]);
    const [selectedToAirport, setSelectedToAirport] = useState(null);
    const [departureDate, setDepartureDate] = useState('');
    const [displayDepartureDate, setDisplayDepartureDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [displayReturnDate, setDisplayReturnDate] = useState('');
    const [travellers, setTravellers] = useState({
        adult: 1,
        child: 0,
        infant: 0
    });
    const [travelClass, setTravelClass] = useState('Economy');
    const [showTravellerOptions, setShowTravellerOptions] = useState(false);
    const [justSelectedFrom, setJustSelectedFrom] = useState(false);
    const [justSelectedCity, setJustSelectedCity] = useState(false);
    const [justSelectedTo, setJustSelectedTo] = useState(false);
    const [city, setCity] = useState([]);
    const [cityResults, setCityResults] = useState([]);
    



    // Calendar state
    const [showDepartureCalendar, setShowDepartureCalendar] = useState(false);
    const [showReturnCalendar, setShowReturnCalendar] = useState(false);
    const [showCheckinCalendar, setShowCheckinCalendar] = useState(false);
    const [showCheckoutCalendar, setShowCheckoutCalendar] = useState(false);

    // Refs for date inputs
    const departureDateRef = useRef(null);
    const returnDateRef = useRef(null);
    const checkinDateRef = useRef(null);
    const checkoutDateRef = useRef(null);

    const [hotelData, setHotelData] = useState({
        city: "",
        checkinDate: "",
        checkoutDate: "",
        travellers: "1",
        purpose: ""
    });

    const [displayCheckinDate, setDisplayCheckinDate] = useState('');
    const [displayCheckoutDate, setDisplayCheckoutDate] = useState('');

    // Format date from yyyy-mm-dd to dd/mm/yyyy
    const formatDateForDisplay = (dateString) => {
        console.log(dateString);
        if (!dateString) return '';
        const [year, month, day] = dateString.split('-');
        return `${day}/${month}/${year}`;
    };

    // Format date for API
    const formatDateForInput = (dateString) => {
        if (!dateString) return '';
        const [day, month, year] = dateString.split('/');
        return `${year}-${month}-${day}`;
    };

    // Handle departure date change
    const handleDepartureDateChange = (dateValue) => {
        setDepartureDate(dateValue);
        setDisplayDepartureDate(formatDateForDisplay(dateValue));
        setShowDepartureCalendar(false);
    };

    // Handle return date change
    const handleReturnDateChange = (dateValue) => {
        setReturnDate(dateValue);
        setDisplayReturnDate(formatDateForDisplay(dateValue));
        setShowReturnCalendar(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Special handling for date fields
        if (name === 'checkinDate') {
            setDisplayCheckinDate(formatDateForDisplay(value));
        } else if (name === 'checkoutDate') {
            setDisplayCheckoutDate(formatDateForDisplay(value));
        }

        setHotelData({
            ...hotelData,
            [name]: value
        });
    };

    // Handle checkin date change from calendar
    const handleCheckinDateChange = (dateValue) => {
        setHotelData({
            ...hotelData,
            checkinDate: dateValue
        });
        setDisplayCheckinDate(formatDateForDisplay(dateValue));
        setShowCheckinCalendar(false);
    };

    // Handle checkout date change from calendar
    const handleCheckoutDateChange = (dateValue) => {
        setHotelData({
            ...hotelData,
            checkoutDate: dateValue
        });
        setDisplayCheckoutDate(formatDateForDisplay(dateValue));
        setShowCheckoutCalendar(false);
    };

    const handleTravellerChange = (type, action) => {
        setTravellers(prev => {
            const newCount = action === 'increase'
                ? prev[type] + 1
                : Math.max(type === 'adult' ? 1 : 0, prev[type] - 1);

            return { ...prev, [type]: newCount };
        });
    };

    useEffect(() => {
        if (justSelectedFrom) {
            setJustSelectedFrom(false); // reset flag
            return; // skip API call
        }
        if (from.length > 2) {
            axios.get(`${process.env.REACT_APP_TEQUILA_URL}/locations/query?term=${from}&locale=en-US&location_types=airport&limit=20&active_only=true`, {
                headers: {
                    'apikey': process.env.REACT_APP_TEQUILA_API,
                }
            })
                .then(response => {
                    console.log(response.data.locations);
                    setFromResults(response.data.locations);
                })
                .catch(error => {
                    console.error('Error fetching data: ', error);
                });
        } else {
            setFromResults([]);
        }
    }, [from]);

    useEffect(() => {
        if (justSelectedTo) {
            setJustSelectedTo(false); // reset flag    
            return; // skip API call
        }
        if (to.length > 2) {
            axios.get(`${process.env.REACT_APP_TEQUILA_URL}/locations/query?term=${to}&locale=en-US&location_types=airport&limit=20&active_only=true`, {
                headers: {
                    'apikey': process.env.REACT_APP_TEQUILA_API
                }
            })
                .then(response => {
                    setToResults(response.data.locations);
                })
                .catch(error => {
                    console.error('Error fetching data: ', error);
                });
        } else {
            setToResults([]);
        }
    }, [to]);

    const handleCitySelect = (cityName) => {
        setJustSelectedCity(true); // set flag to skip API call
        setCity(cityName);
        setHotelData({
            ...hotelData,
            city: cityName
        });
        setCityResults([]);
    }

    useEffect(() => {
        if (justSelectedCity) {
            setJustSelectedCity(false); // reset flag
            return; // skip API call
        }
        if (city.length > 2) {
            axios.get(`${process.env.REACT_APP_TEQUILA_URL}/locations/query?term=${city}&locale=en-US&location_types=city&limit=20&active_only=true`, {
                headers: {
                    'apikey': process.env.REACT_APP_TEQUILA_API,
                }
            })
                .then(response => {
                    console.log(response.data.locations);
                    setCityResults(response.data.locations);
                })
                .catch(error => {
                    console.error('Error fetching data: ', error);
                });
        } else {
            setCityResults([]);
        }
    }, [city]);


    const handleSelectFrom = (airport) => {
        // setFrom(`${airport.name} (${airport.code})`);
        setJustSelectedFrom(true);
        setFrom(airport.code);
        setSelectedFromAirport(airport);
        setFromResults([]);
    };

    const handleSelectTo = (airport) => {
        // setTo(`${airport.name} (${airport.code})`);
        setJustSelectedTo(true);
        setTo(airport.code);
        setSelectedToAirport(airport);
        setToResults([]);
    };

    const handleValidation = () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayString = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');

        if (!from) {
            toast.error('Please fill departure(from) city');
        } else if (!selectedFromAirport || !from.includes(selectedFromAirport.code)) {
            toast.error('Please select a valid departure(from) city from the dropdown');
        }
        else if (!to) {
            toast.error('Please fill arrival(to) city');
        } else if (!selectedToAirport || !to.includes(selectedToAirport.code)) {
            toast.error('Please select a valid arrival(to) city from the dropdown');
        }
        else if (!departureDate) {
            toast.error('Please fill departure date');
        }
        else if (!returnDate && tripType === 'Round Trip') {
            toast.error('Please fill return date');
        }
        else if (departureDate < todayString) {
            toast.error('Departure date cannot be in the past. Please select a valid date.');
        }
        else if (tripType === 'Round Trip' && returnDate < todayString) {
            toast.error('Return date cannot be in the past. Please select a valid date.');
        }
        else {
            const totalTravellers = travellers.adult + travellers.child + travellers.infant;

            // Set default purpose value if none selected
            let purposeValue = "Travel";
            if (hotelData.purpose && hotelData.purpose !== "0") {
                purposeValue = hotelData.purpose;
            }

            navigate("/booking-details", {
                state: {
                    from,
                    to,
                    departureDate: departureDate,
                    returnDate: tripType === 'Round Trip' ? returnDate : null,
                    tripType: tripType === 'Round Trip' ? tripType : "one Way",
                    travellers: totalTravellers,
                    travellerDetails: travellers,
                    travelClass,
                    purpose: purposeValue
                }
            });
        }
    };

    const handleHotelValidation = () => {
        console.log(hotelData,"hotelData");
        if (!hotelData.city || hotelData.city === "0") {
            toast.error("Please select a city");
            return;
        }
        else if (!hotelData.checkinDate) {
            toast.error("Please select a check-in date");
            return;
        }
        else if (!hotelData.checkoutDate) {
            toast.error("Please select a check-out date");
            return;
        }
        else if (new Date(hotelData.checkinDate) > new Date(hotelData.checkoutDate)) {
            toast.error("Check-in date cannot be later than the check-out date.");
            return;
        }
        else if (!hotelData.purpose || hotelData.purpose === "0") {
            toast.error("Please select a purpose");
            return;
        }
        else {

            navigate("/hotel-bookingDetails", { state: hotelData })
        }
    }

    const getTravellerSummary = () => {
        const total = travellers.adult + travellers.child + travellers.infant;
        let summary = `${total} Traveller`;
        if (total > 1) summary += 's';

        if (travellers.child > 0) {
            summary += `, ${travellers.child} Child`;
            if (travellers.child > 1) summary += 'ren';
        }

        if (travellers.infant > 0) {
            summary += `, ${travellers.infant} Infant`;
            if (travellers.infant > 1) summary += 's';
        }

        summary += ` · ${travelClass}`;
        return summary;
    };


        

    return (
        <div className="w-full max-w-2xl p-4 ml-auto" style={{ overflow: "visible" }}>
            <div className="bg-white rounded-xl shadow-lg" style={{ overflow: "visible" }}>
                {/* Tab Selection */}
                <div className="flex border-b">
                    <button
                        className={`w-1/3 py-3 px-2 text-center font-medium transition-colors duration-300
      text-xs sm:text-sm md:text-base
      ${activeButton === 'Flight' ? 'bg-[#ec601d] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                        onClick={() => setActiveButton('Flight')}
                    >
                        <i className="fas fa-plane mr-1 text-xs sm:text-sm md:text-base"></i> Flight
                    </button>

                    <button
                        className={`w-1/3 py-3 px-2 text-center font-medium transition-colors duration-300
      text-xs sm:text-sm md:text-base
      ${activeButton === 'Hotels' ? 'bg-[#ec601d] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                        onClick={() => setActiveButton('Hotels')}
                    >
                        <i className="fas fa-hotel mr-1 text-xs sm:text-sm md:text-base"></i> Hotels
                    </button>

                    <button
                        className={`w-1/3 py-3 px-2 text-center font-medium transition-colors duration-300
      text-xs sm:text-sm md:text-base
      ${activeButton === 'Insurance' ? 'bg-[#ec601d] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                        onClick={() => setActiveButton('Insurance')}
                    >
                        <i className="fas fa-shield-alt mr-1 text-xs sm:text-sm md:text-base"></i> Insurance
                    </button>
                </div>


                {/* Flight Form */}
                {activeButton === "Flight" && (
                    <>
                        {showDepartureCalendar && (
                            <ModernCalendar
                                selectedDate={departureDate}
                                onDateChange={handleDepartureDateChange}
                                minDate={new Date().toISOString().split('T')[0]}
                                inputRef={departureDateRef}
                                onClose={() => setShowDepartureCalendar(false)}
                            />
                        )}

                        {showReturnCalendar && (
                            <ModernCalendar
                                selectedDate={returnDate}
                                onDateChange={handleReturnDateChange}
                                minDate={departureDate || new Date().toISOString().split('T')[0]}
                                inputRef={returnDateRef}
                                onClose={() => setShowReturnCalendar(false)}
                                isRange={true}
                                startDate={departureDate}
                                endDate={returnDate}
                            />
                        )}
                        <div className="p-6" style={{ overflow: "visible" }}>
                            {/* Trip Type Toggle */}
                            <div className="flex items-center justify-center space-x-4 mb-6">
                                <button
                                    className={`px-4 py-2 rounded-full ${tripType === "One Way" ? 'bg-[#ec601d] text-white' : 'bg-gray-100 text-gray-700'}`}
                                    onClick={() => setTripType("One Way")}
                                >
                                    One Way
                                </button>
                                <button
                                    className={`px-4 py-2 rounded-full ${tripType === "Round Trip" ? 'bg-[#ec601d] text-white' : 'bg-gray-100 text-gray-700'}`}
                                    onClick={() => setTripType("Round Trip")}
                                >
                                    Round Trip
                                </button>
                            </div>

                            {/* From/To Inputs (single row) */}
                            <div className="flex items-center gap-2 sm:gap-4 mb-4 px-2">
                                <div className="relative flex-1 min-w-0">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                                    <div className="w-full">
                                        {selectedFromAirport ? (
                                            <div 
                                                onClick={() => {
                                                    setFrom('');
                                                    setSelectedFromAirport(null);
                                                    setJustSelectedFrom(false);
                                                }}
                                                className="w-full px-4 border border-gray-300 rounded-lg bg-white flex items-center justify-between h-[100px] sm:h-16 cursor-pointer hover:border-[#ec601d] transition-colors duration-200"
                                            >
                                                <div className="text-left flex flex-col justify-center w-full">
                                                    <div className="text-lg font-semibold text-gray-800 leading-tight">{selectedFromAirport.city?.name || ''}</div>
                                                    <div className="text-xs text-gray-600 leading-tight">{`${selectedFromAirport.code || ''} - ${selectedFromAirport.name || ''}`}</div>
                                                </div>
                                            </div>
                                        ) : (
                                            <input
                                                type="text"
                                                value={from}
                                                onChange={(e) => {
                                                    setFrom(e.target.value);
                                                    setSelectedFromAirport(null);
                                                    setJustSelectedFrom(false);
                                                }}
                                                className="w-full px-4 py-3 h-[100px] sm:h-16 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ec601d] focus:border-[#ec601d] outline-none transition"
                                                placeholder="City or Airport"
                                            />
                                        )}
                                    </div>
                                    {fromResults.length > 0 && (
                                        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                                            {fromResults.slice(0, 5).map((airport) => (
                                                <li
                                                    key={airport.id}
                                                    onClick={() => handleSelectFrom(airport)}
                                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition"
                                                >
                                                    <div className="font-medium">{airport.name} ({airport.code})</div>
                                                    <div className="text-sm text-gray-600">{airport.city.name}</div>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>

                                {/* Swap Button - inline between inputs */}
                                <div className="flex items-center justify-center z-10">
                                    <button
                                        className=""
                                        onClick={() => {
                                            const tempFrom = from;
                                            const tempSelectedFrom = selectedFromAirport;
                                            setFrom(to);
                                            setSelectedFromAirport(selectedToAirport);
                                            setTo(tempFrom);
                                            setSelectedToAirport(tempSelectedFrom);
                                        }}
                                    >
                                        <img src="/images/flip1.png" alt="Swap" className="h-8 w-8 md:h-8 md:w-8" />
                                    </button>
                                </div>

                                <div className="relative flex-1 min-w-0">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                                    <div className="w-full">
                                        {selectedToAirport ? (
                                            <div 
                                                onClick={() => {
                                                    setTo('');
                                                    setSelectedToAirport(null);
                                                    setJustSelectedTo(false);
                                                }}
                                                className="w-full px-4 border border-gray-300 rounded-lg bg-white flex items-center justify-between h-[100px] sm:h-16 cursor-pointer hover:border-[#ec601d] transition-colors duration-200"
                                            >
                                                <div className="text-left flex flex-col justify-center w-full">
                                                    <div className="text-lg font-semibold text-gray-800 leading-tight">{selectedToAirport.city?.name || ''}</div>
                                                    <div className="text-xs text-gray-600 leading-tight">{`${selectedToAirport.code || ''} - ${selectedToAirport.name || ''}`}</div>
                                                </div>
                                            </div>
                                        ) : (
                                            <input
                                                type="text"
                                                value={to}
                                                onChange={(e) => { setTo(e.target.value); setSelectedToAirport(null); setJustSelectedTo(false); }}
                                                className="w-full px-4 py-3 h-[100px] sm:h-16 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ec601d] focus:border-[#ec601d] outline-none transition"
                                                placeholder="City or Airport"
                                            />
                                        )}
                                    </div>
                                    {toResults.length > 0 && (
                                        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                                            {toResults.slice(0, 5).map((airport) => (
                                                <li
                                                    key={airport.id}
                                                    onClick={() => handleSelectTo(airport)}
                                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition"
                                                >
                                                    <div className="font-medium">{airport.name} ({airport.code})</div>
                                                    <div className="text-sm text-gray-600">{airport.city.name}</div>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>

                            {/* Date Inputs */}
                            <div className={`grid ${tripType === "Round Trip" ? "grid-cols-2" : "grid-cols-1"} ${tripType === "Round Trip" ? "md:grid-cols-2" : "md:grid-cols-1"} gap-4 mb-4`}>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Departure</label>
                                    <div
                                        className="relative"
                                        ref={departureDateRef}
                                    >
                                        <div
                                            className="w-full px-4 py-3 h-14 border border-gray-300 rounded-lg bg-white cursor-pointer flex items-center justify-between"
                                            onClick={() => setShowDepartureCalendar(true)}
                                        >
                                            <span className={displayDepartureDate ? "text-gray-800" : "text-gray-400"}>
                                                {displayDepartureDate || "DD/MM/YYYY"}
                                            </span>
                                            {/* Calendar icon */}
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#ec601d]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>


                                    </div>
                                </div>

                                {tripType === "Round Trip" && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Return</label>
                                        <div
                                            className="relative"
                                            ref={returnDateRef}
                                        >
                                            <div
                                                className="w-full px-4 py-3 h-14 border border-gray-300 rounded-lg bg-white cursor-pointer flex items-center justify-between"
                                                onClick={() => setShowReturnCalendar(true)}
                                            >
                                                <span className={displayReturnDate ? "text-gray-800" : "text-gray-400"}>
                                                    {displayReturnDate || "DD/MM/YYYY"}
                                                </span>
                                                {/* Calendar icon */}
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#ec601d]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>


                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Travelers & Class */}
                            <div className="mb-6 relative" style={{ overflow: "visible" }}>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Travelers & Class</label>
                                <div
                                    className="border border-gray-300 rounded-lg p-4 cursor-pointer flex justify-between items-center"
                                    onClick={() => setShowTravellerOptions(!showTravellerOptions)}
                                >
                                    <div>

                                        <div className="text-sm text-gray-600">{getTravellerSummary()}</div>
                                    </div>
                                    <div className="text-gray-600">
                                        {showTravellerOptions ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                    </div>
                                </div>

                                {/* Collapsible content */}
                                {showTravellerOptions && (
                                    <div className="absolute z-[999] left-0 right-0 top-full mt-1 border border-gray-300 rounded-lg p-5 bg-white shadow-2xl " style={{ width: "105%", left: "-2.5%", maxHeight: "400px", overflowY: "auto" }}>
                                        <div className="mb-4">
                                            <div className="flex justify-between items-center mb-4">
                                                <div>
                                                    <p className="font-medium text-base">Adult</p>
                                                    <p className="text-xs text-gray-500">12+ years</p>
                                                </div>
                                                <div className="flex items-center">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleTravellerChange('adult', 'decrease');
                                                        }}
                                                        className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-100 text-gray-700"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="mx-4 w-5 text-center font-medium">{travellers.adult}</span>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleTravellerChange('adult', 'increase');
                                                        }}
                                                        className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-100 text-gray-700"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="flex justify-between items-center mb-4">
                                                <div>
                                                    <p className="font-medium text-base">Child</p>
                                                    <p className="text-xs text-gray-500">2-12 years</p>
                                                </div>
                                                <div className="flex items-center">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleTravellerChange('child', 'decrease');
                                                        }}
                                                        className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-100 text-gray-700"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="mx-4 w-5 text-center font-medium">{travellers.child}</span>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleTravellerChange('child', 'increase');
                                                        }}
                                                        className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-100 text-gray-700"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <p className="font-medium text-base">Infant</p>
                                                    <p className="text-xs text-gray-500">0 to 23 months</p>
                                                </div>
                                                <div className="flex items-center">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleTravellerChange('infant', 'decrease');
                                                        }}
                                                        className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-100 text-gray-700"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="mx-4 w-5 text-center font-medium">{travellers.infant}</span>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleTravellerChange('infant', 'increase');
                                                        }}
                                                        className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-100 text-gray-700"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-4 border-t pt-4">
                                            <p className="text-sm font-medium text-gray-700 mb-2">Travel Class</p>
                                            <div className="grid grid-cols-1 gap-2">
                                                <label className="flex items-center">
                                                    <input
                                                        type="radio"
                                                        name="travelClass"
                                                        className="mr-2"
                                                        checked={travelClass === 'Economy'}
                                                        onChange={() => setTravelClass('Economy')}
                                                        onClick={(e) => e.stopPropagation()}
                                                    />
                                                    Economy
                                                </label>
                                                <label className="flex items-center">
                                                    <input
                                                        type="radio"
                                                        name="travelClass"
                                                        className="mr-2"
                                                        checked={travelClass === 'Premium Economy'}
                                                        onChange={() => setTravelClass('Premium Economy')}
                                                        onClick={(e) => e.stopPropagation()}
                                                    />
                                                    Premium Economy
                                                </label>
                                                <label className="flex items-center">
                                                    <input
                                                        type="radio"
                                                        name="travelClass"
                                                        className="mr-2"
                                                        checked={travelClass === 'Business'}
                                                        onChange={() => setTravelClass('Business')}
                                                        onClick={(e) => e.stopPropagation()}
                                                    />
                                                    Business
                                                </label>
                                                <label className="flex items-center">
                                                    <input
                                                        type="radio"
                                                        name="travelClass"
                                                        className="mr-2"
                                                        checked={travelClass === 'First'}
                                                        onChange={() => setTravelClass('First')}
                                                        onClick={(e) => e.stopPropagation()}
                                                    />
                                                    First
                                                </label>
                                            </div>
                                        </div>
                                        <div className="flex justify-end">
                                            <button
                                                className="w-[30%] bg-[#ec601d] hover:bg-[#d15518] text-white font-normal text-sm py-2 px-2 rounded-lg mt-4 transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#ec601d] focus:ring-opacity-50"
                                                onClick={() => setShowTravellerOptions(!showTravellerOptions)}
                                            >Done</button>
                                        </div>

                                    </div>

                                )}
                            </div>



                            <button
                                onClick={handleValidation}
                                className="w-full bg-[#ec601d] hover:bg-[#e3733f] text-white font-medium py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105"
                            >
                                Search Flights
                            </button>
                        </div>
                    </>
                )}

                {/* Hotel Form */}
                {activeButton === "Hotels" && (
                    <>
                        {showCheckinCalendar && (
                            <ModernCalendar
                                selectedDate={hotelData.checkinDate}
                                onDateChange={handleCheckinDateChange}
                                minDate={new Date().toISOString().split('T')[0]}
                                inputRef={checkinDateRef}
                                onClose={() => setShowCheckinCalendar(false)}
                            />
                        )}
                        {showCheckoutCalendar && (
                            <ModernCalendar
                                selectedDate={hotelData.checkoutDate}
                                onDateChange={handleCheckoutDateChange}
                                minDate={hotelData.checkinDate || new Date().toISOString().split('T')[0]}
                                inputRef={checkoutDateRef}
                                onClose={() => setShowCheckoutCalendar(false)}
                                isRange={true}
                                startDate={hotelData.checkinDate}
                                endDate={hotelData.checkoutDate}
                            />
                        )}
                        <div className="p-6">
                            <div className="space-y-4">
                                {/* City Selection */}
                                <div className="relative mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                    <input type="text"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        className="w-full px-4 py-3 h-14 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ec601d] focus:border-[#ec601d] outline-none transition"
                                        placeholder="City" />

                                    {cityResults.length > 0 && (
                                        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                                            {cityResults.slice(0, 5).map((city) => (
                                                <>


                                                    <li
                                                        key={city.id}
                                                        onClick={() => handleCitySelect(city.name)}
                                                        className="flex gap-x-2  items-center px-2 py-2 hover:bg-gray-100 cursor-pointer transition"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-6 w-6 text-[#ec601d]">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                                        </svg>



                                                        <div className="font-medium">{city?.name}, {city?.country?.name}</div>

                                                    </li>
                                                </>
                                            ))}
                                        </ul>
                                    )}

                                </div>

                                {/* Checkin/Checkout */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
                                        <div
                                            className="relative"
                                            ref={checkinDateRef}
                                        >
                                            <div
                                                className="w-full px-4 py-3 h-14 border border-gray-300 rounded-lg bg-white cursor-pointer flex items-center justify-between"
                                                onClick={() => setShowCheckinCalendar(true)}
                                            >
                                                <span className={displayCheckinDate ? "text-gray-800" : "text-gray-400"}>
                                                    {displayCheckinDate || "DD/MM/YYYY"}
                                                </span>
                                                {/* Calendar icon */}
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#ec601d]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>


                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
                                        <div
                                            className="relative"
                                            ref={checkoutDateRef}
                                        >
                                            <div
                                                className="w-full px-4 py-3 h-14 border border-gray-300 rounded-lg bg-white cursor-pointer flex items-center justify-between"
                                                onClick={() => setShowCheckoutCalendar(true)}
                                            >
                                                <span className={displayCheckoutDate ? "text-gray-800" : "text-gray-400"}>
                                                    {displayCheckoutDate || "DD/MM/YYYY"}
                                                </span>
                                                {/* Calendar icon */}
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#ec601d]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>


                                        </div>
                                    </div>
                                </div>

                                {/* Travelers & Purpose */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Travelers</label>
                                        <select
                                            name="travellers"
                                            value={hotelData.travellers}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ec601d] focus:border-[#ec601d] outline-none transition appearance-none bg-white"
                                        >
                                            {[...Array(10)].map((_, i) => (
                                                <option key={i} value={i + 1}>{i + 1} {i === 0 ? 'Person' : 'People'}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Purpose</label>
                                        <select
                                            name="purpose"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ec601d] focus:border-[#ec601d] outline-none transition appearance-none bg-white"
                                            value={hotelData.purpose}
                                            onChange={handleChange}
                                        >
                                            <option value="0">Select Purpose</option>
                                            <option value="Visa Application">Visa Application</option>
                                            <option value="Office Work Place needs it">Office Work</option>
                                            <option value="Passport Renewal">Passport Renewal</option>
                                            <option value="Visa Renewal">Visa Renewal</option>
                                            <option value="Car Rental">Car Rental</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                </div>

                                <button
                                    onClick={handleHotelValidation}
                                    className="w-full mt-6 bg-[#ec601d] hover:bg-[#e3733f] text-white font-medium py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105"
                                >
                                    Search Hotels
                                </button>

                                {/* Trusted Travel Partners */}
                                <div className="mt-6 text-center">
                                    <p className="text-gray-700 font-bold uppercase text-sm mb-3">TRUSTED TRAVEL PARTNERS</p>
                                    <div className="flex justify-center items-center space-x-4">
                                        <img src="/images/mmt-logo.png" alt="MakeMyTrip" className="h-8 object-contain" />
                                        <img src="/images/airiq-logo.jpeg" alt="AirIQ" className="h-8 object-contain" />
                                        <img src="/images/tripjack-logo.png" alt="TripJack" className="h-8 object-contain" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {/* Travel Insurance Form */}
                {activeButton === "Insurance" && (
                    <Insurance formatDateForDisplay={formatDateForDisplay}/>
                )}
            </div>
            <ToastContainer />
        </div>
    )
}

export default LeftSide;
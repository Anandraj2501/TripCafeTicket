import axios from "axios";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
                    className="text-gray-600 hover:text-[rgb(29,181,236)] focus:outline-none"
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
                            className="text-[rgb(29,181,236)] font-medium hover:bg-gray-100 rounded px-2 py-1"
                            onClick={() => setShowMonthSelector(!showMonthSelector)}
                        >
                            {months[currentMonth.getMonth()]}
                        </button>
                        <button
                            className="text-[rgb(29,181,236)] font-medium hover:bg-gray-100 rounded px-2 py-1"
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
                                    className={`p-2 rounded hover:bg-gray-100 ${index === currentMonth.getMonth() ? 'bg-[rgb(29,181,236)] text-white hover:bg-[rgb(29,181,236)]' : ''
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
                                    className={`p-2 rounded hover:bg-gray-100 ${year === currentMonth.getFullYear() ? 'bg-[rgb(29,181,236)] text-white hover:bg-[rgb(29,181,236)]' : ''
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
                    className="text-gray-600 hover:text-[rgb(29,181,236)] focus:outline-none"
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
                            ${day.isToday ? 'border border-[rgb(29,181,236)]' : ''}
                            ${day.isSelected ? 'bg-[rgb(29,181,236)] text-white' : 'hover:bg-gray-100'}
                            ${day.inRange && !day.isSelected ? 'bg-[rgb(29,181,236)]/20' : ''}
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
                    className="text-sm text-[rgb(29,181,236)] hover:underline"
                    onClick={handleTodayClick}
                >
                    Today
                </button>
                <button
                    className="text-sm text-[rgb(29,181,236)] hover:underline"
                    onClick={handleClearClick}
                >
                    Clear
                </button>
            </div>
        </div>
    );
};



const Insurance = ({ formatDateForDisplay }) => {
    const navigate = useNavigate();
    const departureDateRef = useRef(null);
    const returnDateRef = useRef(null);

    const [showDepartureCalendar, setShowDepartureCalendar] = useState(false);

    const [showReturnCalendar, setShowReturnCalendar] = useState(false);

    const [departureDate, setDepartureDate] = useState('');

    const [displayDepartureDate, setDisplayDepartureDate] = useState('');
    const [displayReturnDate, setDisplayReturnDate] = useState('');
    const [returnDate, setReturnDate] = useState('');

    const [justSelectedFrom, setjustSelectedFrom] = useState(false);
    const [justSelectedTo, setjustSelectedTo] = useState(false);


    const [fromCountry, setFromCountry] = useState('');
    const [toCountry, setToCountry] = useState('');

    const [fromResults, setFromResults] = useState([]);
    const [toResults, setToResults] = useState([]);

    const [showResults, setShowResults] = useState(false);
    const [showToResults, setShowToResults] = useState(false);

    const [insuranceData, setInsuranceData] = useState({
        from: '',
        to: '',
        departureDate: '',
        returnDate: '',
        purpose: ''
    });


    // Handle departure date change
    const handleDepartureDateChange = (dateValue) => {
        setInsuranceData({
            ...insuranceData,
            departureDate: dateValue
        });
        setDepartureDate(dateValue);
        setDisplayDepartureDate(formatDateForDisplay(dateValue));
        setShowDepartureCalendar(false);
    };

    // Handle return date change
    const handleReturnDateChange = (dateValue) => {
        setInsuranceData({
            ...insuranceData,
            returnDate: dateValue
        })
        setReturnDate(dateValue);
        setDisplayReturnDate(formatDateForDisplay(dateValue));
        setShowReturnCalendar(false);
    };

    useEffect(() => {
        if (justSelectedFrom) {
            setjustSelectedFrom(false);
            return;
        }

        if (fromCountry.length > 2) {
            axios.get(`${process.env.REACT_APP_TEQUILA_URL}/locations/query?term=${fromCountry}&locale=en-US&location_types=country&limit=20&active_only=true`, {
                headers: {
                    'apikey': process.env.REACT_APP_TEQUILA_API,
                }
            })
                .then(response => {
                    console.log(response.data.locations);
                    setFromResults(response.data.locations);
                    setShowResults(true);
                })
                .catch(error => {
                    console.error('Error fetching data: ', error);
                });
        } else {
            setFromResults([]);
        }
    }, [fromCountry])

    useEffect(() => {
        if (justSelectedTo) {
            setjustSelectedTo(false);
            return;
        }

        if (toCountry.length > 2) {
            axios.get(`${process.env.REACT_APP_TEQUILA_URL}/locations/query?term=${toCountry}&locale=en-US&location_types=country&limit=20&active_only=true`, {
                headers: {
                    'apikey': process.env.REACT_APP_TEQUILA_API,
                }
            })
                .then(response => {
                    console.log(response.data.locations);
                    setToResults(response.data.locations);
                    setShowToResults(true);
                })
                .catch(error => {
                    console.error('Error fetching data: ', error);
                });
        } else {
            setToResults([]);
        }
    }, [toCountry])


    const handleFromSelection = (fromCountry) => {
        setjustSelectedFrom(true);
        setFromCountry(fromCountry);
        setFromResults([]);
        setShowResults(false);
        setInsuranceData({
            ...insuranceData,
            from: fromCountry
        })
    }

    const handleToSelection = (toCountry) => {
        setjustSelectedTo(true);
        setToCountry(toCountry);
        setToResults([]);
        setShowToResults(false);
        setInsuranceData({
            ...insuranceData,
            to: toCountry
        });
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInsuranceData({
            ...insuranceData,
            [name]: value
        });
    }

    const handleNavigation = () => {
        if (!insuranceData.from || !insuranceData.to || !insuranceData.departureDate || !insuranceData.purpose) {
           
            toast.error("Please fil all the fields");
            return;
        }
        navigate("/insurance-details",{state: { insuranceData }});
    }

    return (


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

                {/* From/To Inputs */}
                <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mb-4 relative">
                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                        <input
                            type="text"
                            value={fromCountry}
                            onChange={(e) => setFromCountry(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[rgb(29,181,236)] focus:border-[rgb(29,181,236)] outline-none transition"
                            placeholder="Country"
                        />
                        {showResults && fromResults?.length > 0 && (
                            <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                                {fromResults.slice(0, 5).map((country) => (
                                    <li
                                        key={country?.id}
                                        onClick={() => handleFromSelection(country?.name)}
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition"
                                    >
                                        <div className="font-medium">{country?.name}</div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Swap Button - Visible on both mobile and desktop */}
                    <div className="absolute left-1/2 top-1/3 mt-2 transform -translate-x-1/2 z-10 md:block">
                        <button
                            className=""
                            onClick={() => {
                                // const tempFrom = from;
                                // const tempSelectedFrom = selectedFromAirport;
                                // setFrom(to);
                                // setSelectedFromAirport(selectedToAirport);
                                // setTo(tempFrom);
                                // setSelectedToAirport(tempSelectedFrom);
                            }}
                        >
                            <img src="/images/flip1.png" alt="Swap" className="h-8 w-8" />
                        </button>
                    </div>

                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                        <input
                            type="text"
                            value={toCountry}
                            onChange={(e) => setToCountry(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[rgb(29,181,236)] focus:border-[rgb(29,181,236)] outline-none transition"
                            placeholder="Country"
                        />
                        {showToResults && toResults?.length > 0 && (
                            <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                                {toResults.slice(0, 5).map((country) => (
                                    <li
                                        key={country?.id}
                                        onClick={() => handleToSelection(country?.name)}
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition"
                                    >
                                        <div className="font-medium">{country?.name}</div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                {/* Date Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                        <div
                            className="relative"
                            ref={departureDateRef}
                        >
                            <div
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white cursor-pointer flex items-center justify-between"
                                onClick={() => setShowDepartureCalendar(true)}
                            >
                                <span className={displayDepartureDate ? "text-gray-800" : "text-gray-400"}>
                                    {displayDepartureDate || "DD/MM/YYYY"}
                                </span>
                                {/* Calendar icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[rgb(29,181,236)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>


                        </div>
                    </div>


                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                        <div
                            className="relative"
                            ref={returnDateRef}
                        >
                            <div
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white cursor-pointer flex items-center justify-between"
                                onClick={() => setShowReturnCalendar(true)}
                            >
                                <span className={displayReturnDate ? "text-gray-800" : "text-gray-400"}>
                                    {displayReturnDate || "DD/MM/YYYY"}
                                </span>
                                {/* Calendar icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[rgb(29,181,236)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>


                        </div>
                    </div>
                </div>

                <div className="gap-4 mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Purpose</label>
                    <select
                        name="purpose"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[rgb(29,181,236)] focus:border-[rgb(29,181,236)] outline-none transition appearance-none bg-white"
                        value={insuranceData.purpose}
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

                <button
                    // onClick={handleValidation}
                    className="w-full mt-6 bg-[rgb(29,181,236)] hover:bg-[#e3733f] text-white font-medium py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105"
                    onClick={handleNavigation}
                >
                    Get Insurance
                </button>
            </div>
        </>
    );
}

export default Insurance;
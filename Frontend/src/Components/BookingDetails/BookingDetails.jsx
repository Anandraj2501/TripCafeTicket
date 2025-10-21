import { useEffect, useState } from "react";
import { HiMiniArrowRight } from "react-icons/hi2";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { IoAirplane } from "react-icons/io5";
import BookingDetailsRight from "./BookingDetailsRight";
import airlinesData from "./airlines.json";
import countries from "../../data/countries";
import axios from "axios";
import Footer from "../Footer/Footer";
import { ToastContainer, toast } from 'react-toastify';
import Navbar from "../Navbar/Navbar";

const BookingDetails = () => {
    const location = useLocation();
    const [totalPassenger, setTotalPassenger] = useState(0);
    const [amount, setAmount] = useState(500);
    const [tripAmount, setTripAmount] = useState();
    const { from, to, departureDate, returnDate, tripType, purpose, travellers, travelClass } = location.state || {};
    const [JourneyDetails, setJourneyDetails] = useState();
    const [addOnDetails, setAddOnDetails] = useState({
        bag: {
            hand_weight: "",
            hold_weight: "",
        },
        price: "",
        airlines: [],
    })
    const [departure, setDeparture] = useState();
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();

    // New states for flight selection flow
    const [flightList, setFlightList] = useState([]);
    const [selectedFlight, setSelectedFlight] = useState(null);
    const [showBookingDetails, setShowBookingDetails] = useState(false);
    const [loadingFlights, setLoadingFlights] = useState(true);
    const [fromAirport, setFromAirport] = useState(location.state?.selectedFromAirport || {});
    const [toAirport, setToAirport] = useState(location.state?.selectedToAirport || {});

    // //console.log(location.state, "location state");
    const [contactDetails, setContactDetails] = useState({
        name: '',
        phone: '',
        email: ''
    });

    const handleContactDetailsChange = (updatedDetails) => {
        setContactDetails(prevDetails => ({ ...prevDetails, ...updatedDetails }));
    };

    const [passengers, setPassengers] = useState([]);

    // Helper function to get country ISO code from nationality
    const getCountryISOCode = (nationalityName) => {
        if (!nationalityName) return 'in'; // Default to India if no nationality

        // Handle special cases like "Indian" -> "India"
        const countryMappings = {
            "Indian": "India",
            "American": "United States",
            "British": "United Kingdom",
            "Chinese": "China",
            "Japanese": "Japan",
            "Russian": "Russia",
            "Brazilian": "Brazil",
            "Canadian": "Canada",
            "German": "Germany",
            "Australian": "Australia",
            "French": "France",
            "Italian": "Italy",
            "Spanish": "Spain",
            "Mexican": "Mexico",
            "South African": "South Africa",
            "Nigerian": "Nigeria",
            "Egyptian": "Egypt",
            "Saudi Arabian": "Saudi Arabia",
            "UAE": "United Arab Emirates",
            "Malaysian": "Malaysia",
            "Singaporean": "Singapore",
            "Indonesian": "Indonesia",
            "Thai": "Thailand",
            "Vietnamese": "Vietnam",
            "South Korean": "South Korea"
        };

        // Check if we need to map the nationality to country name
        const countryName = countryMappings[nationalityName] || nationalityName;

        // Try to find the country in our imported countries list
        const country = countries.find(c => c.name === countryName);

        if (country) {
            return country.code.toLowerCase();
        }

        // Fallback to hardcoded values for common nationalities not in the mapping
        const hardcodedISO = {
            "Afghan": "af",
            "Albanian": "al",
            "Algerian": "dz",
            "Andorran": "ad",
            "Angolan": "ao",
            "Antiguan": "ag",
            "Argentine": "ar",
            "Armenian": "am",
            "Austrian": "at",
            "Azerbaijani": "az",
            "Bahamian": "bs",
            "Bahraini": "bh",
            "Bangladeshi": "bd",
            "Barbadian": "bb",
            "Belarusian": "by",
            "Belgian": "be",
            "Belizean": "bz",
            "Beninese": "bj",
            "Bhutanese": "bt",
            "Bolivian": "bo",
            "Bosnian": "ba",
            "Botswanan": "bw",
            "Bruneian": "bn",
            "Bulgarian": "bg",
            "Burkinabe": "bf",
            "Burmese": "mm",
            "Burundian": "bi",
            "Cambodian": "kh",
            "Cameroonian": "cm",
            "Cape Verdean": "cv",
            "Central African": "cf",
            "Chadian": "td",
            "Chilean": "cl",
            "Colombian": "co",
            "Comorian": "km",
            "Congolese": "cd",
            "Costa Rican": "cr",
            "Croatian": "hr",
            "Cuban": "cu",
            "Cypriot": "cy",
            "Czech": "cz",
            "Danish": "dk",
            "Djiboutian": "dj",
            "Dominican": "do",
            "Dutch": "nl",
            "Ecuadorean": "ec",
            "Salvadoran": "sv",
            "Emirati": "ae",
            "Equatorial Guinean": "gq",
            "Eritrean": "er",
            "Estonian": "ee",
            "Ethiopian": "et",
            "Fijian": "fj",
            "Filipino": "ph",
            "Finnish": "fi",
            "Gabonese": "ga",
            "Gambian": "gm",
            "Georgian": "ge",
            "Ghanaian": "gh",
            "Greek": "gr",
            "Grenadian": "gd",
            "Guatemalan": "gt",
            "Guinean": "gn",
            "Guyanese": "gy",
            "Haitian": "ht",
            "Honduran": "hn",
            "Hungarian": "hu",
            "Icelandic": "is",
            "Iranian": "ir",
            "Iraqi": "iq",
            "Irish": "ie",
            "Israeli": "il",
            "Ivorian": "ci",
            "Jamaican": "jm",
            "Jordanian": "jo",
            "Kazakhstani": "kz",
            "Kenyan": "ke",
            "Kuwaiti": "kw",
            "Kyrgyz": "kg",
            "Laotian": "la",
            "Latvian": "lv",
            "Lebanese": "lb",
            "Liberian": "lr",
            "Libyan": "ly",
            "Liechtensteiner": "li",
            "Lithuanian": "lt",
            "Luxembourger": "lu",
            "Macedonian": "mk",
            "Malagasy": "mg",
            "Malawian": "mw",
            "Maldivian": "mv",
            "Malian": "ml",
            "Maltese": "mt",
            "Mauritanian": "mr",
            "Mauritian": "mu",
            "Moldovan": "md",
            "Monacan": "mc",
            "Mongolian": "mn",
            "Montenegrin": "me",
            "Moroccan": "ma",
            "Mozambican": "mz",
            "Namibian": "na",
            "Nepalese": "np",
            "Nicaraguan": "ni",
            "Nigerien": "ne",
            "North Korean": "kp",
            "Norwegian": "no",
            "Omani": "om",
            "Pakistani": "pk",
            "Panamanian": "pa",
            "Papua New Guinean": "pg",
            "Paraguayan": "py",
            "Peruvian": "pe",
            "Polish": "pl",
            "Portuguese": "pt",
            "Qatari": "qa",
            "Romanian": "ro",
            "Rwandan": "rw",
            "Saint Lucian": "lc",
            "Salvadoran": "sv",
            "Samoan": "ws",
            "Saudi": "sa",
            "Senegalese": "sn",
            "Serbian": "rs",
            "Seychellois": "sc",
            "Sierra Leonean": "sl",
            "Slovak": "sk",
            "Slovenian": "si",
            "Somali": "so",
            "South Sudanese": "ss",
            "Sri Lankan": "lk",
            "Sudanese": "sd",
            "Surinamese": "sr",
            "Swazi": "sz",
            "Swedish": "se",
            "Swiss": "ch",
            "Syrian": "sy",
            "Tajik": "tj",
            "Tanzanian": "tz",
            "Togolese": "tg",
            "Tongan": "to",
            "Trinidadian": "tt",
            "Tunisian": "tn",
            "Turkish": "tr",
            "Turkmen": "tm",
            "Ugandan": "ug",
            "Ukrainian": "ua",
            "Uruguayan": "uy",
            "Uzbekistani": "uz",
            "Venezuelan": "ve",
            "Yemeni": "ye",
            "Zambian": "zm",
            "Zimbabwean": "zw",
        };

        return hardcodedISO[nationalityName] || 'in'; // Default to India if not found
    };

    const addPassenger = () => {
        setPassengers([
            ...passengers,
            { title: 'Mr', firstName: '', lastName: '', dob: '', nationality: 'India' }
        ]);
        setTotalPassenger(passengers.length + 1);
    };

    const formatDate = (date) => {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const year = d.getFullYear();

        const hours = String(d.getHours()).padStart(2, '0');
        const minutes = String(d.getMinutes()).padStart(2, '0');
        const seconds = String(d.getSeconds()).padStart(2, '0');
        // // //console.log(hours, minutes, seconds);
        return `${day}/${month}/${year}`;
    };

    const extractCode = (airportString) => {
        const match = airportString.match(/\(([^)]+)\)/);

        if (match) {
            const airportCode = match[1];
            return `${airportCode}`;
        } else {
            // //console.log('No airport code found');
        }
    }

    // Helper to split a place/airport string into a prominent place name and a secondary airport string.
    const formatPlaceAirport = (text) => {
        if (!text) return { place: '', airport: '' };

        // Normalize to string
        const str = String(text).trim();

        // If there is a parenthesis part, use heuristics to pick the city name
        const parenMatch = str.match(/\(([^)]+)\)/);
        if (parenMatch) {
            const paren = parenMatch[1].trim();
            const beforeParen = str.split('(')[0].trim();
            const afterParen = str.split(')').slice(1).join(')').trim();

            // If there's text after the parentheses (e.g., '... (DEL) New Delhi'), prefer that as the place name
            if (afterParen) {
                return { place: afterParen, airport: str };
            }

            // If the parentheses contains an uppercase airport code like 'JFK' use the text before parentheses as place
            if (/^[A-Z]{2,4}$/.test(paren)) {
                const place = beforeParen.split('-').pop().split(',')[0].trim();
                return { place, airport: str };
            }

            // Otherwise use the parentheses content as the place (covers cases like 'All Airport (Goa)')
            return { place: paren, airport: str };
        }

        // If contains ' - ' pattern like 'CODE-CITY - Airport Name', try to extract the city after the dash
        if (str.includes(' - ')) {
            const parts = str.split(' - ');
            const left = parts[0].trim();
            const right = parts.slice(1).join(' - ').trim();
            const leftParts = left.split('-');
            const placeCandidate = leftParts[leftParts.length - 1].trim();
            return { place: placeCandidate || left, airport: right || str };
        }

        // Fallback: take text before comma as place, and show full text as airport
        const placeFallback = str.split(',')[0].trim();
        return { place: placeFallback, airport: str };
    }

    // Resolve a passed in code or text into place/airport using flightList when possible
    const resolvePlace = (value, direction = 'from') => {
        if (!value) return { place: '', airport: '' };

        const str = String(value).trim();

        // Small fallback map for common IATA codes to full airport strings
        const iataFallbacks = {
            DEL: 'Indira Gandhi International (DEL) New Delhi',
            BOM: 'Chhatrapati Shivaji Maharaj International (BOM) Mumbai',
            BLR: 'Kempegowda International (BLR) Bengaluru',
            MAA: 'Chennai International (MAA) Chennai',
            HYD: 'Rajiv Gandhi International (HYD) Hyderabad',
            GOI: 'Goa International (GOI) Dabolim (Goa)',
            AMD: 'Sardar Vallabhbhai Patel International (AMD) Ahmedabad',
            COK: 'Cochin International (COK) Kochi',
            CCU: 'Netaji Subhas Chandra Bose International (CCU) Kolkata'
        };

        // If value looks like an IATA code (e.g., DEL, BOM), try to find it in flightList
        if (/^[A-Z]{2,4}$/.test(str) && Array.isArray(flightList) && flightList.length > 0) {
            for (const flight of flightList) {
                // For outbound 'from' we look at the first route entry, for 'to' we look at the last
                const first = flight.route && flight.route[0];
                const last = flight.route && flight.route[flight.route.length - 1];

                if (direction === 'from' && first) {
                    if (first.cityCodeFrom === str || first.cityCode === str || first.flyFrom === str) {
                        return formatPlaceAirport(first.cityFrom || first.city);
                    }
                }

                if (direction === 'to' && last) {
                    if (last.cityCodeTo === str || last.cityCode === str || last.flyTo === str) {
                        return formatPlaceAirport(last.cityTo || last.city);
                    }
                }

                // Fallback: check any intermediate route entries
                if (flight.route && flight.route.length) {
                    const matched = flight.route.find(r => r.cityCodeFrom === str || r.cityCodeTo === str || r.flyFrom === str || r.flyTo === str);
                    if (matched) {
                        // Prefer the matched's cityFrom/cityTo depending on which matches
                        if (matched.cityCodeFrom === str || matched.flyFrom === str) return formatPlaceAirport(matched.cityFrom || matched.city);
                        if (matched.cityCodeTo === str || matched.flyTo === str) return formatPlaceAirport(matched.cityTo || matched.city);
                    }
                }
            }
        }

        // Fallback: use small IATA map if we have one
        if (/^[A-Z]{2,4}$/.test(str) && iataFallbacks[str]) {
            return formatPlaceAirport(iataFallbacks[str]);
        }

        // Otherwise, just format the provided text
        return formatPlaceAirport(str);
    }

    const renderAirportLine = (airportStr) => {
        if (!airportStr) return '';
        const s = String(airportStr).trim();
        const codeMatch = s.match(/\(([^)]+)\)/);
        if (codeMatch) {
            const code = codeMatch[1];
            // Remove the parentheses part and any duplicate code words
            const withoutParen = s.replace(/\([^)]*\)/g, '').trim();
            // If there's a trailing city name after the parentheses, include that
            const trailing = withoutParen.split(')').pop().trim();
            const name = withoutParen || s;
            return `${code} - ${name}`;
        }
        // Fallback: return original short text
        return s;
    }

    const getTotalTime = (totalSeconds) => {
        // Calculate total hours
        console.log("time is",totalSeconds);
        const hours = Math.floor(totalSeconds / 3600);

        // Calculate remaining seconds after converting to hours
        const remainingSeconds = totalSeconds % 3600;

        // Calculate minutes from remaining seconds
        const minutes = Math.floor(remainingSeconds / 60);
        console.log(`Total: ${hours} hours and ${minutes} minutes`);
        return `${hours}hr ${minutes}min`;

    }

    // Split a combined route array into outbound and return segments (if present)
    const splitRoute = (route = []) => {
        if (!Array.isArray(route) || route.length === 0) return { outbound: [], ret: [] };

        // Destination code of the first leg (outbound final destination candidate)
        const firstLegDest = route[0]?.cityTo || route[0]?.flyTo || route[0]?.cityCodeTo;

        // Find index where return flight likely starts: first segment that departs from the outbound destination
        let returnStart = route.findIndex((seg, i) => i > 0 && (
            seg.cityFrom === firstLegDest || seg.flyFrom === firstLegDest || seg.cityCodeFrom === firstLegDest
        ));

        // Fallback: some responses include a 'return' flag on segments
        if (returnStart === -1) {
            returnStart = route.findIndex((seg, i) => i > 0 && (seg.return === 1 || seg.return === true));
        }

        // If still not found, assume single-leg (no return split)
        if (returnStart === -1) return { outbound: route, ret: [] };

        return { outbound: route.slice(0, returnStart), ret: route.slice(returnStart) };
    }

    // Format the dates
    const formattedDepartureDate = formatDate(departureDate);
    const formattedReturnDate = formatDate(returnDate);

    // Deduplicate flights by composite key (flight number + dep + arr)
    const deduplicateFlights = (flights = []) => {
        const seen = new Set();
        return (flights || []).filter(flight => {
            try {
                const route = flight.route || [];
                const { outbound } = splitRoute(route);
                const firstSeg = outbound && outbound[0];
                const lastSeg = outbound && outbound[outbound.length - 1];

                // Prefer segment flight_no, fallback to airline or flight id
                const flightNo = firstSeg?.flight_no || firstSeg?.airline || (flight.airlines && flight.airlines[0]) || flight.id || '';
                const dep = firstSeg?.local_departure || '';
                const arr = lastSeg?.local_arrival || '';

                const key = `${flightNo}-${dep}-${arr}`;
                if (seen.has(key)) return false;
                seen.add(key);
                return true;
            } catch (e) {
                // If anything goes wrong, keep the flight
                return true;
            }
        });
    }

    const fetchAirline = async () => {
        setLoadingFlights(true);

        if (from && to && tripType === "one Way") {
            const searchFlights = async (stopovers) => {
                console.log(formattedDepartureDate, "dep date");
                return await axios.get(`${process.env.REACT_APP_TEQUILA_URL}/v2/search?fly_from=${from}&fly_to=${to}&date_from=${formattedDepartureDate}&date_to=${formattedDepartureDate}&curr=INR&limit=5&max_stopovers=${stopovers}`, {
                    headers: {
                        'apikey': process.env.REACT_APP_TEQUILA_API
                    }
                });
            };

            let airlines = await searchFlights(0);
            if (!airlines?.data?.data?.length) {
                airlines = await searchFlights(2);
            }

            const flightData = airlines?.data?.data || [];
            console.log(flightData, "flightData");
            setFlightList(deduplicateFlights(flightData));

        } else if (from && to) {
            const searchReturnFlights = async (stopovers) => {
                return await axios.get(`${process.env.REACT_APP_TEQUILA_URL}/v2/search?fly_from=${from}&fly_to=${to}&date_from=${formattedDepartureDate}&date_to=${formattedDepartureDate}&return_from=${formattedReturnDate}&return_to=${formattedReturnDate}&curr=INR&limit=5&max_stopovers=${stopovers}`, {
                    headers: {
                        'apikey': process.env.REACT_APP_TEQUILA_API
                    }
                });
            };

            let airlines = await searchReturnFlights(0);
            if (!airlines?.data?.data?.length) {
                airlines = await searchReturnFlights(2);
            }
            console.log('Return flight data:', airlines?.data?.data);

            const flightData = airlines?.data?.data || [];
            console.log(flightData, "flightData");
            setFlightList(deduplicateFlights(flightData));

        } else {
            toast.error("Please choose departure(from) and arrival(to) city from dropdown on previous page.");
        }

        setLoadingFlights(false);
    }

    const handleFlightSelect = (flight) => {
        setSelectedFlight(flight);
        console.log('Selected flight route:', flight?.route);
        console.log('Split route:', splitRoute(flight?.route));
        if (tripType === "Round Trip" && flight?.route?.length >= 2) {
            // Find the index where return flight starts
            const returnStartIndex = flight.route.findIndex((segment, index) =>
                index > 0 && segment.cityFrom === flight.route[flight.route.length - 1].cityTo
            );

            // Split routes into outbound and return
            const outboundRoute = flight.route.slice(0, returnStartIndex);
            const returnRoute = flight.route.slice(returnStartIndex);

            // Set journey details with both parts
            setJourneyDetails([...outboundRoute, ...returnRoute]);
        } else {
            setJourneyDetails(flight?.route);
        }

        setAddOnDetails({
            bag: {
                hand_weight: flight?.baglimit?.hand_weight || "0 kg",
                hold_weight: flight?.baglimit?.hold_weight || "0 kg",
            },
            price: flight?.price || "0",
            airlines: flight?.airlines || []
        });

        if (flight?.duration) {
            setDeparture(getTotalTime(flight.duration.total));
        }

        setShowBookingDetails(true);
        // Smooth scroll to booking section
        setTimeout(() => {
            const bookingSection = document.getElementById('booking-section');
            if (bookingSection) {
                bookingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 100);
    };

    const getAirlineLogo = (iataCode) => {
        // // //console.log(iataCode);
        const airline = airlinesData?.data?.find(airline => airline.iata_code === iataCode);
        // // //console.log(airline);
        return airline?.logo;
    }

    const getAirlineName = (iataCode) => {
        // // //console.log(iataCode);
        const airline = airlinesData?.data?.find(airline => airline.iata_code === iataCode);
        // // //console.log(airline);
        return airline?.name ? airline?.name : iataCode;
    }

    const formattedAmount = parseFloat(total).toFixed(2);

    const handlePaymentClick = async () => {
        // // //console.log(contactDetails,"contact");
        if (validateContactDetails()) {
            navigate("/payment-page", {
                state: {
                    amount: formattedAmount,
                    name: contactDetails.name,
                    phone: contactDetails.phone,
                    email: contactDetails.email,
                    passengers: passengers,
                    travellingDetails: location.state,
                    flightDetails: JourneyDetails,
                    purpose: purpose,
                    travelClass: travelClass,
                    selectedPaymentMethod: selectedPaymentMethod,
                    addOnDetails: addOnDetails,
                }
            });
        }
    }

    const validateContactDetails = () => {
        if (!contactDetails.name || !contactDetails.phone || !contactDetails.email) {
            toast.error("Please fill in all contact details (name, phone, and email) before making the payment.");
            return false;
        }
        else if (totalPassenger < 1) {
            toast.error("Please add Passenger");
            return false;
        }
        else if (JourneyDetails?.length === 0) {
            toast.error("Please wait we are fetching flights for you.");
            return false;
        }
        for (let i = 0; i < passengers.length; i++) {
            const passenger = passengers[i];
            if (!passenger.title || !passenger.firstName || !passenger.lastName || !passenger.nationality) {
                toast.error(`Please fill in all details for passenger ${i + 1}.`);
                return false;
            }
        }
        return true;
    };

    useEffect(() => {
        fetchAirline();
    }, [from, to, departureDate, returnDate]);

    useEffect(() => {
        setTotalPassenger(travellers);
        setPassengers(Array.from({ length: travellers }, () => ({ title: 'Mr', firstName: '', lastName: '', dob: '', nationality: 'India' })));
    }, [travellers])

    useEffect(() => {
        // Calculate the total and update state
        const calculatedTotal = tripType === "Round Trip" ? (amount * passengers.length) * 2 : amount * passengers.length;
        setTotal(calculatedTotal);
    }, [tripType, passengers, amount]);

    const formatTime = (local_departure, local_arrival) => {
        // //console.log(local_departure, local_arrival);
        const diffMs = new Date(local_arrival) - new Date(local_departure);
        const hours = Math.floor(diffMs / (1000 * 60 * 60));
        const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        return `${hours}h ${minutes}m`;
    }

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("Razorpay");

    const handlePaymentMethodChange = (event) => {
        setSelectedPaymentMethod(event.target.id);
    };

    return (
        <>
            <Navbar />
            <section className="min-h-screen bg-gradient-to-b from-white via-white to-[rgb(29,181,236)]/10 py-8 px-4 md:px-[5.5%] overflow-x-hidden max-w-full">
                <div className="w-full mx-auto">
                    <h2 className="text-left font-bold text-3xl md:text-4xl text-[rgb(29,181,236)] mb-4">
                        Showing {flightList.length} flights from {fromAirport?.code || from} to {toAirport?.code || to}
                    </h2>

                    {/* Flight List Section */}
                    <div className="grid gap-3 mb-8">
                        {loadingFlights ? (
                            <div className="text-center py-12">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[rgb(29,181,236)] mx-auto"></div>
                                <p className="mt-4 text-gray-600">Searching for flights...</p>
                            </div>
                        ) : flightList.length > 0 ? (
                            flightList.map((flight, index) => (
                                <div key={index} className="flex flex-col md:flex-row items-stretch gap-6 w-full md:items-stretch" style={{
                                    background: "antiquewhite",
                                    padding: "10px",
                                    borderRadius: "20px"
                                }}>
                                    {/* Outbound Flight Card */}
                                    <div className={`flex-1 w-full max-w-full min-w-0 h-full text-sm md:text-base bg-antiquewhite rounded-lg  p-4 sm:p-6 overflow-hidden break-words box-border transition-all duration-300 ${selectedFlight?.id === flight?.id ? "border-[rgb(29,181,236)] bg-[rgb(29,181,236)]/10" : "border-gray-200"
                                        }`}>
                                        <div className="text-sm uppercase font-medium text-gray-500 mb-3">Outbound Flight</div>
                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 h-full">
                                            {/* Left Section - Airline Info */}
                                            <div className="flex items-center space-x-4 md:w-1/3">
                                                <div className="h-12 w-12 flex items-center justify-center bg-gray-50 rounded-lg p-1">
                                                    {flight.airlines &&
                                                        flight.airlines[0] &&
                                                        getAirlineLogo(flight.airlines[0]) ? (
                                                        <img
                                                            src={getAirlineLogo(flight.airlines[0])}
                                                            className="max-w-full max-h-full object-contain"
                                                            alt="airline"
                                                        />
                                                    ) : (
                                                        <IoAirplane className="text-[rgb(29,181,236)] w-6 h-6" />
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-gray-800 truncate">
                                                        {flight.airlines && flight.airlines[0]
                                                            ? getAirlineName(flight.airlines[0])
                                                            : "Airline"}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {flight.route && flight.route[0]
                                                            ? `Flight ${flight.route[0].airline}${flight.route[0].flight_no || ""
                                                            }`
                                                            : "Flight Info"}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Middle Section - Route & Time */}
                                            <div className="flex justify-between md:justify-center items-center gap-6 w-full md:w-auto">
                                                {/* Departure */}
                                                <div className="text-center">
                                                    {(() => {
                                                        const { outbound } = splitRoute(flight.route);
                                                        const first = outbound && outbound[0];
                                                        const placeInfo = resolvePlace(from, "from");
                                                        return (
                                                            <>
                                                                <div className="text-[13px] font-medium text-gray-800">
                                                                    {placeInfo.place}
                                                                </div>
                                                                <div className="text-sm text-gray-500">
                                                                    {first
                                                                        ? new Date(flight.local_departure).toLocaleTimeString('en-US', {
                                                                            hour: '2-digit',
                                                                            minute: '2-digit',
                                                                            hour12: false
                                                                        })
                                                                        : "10:30"}
                                                                </div>
                                                                <div className="text-xs text-gray-400">
                                                                    {first
                                                                        ? new Date(flight.local_departure).toLocaleDateString('en-GB', {
                                                                            day: '2-digit',
                                                                            month: '2-digit',
                                                                            year: 'numeric'
                                                                        })
                                                                        : formattedDepartureDate}
                                                                </div>
                                                                <div className="text-[8px] text-gray-400">
                                                                    {renderAirportLine(placeInfo.airport)}
                                                                </div>
                                                            </>
                                                        );
                                                    })()}
                                                </div>

                                                {/* Duration */}
                                                <div className="flex flex-col items-center">
                                                    <div className="text-sm text-gray-500">
                                                        {(() => {
                                                            const { outbound } = splitRoute(flight.route);
                                                            if (outbound && outbound.length > 0) {
                                                                const firstSeg = outbound[0];
                                                                const lastSeg = outbound[outbound.length - 1];
                                                                return formatTime(flight?.local_departure, flight?.local_arrival);
                                                            }
                                                            return flight.duration ? getTotalTime(flight.duration.total) : "2h 45m";
                                                        })()}
                                                    </div>
                                                    <div className="flex items-center space-x-2 my-1">
                                                        <div className="w-2 h-2 bg-[rgb(29,181,236)] rounded-full"></div>
                                                        <div className="w-16 h-0.5 bg-gray-300"></div>
                                                        <div className="w-2 h-2 bg-[rgb(29,181,236)] rounded-full"></div>
                                                    </div>
                                                    <div className="text-xs text-gray-400">
                                                        {flight.route && flight.route.length > 1
                                                            ? `${flight.route.length - 1} Stop${flight.route.length > 2 ? "s" : ""
                                                            }`
                                                            : "Non-Stop"}
                                                    </div>
                                                </div>

                                                {/* Arrival */}
                                                <div className="text-center">
                                                    {(() => {
                                                        const { outbound } = splitRoute(flight.route);
                                                        const lastRoute = outbound && outbound[outbound.length - 1];
                                                        const placeInfo = resolvePlace(to, "to");
                                                        return (
                                                            <>
                                                                <div className="text-[13px] font-medium text-gray-800">
                                                                    {placeInfo.place}
                                                                </div>
                                                                <div className="text-sm text-gray-500">
                                                                    {lastRoute
                                                                        ? new Date(flight.local_arrival).toLocaleTimeString('en-US', {
                                                                            hour: '2-digit',
                                                                            minute: '2-digit',
                                                                            hour12: false,
                                                                        })
                                                                        : "13:15"}
                                                                </div>
                                                                <div className="text-xs text-gray-400">
                                                                    {lastRoute
                                                                        ? new Date(flight.local_arrival).toLocaleDateString('en-GB', {
                                                                            day: '2-digit',
                                                                            month: '2-digit',
                                                                            year: 'numeric',
                                                                        })
                                                                        : formattedDepartureDate}
                                                                </div>
                                                                <div className="text-[8px] text-gray-400">
                                                                    {renderAirportLine(placeInfo.airport)}
                                                                </div>
                                                            </>
                                                        );
                                                    })()}
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    {/* Return Flight Card - Only show for Round Trip */}
                                    {tripType === "Round Trip" && (
                                        <div className={`flex-1 w-full max-w-full min-w-0 h-full text-sm md:text-base bg-antiquewhite rounded-lg  p-4 sm:p-6 overflow-hidden break-words box-border transition-all duration-300 ${selectedFlight?.id === flight?.id ? "border-[rgb(29,181,236)] bg-[rgb(29,181,236)]/10" : "border-gray-200"
                                            }`}>
                                            <div className="text-sm uppercase font-medium text-gray-500 mb-3">Return Flight</div>
                                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 h-full">
                                                {/* Left Section - Airline Info */}
                                                <div className="flex items-center space-x-4 md:w-1/3">
                                                    <div className="h-12 w-12 flex items-center justify-center bg-gray-50 rounded-lg p-1">
                                                        {flight.airlines &&
                                                            flight.airlines[0] &&
                                                            getAirlineLogo(flight.airlines[0]) ? (
                                                            <img
                                                                src={getAirlineLogo(flight.airlines[0])}
                                                                className="max-w-full max-h-full object-contain"
                                                                alt="airline"
                                                            />
                                                        ) : (
                                                            <IoAirplane className="text-[rgb(29,181,236)] w-6 h-6" />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-gray-800 truncate">
                                                            {flight.airlines && flight.airlines[0]
                                                                ? getAirlineName(flight.airlines[0])
                                                                : "Airline"}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {flight.route && flight.route[0]
                                                                ? `Flight ${flight.route[0].airline}${flight.route[0].flight_no || ""
                                                                }`
                                                                : "Flight Info"}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Middle Section - Route & Time */}
                                                <div className="flex justify-between md:justify-center items-center gap-6 w-full md:w-auto">
                                                    {/* Departure */}
                                                    <div className="text-center">
                                                        {(() => {
                                                            const placeInfo = resolvePlace(to, "to");
                                                            return (
                                                                <>
                                                                    <div className="text-[13px] font-medium text-gray-800">
                                                                        {placeInfo.place}
                                                                    </div>
                                                                    <div className="text-sm text-gray-500">
                                                                        {(() => {
                                                                            const { ret } = splitRoute(flight.route);
                                                                            const dep = ret && ret[0];
                                                                            return dep
                                                                                ? `${new Date(dep.local_departure).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}`
                                                                                : "10:30";
                                                                        })()}
                                                                    </div>
                                                                    <div className="text-xs text-gray-400">
                                                                        {returnDate || formattedDepartureDate}
                                                                    </div>
                                                                    <div className="text-[8px] text-gray-400">
                                                                        {renderAirportLine(placeInfo.airport)}
                                                                    </div>
                                                                </>
                                                            );
                                                        })()}
                                                    </div>

                                                    {/* Duration */}
                                                    <div className="flex flex-col items-center">
                                                        <div className="text-sm text-gray-500">
                                                            {(() => {
                                                                const { ret } = splitRoute(flight.route);
                                                                if (ret && ret.length > 0) {
                                                                    const first = ret[0];
                                                                    const last = ret[ret.length - 1];
                                                                    return formatTime(flight?.local_departure, flight?.local_arrival);
                                                                }
                                                                return flight.duration ? getTotalTime(flight.duration.total) : "2h 45m";
                                                            })()}
                                                        </div>
                                                        <div className="flex items-center space-x-2 my-1">
                                                            <div className="w-2 h-2 bg-[rgb(29,181,236)] rounded-full"></div>
                                                            <div className="w-16 h-0.5 bg-gray-300"></div>
                                                            <div className="w-2 h-2 bg-[rgb(29,181,236)] rounded-full"></div>
                                                        </div>
                                                        <div className="text-xs text-gray-400">
                                                            {flight.route && flight.route.length > 1
                                                                ? `${flight.route.length - 1} Stop${flight.route.length > 2 ? "s" : ""
                                                                }`
                                                                : "Non-Stop"}
                                                        </div>
                                                    </div>

                                                    {/* Arrival */}
                                                    <div className="text-center">
                                                        {(() => {
                                                            const placeInfo = resolvePlace(from, "from"); // Return flight arrives at the origin city
                                                            return (
                                                                <>
                                                                    <div className="text-[13px] font-medium text-gray-800">
                                                                        {placeInfo.place}
                                                                    </div>
                                                                    <div className="text-sm text-gray-500">
                                                                        {(() => {
                                                                            const { ret } = splitRoute(flight.route);
                                                                            const arr = ret && ret[ret.length - 1];
                                                                            return arr
                                                                                ? `${new Date(arr.local_arrival).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}`
                                                                                : "13:15";
                                                                        })()}
                                                                    </div>
                                                                    <div className="text-xs text-gray-400">
                                                                        {returnDate || formattedDepartureDate}
                                                                    </div>
                                                                    <div className="text-[8px] text-gray-400">
                                                                        {renderAirportLine(placeInfo.airport)}
                                                                    </div>
                                                                </>
                                                            );
                                                        })()}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Select Button - Inside the row as a fixed column */}
                                    <div className="flex-shrink-0 flex items-center justify-center md:justify-center md:pl-4 w-full md:w-[140px]">
                                        <button
                                            onClick={() => handleFlightSelect(flight)}
                                            className={`self-center px-3 py-2 rounded-md font-medium transition-all duration-300 bg-[rgb(29,181,236)] text-white shadow-sm hover:brightness-95 w-[110px] sm:w-[120px] text-center text-sm md:text-base`}
                                        >
                                            {selectedFlight?.id === flight?.id ? "Selected" : `Select`}
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-12">
                                <IoAirplane className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-600">
                                    No flights found for the selected route.
                                </p>
                            </div>
                        )}
                    </div>


                    {/* Booking Details Section - Shows after flight selection */}
                    {showBookingDetails && selectedFlight && (
                        <div id="booking-section" className="mt-12 border-t pt-8">
                            <h3 className="text-left font-bold text-2xl md:text-3xl text-[rgb(29,181,236)] mb-8">
                                Booking Details
                            </h3>

                            <div className="flex flex-col lg:flex-row gap-8">
                                {/* Left side - Forms (70%) */}
                                <div className="w-full lg:w-[70%]">
                                    <BookingDetailsRight
                                        totalPassenger={totalPassenger}
                                        setTotalPassenger={setTotalPassenger}
                                        onContactDetailsChange={handleContactDetailsChange}
                                        passengers={passengers}
                                        setPassengers={setPassengers}
                                        addPassenger={addPassenger}
                                    />
                                </div>
                                {/* Right side - Order Summary (30%) */}
                                <div className="w-full lg:w-[30%] mt-4 lg:mt-0">
                                    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[rgb(29,181,236)]/30">
                                        {/* Order summary header */}
                                        <div className="bg-[rgb(29,181,236)] py-4 px-5 text-white font-bold text-center text-lg rounded-t-xl">
                                            Order Summary
                                        </div>

                                        {/* Flight details section */}
                                        <div className="p-5 space-y-5">
                                            <h4 className="bg-gradient-to-r from-[rgb(29,181,236)] to-[rgb(29,181,236)]/90 text-white font-semibold py-3 px-4 rounded-lg text-center shadow-sm">
                                                Selected Flight
                                            </h4>

                                            {/* Journey overview */}
                                            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                                                <div className="grid grid-cols-5 items-center">
                                                    {(() => {
                                                        const fromInfo = resolvePlace(from || "JFK", 'from');
                                                        const toInfo = resolvePlace(to || "LHR", 'to');
                                                        return (
                                                            <>
                                                                <div className="col-span-2 text-center">
                                                                    <div className="text-[13px] font-normal text-gray-800">{fromInfo.place}</div>
                                                                    <div className="text-[8px] text-gray-500">{renderAirportLine(fromInfo.airport)}</div>
                                                                </div>
                                                                <div className="col-span-1 text-[rgb(29,181,236)] flex justify-center">
                                                                    <HiMiniArrowRight className="w-6 h-6" />
                                                                </div>
                                                                <div className="col-span-2 text-center">
                                                                    <div className="text-[13px] font-normal text-gray-800">{toInfo.place}</div>
                                                                    <div className="text-[8px] text-gray-500">{renderAirportLine(toInfo.airport)}</div>
                                                                </div>
                                                            </>
                                                        )
                                                    })()}
                                                </div>
                                                <div className="text-center mt-2 text-sm text-gray-600">
                                                    {departureDate
                                                        ? new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(departureDate))
                                                        : "27 Apr 2025"}
                                                </div>
                                            </div>

                                            {/* Flight cards */}
                                            {JourneyDetails && JourneyDetails.length > 0 ? JourneyDetails.map((item, index) => (
                                                <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transform transition-all hover:shadow-md">
                                                    {/* Airline info */}
                                                    <div className="p-4 border-b border-gray-100">
                                                        <div className="flex items-center space-x-3 mb-2">
                                                            <div className="h-12 w-12 flex items-center justify-center bg-gray-50 rounded-full p-1">
                                                                {getAirlineLogo(item?.airline) ? (
                                                                    <img src={getAirlineLogo(item?.airline)} className="max-w-full max-h-full object-contain" alt="airline" />
                                                                ) : (
                                                                    <IoAirplane className="text-[rgb(29,181,236)] w-6 h-6" />
                                                                )}
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <span className="font-medium text-gray-800">{getAirlineName(item?.airline)}</span>
                                                                <span className="text-sm text-gray-600">Flight {item?.airline}{item?.flight_no || ""}</span>
                                                            </div>
                                                        </div>

                                                        {/* Origin to Destination with centered arrow */}
                                                        <div className="grid grid-cols-5 items-center mt-2 bg-gray-50 rounded-lg p-2">
                                                            {(() => {
                                                                const fromInfo = formatPlaceAirport(item?.cityFrom);
                                                                const toInfo = formatPlaceAirport(item?.cityTo);
                                                                return (
                                                                    <>
                                                                        <div className="col-span-2 text-center text-sm">
                                                                            <div className="font-medium text-gray-800">{fromInfo.place}</div>
                                                                            <div className="text-[8px] text-gray-500">{renderAirportLine(fromInfo.airport)}</div>
                                                                        </div>
                                                                        <div className="col-span-1 text-[rgb(29,181,236)] flex justify-center">
                                                                            <HiMiniArrowRight className="w-5 h-5" />
                                                                        </div>
                                                                        <div className="col-span-2 text-center text-sm">
                                                                            <div className="font-medium text-gray-800">{toInfo.place}</div>
                                                                            <div className="text-[8px] text-gray-500">{renderAirportLine(toInfo.airport)}</div>
                                                                        </div>
                                                                    </>
                                                                )
                                                            })()}
                                                        </div>
                                                    </div>

                                                    {/* Flight time details */}
                                                    <div className="p-4 bg-gray-50/50">
                                                        <div className="flex justify-between items-center">
                                                            {/* Departure */}
                                                            <div className="text-center w-1/3">
                                                                <div className="text-sm text-gray-500">{item?.local_departure ? new Date(item.local_departure).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }) : ''}</div>
                                                                <div className="text-lg font-bold text-gray-800">
                                                                    {new Date(item?.local_departure).toLocaleTimeString('en-US', {
                                                                        hour: '2-digit',
                                                                        minute: '2-digit',
                                                                        hour12: false
                                                                    })}
                                                                </div>
                                                                <div className="text-base font-medium text-[rgb(29,181,236)]">{item?.cityCodeFrom}</div>
                                                            </div>

                                                            {/* Flight duration */}
                                                            <div className="w-1/3 px-2">
                                                                <div className="relative flex flex-col items-center">
                                                                    <div className="text-xs text-gray-500 mb-1">{formatTime(item?.local_departure, item?.local_arrival)}</div>
                                                                    <div className="w-full h-0.5 bg-gray-200 rounded-full relative">
                                                                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[rgb(29,181,236)] rounded-full"></div>
                                                                        <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-1.5 h-1.5 bg-[rgb(29,181,236)] rounded-full"></div>
                                                                        <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-1.5 h-1.5 bg-[rgb(29,181,236)] rounded-full"></div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* Arrival */}
                                                            <div className="text-center w-1/3">
                                                                <div className="text-sm text-gray-500">{item?.local_arrival ? new Date(item.local_arrival).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }) : ''}</div>
                                                                <div className="text-lg font-bold text-gray-800">
                                                                    {new Date(item?.local_arrival).toLocaleTimeString('en-US', {
                                                                        hour: '2-digit',
                                                                        minute: '2-digit',
                                                                        hour12: false
                                                                    })}
                                                                </div>
                                                                <div className="text-base font-medium text-[rgb(29,181,236)]">{item?.cityCodeTo}</div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Footer row for static card */}
                                                    {/* <div className="mt-4 border-t border-gray-100 pt-3 px-3 bg-gray-50 rounded-b-lg">
                                                        <div className="flex items-center justify-between">
                                                            <div>
                                                                <button className="text-sm text-[rgb(29,181,236)] hover:underline">
                                                                    Flight Details
                                                                </button>
                                                            </div>
                                                            <div>
                                                                <button className="px-4 py-2 rounded-md font-medium transition-all duration-300 bg-[rgb(29,181,236)] text-white shadow-sm hover:brightness-95">
                                                                    ₹10,220
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div> */}
                                                </div>
                                            )) : (
                                                // Static flight card when no JourneyDetails available
                                                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transform transition-all hover:shadow-md">
                                                    {/* Airline info */}
                                                    <div className="p-4 border-b border-gray-100">
                                                        <div className="flex items-center space-x-3 mb-2">
                                                            <div className="h-12 w-12 flex items-center justify-center bg-gray-50 rounded-full p-1">
                                                                <IoAirplane className="text-[rgb(29,181,236)] w-6 h-6" />
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <span className="font-medium text-gray-800">British Airways</span>
                                                                <span className="text-sm text-gray-600">Flight BA117</span>
                                                            </div>
                                                        </div>

                                                        {/* Origin to Destination with centered arrow */}
                                                        <div className="grid grid-cols-5 items-center mt-2 bg-gray-50 rounded-lg p-2">
                                                            {(() => {
                                                                const fromInfo = formatPlaceAirport('New York (JFK)');
                                                                const toInfo = formatPlaceAirport('London (LHR)');
                                                                return (
                                                                    <>
                                                                        <div className="col-span-2 text-center text-sm">
                                                                            <div className="font-medium text-gray-800">{fromInfo.place}</div>
                                                                            <div className="text-[8px] text-gray-500">{renderAirportLine(fromInfo.airport)}</div>
                                                                        </div>
                                                                        <div className="col-span-1 text-[rgb(29,181,236)] flex justify-center">
                                                                            <HiMiniArrowRight className="w-5 h-5" />
                                                                        </div>
                                                                        <div className="col-span-2 text-center text-sm">
                                                                            <div className="font-medium text-gray-800">{toInfo.place}</div>
                                                                            <div className="text-[8px] text-gray-500">{renderAirportLine(toInfo.airport)}</div>
                                                                        </div>
                                                                    </>
                                                                )
                                                            })()}
                                                        </div>
                                                    </div>

                                                    {/* Flight time details */}
                                                    <div className="p-4 bg-gray-50/50">
                                                        <div className="flex justify-between items-center">
                                                            {/* Departure */}
                                                            <div className="text-center w-1/3">
                                                                <div className="text-sm text-gray-500">27-04-2025</div>
                                                                <div className="text-lg font-bold text-gray-800">10:30</div>
                                                                <div className="text-base font-medium text-[rgb(29,181,236)]">JFK</div>
                                                            </div>

                                                            {/* Flight duration */}
                                                            <div className="w-1/3 px-2">
                                                                <div className="relative flex flex-col items-center">
                                                                    <div className="text-xs text-gray-500 mb-1">7h 30m</div>
                                                                    <div className="w-full h-0.5 bg-gray-200 rounded-full relative">
                                                                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[rgb(29,181,236)] rounded-full"></div>
                                                                        <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-1.5 h-1.5 bg-[rgb(29,181,236)] rounded-full"></div>
                                                                        <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-1.5 h-1.5 bg-[rgb(29,181,236)] rounded-full"></div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* Arrival */}
                                                            <div className="text-center w-1/3">
                                                                <div className="text-sm text-gray-500">27-04-2025</div>
                                                                <div className="text-lg font-bold text-gray-800">18:00</div>
                                                                <div className="text-base font-medium text-[rgb(29,181,236)]">LHR</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Passenger Summary */}
                                            {passengers.length > 0 && (
                                                <div className="mt-4">
                                                    <h4 className="bg-gradient-to-r from-[rgb(29,181,236)] to-[rgb(29,181,236)]/90 text-white font-semibold py-3 px-4 rounded-lg text-center shadow-sm mb-3">
                                                        Passengers
                                                    </h4>
                                                    <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1">
                                                        {passengers.map((passenger, idx) => (
                                                            <div key={idx} className="flex items-center gap-2 p-2 rounded-lg border border-gray-100 bg-white hover:bg-gray-50 transition-colors">
                                                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[rgb(29,181,236)]/10 flex items-center justify-center text-xs text-[rgb(29,181,236)] font-medium">
                                                                    {idx + 1}
                                                                </div>
                                                                <div className="flex-grow">
                                                                    <div className="text-sm font-medium text-gray-800">{passenger.title} {passenger.firstName} {passenger.lastName}</div>
                                                                    <div className="flex items-center gap-1 text-xs text-gray-500">
                                                                        {passenger.nationality && (
                                                                            <div className="w-4 h-3 border border-gray-200 rounded-sm overflow-hidden shadow-sm flex-shrink-0">
                                                                                <img
                                                                                    src={`https://flagcdn.com/w20/${getCountryISOCode(passenger.nationality)}.png`}
                                                                                    alt={passenger.nationality}
                                                                                    className="h-full w-full object-cover"
                                                                                    onError={(e) => {
                                                                                        // Try a different CDN if the first one fails
                                                                                        const isoCode = getCountryISOCode(passenger.nationality);
                                                                                        e.target.src = `https://raw.githubusercontent.com/hampusborgos/country-flags/main/png100px/${isoCode}.png`;
                                                                                        e.target.onerror = (e2) => {
                                                                                            // If that also fails, use the India flag as final fallback
                                                                                            e2.target.src = 'https://flagcdn.com/w20/in.png';
                                                                                            e2.target.onerror = null;
                                                                                        };
                                                                                    }}
                                                                                />
                                                                            </div>
                                                                        )}
                                                                        <span>{passenger.nationality || "Indian"}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Price breakdown */}
                                            <div className="mt-6 space-y-3 px-2">
                                                <div className="flex justify-between text-gray-800">
                                                    <span>{tripType === "Round Trip" ? 'Routes × 2' : 'Routes'}</span>
                                                    <span>{tripType === "Round Trip" ? '500' : '500'}</span>
                                                </div>
                                                <hr className="border-b border-dashed border-gray-300" />

                                                <div className="flex justify-between text-gray-800">
                                                    <span>Amount × {passengers.length}</span>
                                                    <span>{amount * passengers.length}</span>
                                                </div>
                                                <hr className="border-b border-dashed border-gray-300" />

                                                <div className="flex justify-between font-bold text-lg">
                                                    <span className="text-gray-800">Total</span>
                                                    <span className="text-[rgb(29,181,236)]">{total}</span>
                                                </div>
                                            </div>

                                            {/* Payment button */}
                                            <div className="rounded-lg border border-gray-100 flex flex-col">
                                                <div className="flex flex-col gap-y-2 text-lg font-medium text-gray-800 mt-4">
                                                    <div className="flex items-center gap-2 ">
                                                        <input
                                                            type="radio"
                                                            name="paymentMethod"
                                                            id="Razorpay"
                                                            className="appearance-none w-5 h-5 border-2 border-[rgb(29,181,236)] rounded-full checked:bg-[rgb(29,181,236)] checked:border-[rgb(29,181,236)] focus:outline-none"
                                                            checked={selectedPaymentMethod === "Razorpay"}
                                                            onChange={handlePaymentMethodChange}
                                                        />
                                                        <label htmlFor="Razorpay">Razorpay</label>
                                                    </div>

                                                    <div className="w-full  text-center bg-[rgb(29,181,236)] hover:bg-[rgb(29,181,236)] text-white font-bold text-lg py-2 px-3 rounded-lg mt-4  transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[rgb(29,181,236)] focus:ring-opacity-50 cursor-pointer" onClick={handlePaymentClick}>
                                                        Pay Now
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <ToastContainer />
            </section>
            <Footer />
        </>
    )
}

export default BookingDetails;
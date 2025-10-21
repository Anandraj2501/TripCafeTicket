import { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { useLocation } from "react-router-dom";
import { FaUser, FaEnvelope, FaPhone, FaGlobeAmericas, FaPlus } from "react-icons/fa";
import { IoChevronDown } from "react-icons/io5";
import axios from "axios";
import countries from "../../data/countries"; // Import countries data
import phoneCodes from "../../data/phoneCodes"; // Import our new phone codes data

// Country dial code to ISO code mapping for flag display
const countryCodeToISO = {
  "+91": "in", // India
  "+1": "us", // United States
  "+44": "gb", // United Kingdom
  "+61": "au", // Australia
  "+86": "cn", // China
  "+49": "de", // Germany
  "+33": "fr", // France
  "+7": "ru", // Russia
  "+81": "jp", // Japan
  "+971": "ae", // UAE
  "+966": "sa", // Saudi Arabia
  "+65": "sg", // Singapore
  "+60": "my", // Malaysia
  "+66": "th", // Thailand
  "+92": "pk", // Pakistan
  "+880": "bd", // Bangladesh
  "+94": "lk", // Sri Lanka
  "+977": "np", // Nepal
  "+975": "bt", // Bhutan
  "+20": "eg", // Egypt
  "+234": "ng", // Nigeria
  "+27": "za", // South Africa
  "+55": "br", // Brazil
  "+52": "mx", // Mexico
  "+39": "it", // Italy
  "+34": "es", // Spain
  "+82": "kr", // South Korea
  "+84": "vn", // Vietnam
  "+62": "id", // Indonesia
  "+63": "ph", // Philippines
  "+64": "nz", // New Zealand
  "+90": "tr", // Turkey
  "+972": "il", // Israel
  "+31": "nl", // Netherlands
  "+32": "be", // Belgium
  "+41": "ch", // Switzerland
  "+43": "at", // Austria
  "+46": "se", // Sweden
  "+47": "no", // Norway
  "+45": "dk", // Denmark
  "+358": "fi", // Finland
  "+30": "gr", // Greece
  "+351": "pt", // Portugal
  "+353": "ie", // Ireland
  "+48": "pl", // Poland
  "+420": "cz", // Czech Republic
  "+36": "hu", // Hungary
  "+40": "ro", // Romania
  "+359": "bg", // Bulgaria
  "+380": "ua", // Ukraine
  "+375": "by", // Belarus
  "+7": "kz", // Kazakhstan
};

// Fallback data in case API fails
const fallbackCountries = [
  { code: "+91", name: "India", isoCode: "in" },
  { code: "+1", name: "United States", isoCode: "us" },
  { code: "+44", name: "United Kingdom", isoCode: "gb" },
  { code: "+61", name: "Australia", isoCode: "au" },
  { code: "+86", name: "China", isoCode: "cn" },
  { code: "+49", name: "Germany", isoCode: "de" },
  { code: "+33", name: "France", isoCode: "fr" },
  { code: "+7", name: "Russia", isoCode: "ru" },
  { code: "+81", name: "Japan", isoCode: "jp" },
];

const BookingDetailsRight = ({ totalPassenger, setTotalPassenger, onContactDetailsChange, passengers, setPassengers, addPassenger }) => {
    const location = useLocation();
    const { from, to, departureDate, returnDate, purpose } = location.state || {};
    const [phoneCountries, setPhoneCountries] = useState(phoneCodes); // Use our imported phoneCodes data by default
    const [isLoading, setIsLoading] = useState(false); // Set to false since we have data already
    
    useEffect(() => {
        // Initialize new passengers with Indian nationality by default
        const updatedPassengers = passengers.map(passenger => ({
            ...passenger,
            nationality: passenger.nationality || "India"
        }));
        setPassengers(updatedPassengers);
    }, []);
    
    const handleClose = (indexs) => {
        const newPassengers = passengers?.filter((items, index) => index !== indexs);
        setPassengers(newPassengers);
        setTotalPassenger(totalPassenger - 1);
    }

    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const newPassengers = passengers.map((passenger, i) => {
            if (i === index) {
                return { ...passenger, [name]: value };
            }
            return passenger;
        });
        setPassengers(newPassengers);
    };

    const [contactDetails, setContactDetails] = useState({
        name: '',
        phone: '',
        countryCode: '+91',
        email: '',
        purpose: 'Select Purpose'
    });

    const handleInputsChange = (e) => {
        const { name, value } = e.target;
        setContactDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
        onContactDetailsChange({ [name]: value });
    };

    const handlePhoneChange = (e) => {
        const value = e.target.value;
        // Remove non-numeric characters
        const numericValue = value.replace(/\D/g, '');
        
        setContactDetails(prevDetails => ({
            ...prevDetails,
            phone: numericValue
        }));
        
        onContactDetailsChange({ 
            phone: `${contactDetails.countryCode}${numericValue}` 
        });
    };

    const handleCountryCodeChange = (code) => {
        setContactDetails(prevDetails => ({
            ...prevDetails,
            countryCode: code
        }));
        
        onContactDetailsChange({ 
            phone: `${code}${contactDetails.phone}` 
        });
    };

    // Get ISO code for a country dial code using our phone codes data
    const getISOCode = (dialCode) => {
        // Find the country in our phoneCodes array
        const country = phoneCountries.find(c => c.code === dialCode);
        
        if (country && country.isoCode) {
            return country.isoCode.toLowerCase();
        }
        
        // Default to India if not found
        return "in";
    };

    // Get ISO code for a country name
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
            "Congolese": "cd", // Democratic Republic of Congo
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

    // Common input classes for consistent height
    const inputClasses = "h-[52px] border border-gray-300 py-3.5 px-4 focus:outline-none focus:ring-2 focus:ring-[#ec601d]/50 focus:border-[#ec601d] transition-all duration-300";
    const selectClasses = "h-[52px] border border-gray-300 py-3.5 px-4 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#ec601d]/50 focus:border-[#ec601d] transition-all duration-300";
    const labelClasses = "block text-sm font-medium text-gray-600 mb-2 flex items-center";

    return (
        <div className="w-full ">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-orange-100 transition-all duration-300 hover:shadow-xl">
                <div className="bg-gradient-to-r from-[#ec601d] to-[#ec601d]/80 py-5 px-6 text-white font-bold text-center text-lg rounded-t-xl relative overflow-hidden">
                    <div className="absolute -top-6 -left-6 w-12 h-12 rounded-full bg-white/10"></div>
                    <div className="absolute -bottom-6 -right-6 w-16 h-16 rounded-full bg-white/10"></div>
                    Contact & Passenger Details
                </div>
                <div className="p-8">
                    <div className="flex flex-col gap-8">
                        <h4 className="text-xl font-medium text-gray-800 flex items-center">
                            <span className="inline-flex w-8 h-8 bg-[#ec601d]/10 rounded-full mr-3 items-center justify-center">
                                <FaUser className="text-[#ec601d]" />
                            </span>
                            Contact Details
                        </h4>
                        
                        {/* Phone input with country flag and Purpose - placed side-by-side on desktop */}
                        <div className="flex flex-col lg:flex-row gap-6">
                            <div className="group w-full lg:w-1/2 transform transition-all duration-300">
                            <label className={labelClasses}>
                                <FaPhone className="mr-2 text-[#ec601d]" />
                                Phone Number
                            </label>
                            <div className="flex shadow-sm hover:shadow transition-shadow duration-300 rounded-md overflow-hidden">
                                <div className="relative">
                                    <select 
                                        className={`${selectClasses} min-w-[100px] border-r-0 rounded-l-md bg-white pl-8 pr-2`}
                                        value={contactDetails.countryCode}
                                        onChange={(e) => handleCountryCodeChange(e.target.value)}
                                        style={{ 
                                            backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")", 
                                            backgroundRepeat: "no-repeat", 
                                            backgroundPosition: "right 0.5rem center", 
                                            backgroundSize: "1.5em 1.5em", 
                                            paddingRight: "2.5rem" 
                                        }}
                                    >
                                        {phoneCountries.map((country) => (
                                            <option 
                                                key={country.code} 
                                                value={country.code}
                                            >
                                                {country.code}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                                        <div className="w-4 h-3 border border-gray-200 rounded-sm overflow-hidden flex-shrink-0">
                                            <img 
                                                src={`https://flagcdn.com/w20/${getISOCode(contactDetails.countryCode)}.png`} 
                                                alt="Country flag"
                                                className="h-full w-full object-cover"
                                                onError={(e) => {
                                                    const isoCode = getISOCode(contactDetails.countryCode);
                                                    e.target.src = `https://raw.githubusercontent.com/hampusborgos/country-flags/main/png100px/${isoCode}.png`;
                                                    e.target.onerror = (e2) => {
                                                        e2.target.src = 'https://flagcdn.com/w20/in.png';
                                                        e2.target.onerror = null;
                                                    };
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <input
                                    type="tel"
                                    placeholder="Phone Number"
                                    className={`${inputClasses} flex-1 rounded-r-md`}
                                    name="phone"
                                    value={contactDetails.phone}
                                    onChange={handlePhoneChange}
                                    maxLength={15}
                                />
                            </div>
                            </div>

                            {/* Purpose Selection (for flight search only) */}
                            <div className="group w-full lg:w-1/2 transform transition-all duration-300">
                            <label className={labelClasses}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 text-[#ec601d] h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                Purpose
                            </label>
                            <div className="relative">
                                <select
                                    className={`${selectClasses} w-full rounded-md bg-white shadow-sm hover:shadow`}
                                    name="purpose"
                                    value={contactDetails.purpose}
                                    onChange={handleInputsChange}
                                    style={{ 
                                        backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")", 
                                        backgroundRepeat: "no-repeat", 
                                        backgroundPosition: "right 1rem center", 
                                        backgroundSize: "1.5em 1.5em", 
                                        paddingRight: "3rem" 
                                    }}
                                >
                                    <option value="Select Purpose">Select Purpose</option>
                                    <option value="Visa Application">Visa Application</option>
                                    <option value="Office Work Place needs it">Office Work</option>
                                    <option value="Passport Renewal">Passport Renewal</option>
                                    <option value="Visa Renewal">Visa Renewal</option>
                                    <option value="Car Rental">Car Rental</option>
                                    <option value="Travel">Travel</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
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
                                    className={`${inputClasses} w-full rounded-md shadow-sm hover:shadow`}
                                    name="name"
                                    value={contactDetails.name}
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
                                    className={`${inputClasses} w-full rounded-md shadow-sm hover:shadow`}
                                    name="email"
                                    value={contactDetails.email}
                                    onChange={handleInputsChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Passenger cards */}
                    {passengers.map((passenger, index) => (
                        <div key={index} className="mt-10 pt-8 border-t border-gray-200 relative">
                            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-white px-4">
                                <div className="w-6 h-6 bg-[#ec601d]/10 rounded-full flex items-center justify-center text-xs text-[#ec601d] font-medium">{index + 1}</div>
                            </div>
                            <div className="flex justify-between items-center mb-5">
                                <h4 className="text-xl font-medium text-gray-800 flex items-center">
                                        <span className="inline-flex w-8 h-8 bg-[#ec601d]/10 rounded-full mr-3 items-center justify-center">
                                        <FaUser className="text-[#ec601d]" />
                                    </span>
                                    Passenger {index + 1}
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
                                            className={`${selectClasses} border-r-0 rounded-l-md bg-gray-50 hover:bg-gray-100 w-24`}
                                            value={passenger.title}
                                            onChange={(e) => handleInputChange(index, e)}
                                            name="title"
                                            style={{ 
                                                backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")", 
                                                backgroundRepeat: "no-repeat", 
                                                backgroundPosition: "right 0.5rem center", 
                                                backgroundSize: "1.5em 1.5em", 
                                                paddingRight: "2.5rem" 
                                            }}
                                        >
                                            <option value="Mr">Mr</option>
                                            <option value="Ms">Ms</option>
                                            <option value="Mrs">Mrs</option>
                                        </select>
                                        <input
                                            type="text"
                                            name="firstName"
                                            placeholder="First Name"
                                            className={`${inputClasses} flex-1 rounded-r-md`}
                                            value={passenger.firstName}
                                            onChange={(e) => handleInputChange(index, e)}
                                        />
                                    </div>
                                </div>
                                <div className="w-full sm:w-1/2">
                                    <input
                                        type="text"
                                        name="lastName"
                                        placeholder="Last Name"
                                        className={`${inputClasses} w-full rounded-md shadow-sm hover:shadow`}
                                        value={passenger.lastName}
                                        onChange={(e) => handleInputChange(index, e)}
                                    />
                                </div>
                            </div>
                            
                            <div className="mt-5 group transform transition-all duration-300">
                                <label className={labelClasses}>
                                    <FaGlobeAmericas className="mr-2 text-[#ec601d]" />
                                    Nationality
                                </label>
                                <div className="relative">
                                    <select
                                        className={`${selectClasses} w-full rounded-md bg-white shadow-sm hover:shadow pl-10`}
                                        value={passenger.nationality}
                                        onChange={(e) => handleInputChange(index, e)}
                                        name="nationality"
                                        style={{ 
                                            backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")", 
                                            backgroundRepeat: "no-repeat", 
                                            backgroundPosition: "right 1rem center", 
                                            backgroundSize: "1.5em 1.5em", 
                                            paddingRight: "3rem" 
                                        }}
                                    >
                                        {countries.map((country) => (
                                            <option 
                                                key={country.code} 
                                                value={country.name}
                                                data-country-code={country.code.toLowerCase()}
                                            >
                                                {country.name}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                        <div className="w-5 h-3.5 border border-gray-200 rounded-sm overflow-hidden shadow-sm flex-shrink-0">
                                            <img 
                                                src={`https://flagcdn.com/w20/${getCountryISOCode(passenger.nationality) || 'in'}.png`}
                                                alt={passenger.nationality || "Indian"}
                                                className="h-full w-full object-cover"
                                                onError={(e) => {
                                                    // Try a different CDN if the first one fails
                                                    const isoCode = getCountryISOCode(passenger.nationality) || 'in';
                                                    e.target.src = `https://raw.githubusercontent.com/hampusborgos/country-flags/main/png100px/${isoCode}.png`;
                                                    e.target.onerror = (e2) => {
                                                        // If that also fails, use the India flag as final fallback
                                                        e2.target.src = 'https://flagcdn.com/w20/in.png';
                                                        e2.target.onerror = null;
                                                    };
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
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
                        Add Passenger
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookingDetailsRight; 
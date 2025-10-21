
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, PDFViewer, Image, Link } from '@react-pdf/renderer';
import axios from 'axios';
import { useEffect, useState } from 'react';

const styles = StyleSheet.create({
    page: {
        backgroundColor: "#ffffff",
        paddingHorizontal: 60,
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
        backgroundColor: "#6c9ab5ff",
    },
    innerBox: {
        backgroundColor: "red",
        margin: 10, // Use number, not '20px'
        padding: 10,
    },
    verticalLine: {
        width: 1,
        backgroundColor: "black",
        height: 60,
        marginHorizontal: 5,
    },
    HeadingSmall: {
        fontSize: 7,
    },

    HeadingSmallBold: {
        fontSize: 7,
        fontWeight: "bold",
    },

    HeadingLarge: {
        fontSize: 14,
        fontWeight: "bold",
    },
});

const formatDate = (dateStr) => {
    const formatted = new Date(dateStr).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC',          // or 'Asia/Kolkata' if you prefer IST
    });
    return formatted;

}
const nights = (checkout, checkin) => {
    if (!checkout || !checkin) return '';
    const co = new Date(checkout);
    const ci = new Date(checkin);
    // Compare at UTC midnight to avoid DST/timezone skew
    const utcCo = Date.UTC(co.getFullYear(), co.getMonth(), co.getDate());
    const utcCi = Date.UTC(ci.getFullYear(), ci.getMonth(), ci.getDate());
    return Math.max(0, Math.round((utcCo - utcCi) / 86400000));
};
const Ticket = ({ ticketData }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View
                style={{
                    flexDirection: "row",
                    width: "100%",
                    height: "10%",
                    textAlign: "center",
                    justifyContent: "center",
                    padding: 10,
                    marginHorizontal: 10,
                }}
            >
                <View
                    style={{
                        flex: 1,
                        alignItems: "flex-start",
                        justifyContent: "center",
                    }}
                >
                    <Image style={{ width: 90 }} src="/images/companyLogo.png"></Image>
                </View>
                <View
                    style={{
                        flex: 1,
                        textAlign: "center",
                        justifyContent: "center",
                        alignItems: "flex-start",
                    }}
                >
                    <Text>Booking Voucher</Text>
                </View>
                <View
                    style={{
                        flex: 1,
                        textAlign: "left",
                        fontSize: 10,
                        justifyContent: "flex-end",
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            paddingHorizontal: 10,
                            textAlign: "left",
                        }}
                    >
                        <Text>Booking Id:</Text> <Text> {ticketData?.referenceId}</Text>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            paddingHorizontal: 10,
                            textAlign: "left",
                        }}
                    >
                        <Text>Booked on {formatDate(ticketData?.createdAt)}</Text>
                    </View>
                </View>
            </View>

            <View
                style={{
                    borderWidth: 1,
                    borderColor: "gray",
                    marginVertical: 5,
                    paddingHorizontal: 10,
                    paddingTop: 10,

                }}
            >
                <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 3, flexDirection: "column", gap: 5 }}>
                        {/* <Image style={{ width: 60 }} src="/images/mmtLuxe.png"></Image> */}
                        <Text>{ticketData?.hotelInfo?.name}</Text>
                        <View style={{ flexDirection: "row", marginVertical: 5 }}>
                            <Image style={{ width: 14 }} src="/images/start.png"></Image>
                        </View>
                        <View style={{ flexDirection: "row", gap: 5 }}>
                            <Text style={{ fontSize: 10, color: "black" }}>
                               {ticketData?.city}
                            </Text>
                            <View style={{ flexDirection: "row", gap: 2 }}>
                                <Image style={{ width: 10 }} src="/images/location.png"></Image>
                                <Link style={{ fontSize: 10 }} src={`https://www.google.com/maps/dir/?api=1&destination=${ticketData?.hotelInfo?.gps_coordinates?.latitude},${ticketData?.hotelInfo?.gps_coordinates?.longitude}&travelmode=driving`}>Get Directions</Link>
                            </View>
                        </View>
                        {/* <View style={{ flexDirection: "row", gap: 5 }}>
                            <Image style={{ width: 10 }} src="/images/telephone.png"></Image>
                            <Link style={{ fontSize: 10 }}>+97126944444</Link>
                        </View>
                        <View style={{ flexDirection: "row", gap: 5 }}>
                            <Image style={{ width: 10 }} src="/images/email.png"></Image>
                            <Link style={{ fontSize: 10 }}>
                                info.abudhabi@stregis.com
                            </Link>
                        </View>
                        <View style={{ flexDirection: "row", gap: 5 }}>
                            <Image style={{ width: 10 }} src="/images/email.png"></Image>
                            <Link style={{ fontSize: 10 }}>
                                info.abudhabi@stregis.com
                            </Link>
                        </View> */}
                    </View>
                    <View style={{ flex: 1 }}>
                        <Image style={{ width: 100 }} src="/images/confirmedImg.png"></Image>
                    </View>
                </View>

                {/* inside box */}
                <View
                    style={{
                        borderWidth: 1,
                        borderColor: "gray",
                        marginTop: 35,
                        marginHorizontal: -11,
                        padding: 10,
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            marginVertical: 10,
                            gap: 10,
                        }}
                    >
                        {/* Stay Duration */}
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                flex: 1,
                            }}
                        >
                            <Image
                                style={{ width: 12, height: 12, marginRight: 5 }}
                                src="/images/calendar.png"
                            />
                            <Text style={{ fontSize: 10 }}>{nights(ticketData?.checkoutDate, ticketData?.checkinDate)}-Nights Stay</Text>
                        </View>

                        {/* Check-in */}
                        <View style={{ flex: 1, gap: 4 }}>
                            <Text style={{ fontSize: 9, color: "gray" }}>Check-in</Text>
                            <Text style={{ fontSize: 11 }}>{formatDate(ticketData?.checkinDate)}</Text>
                            <Text style={{ fontSize: 9, color: "gray" }}>
                                After 03:00 PM
                            </Text>
                        </View>

                        {/* Check-out */}
                        <View style={{ flex: 1, gap: 4 }}>
                            <Text style={{ fontSize: 9, color: "gray" }}>
                                Check-out
                            </Text>
                            <Text style={{ fontSize: 11 }}>{formatDate(ticketData?.checkoutDate)}</Text>
                            <Text style={{ fontSize: 9, color: "gray" }}>
                                Before 12:00 PM
                            </Text>
                        </View>
                    </View>

                    {/* horizontal line */}
                    <View
                        style={{
                            height: 0.5,
                            backgroundColor: "gray",
                            marginVertical: 10,
                            width: "100%",
                        }}
                    />

                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginVertical: 10,
                        }}
                    >
                        {/* Left Guest */}
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "flex-start",
                                gap: 5,
                                flex: 1,
                            }}
                        >
                            <Image
                                style={{ width: 12, height: 12 }}
                                src="/images/guest.png"
                            />
                            <View>
                                <Text style={{ fontSize: 10 }}>{ticketData?.travellers} Guest</Text>
                                <Text style={{ fontSize: 9, color: "gray" }}>
                                    {/* (1 Adult) */}
                                </Text>
                            </View>
                        </View>

                        {/* Right: Guest  */}
                        {
                            ticketData?.passengers.map((passenger, index) => (
                                <View style={{ flex: 2 }}>
                                    <Text style={{ fontSize: 10, color: "gray" }}>
                                        <Text style={{ color: "black" }}>
                                            {passenger?.title}. {passenger?.firstName} {passenger?.lastName}
                                        </Text>{" "}
                                        {/* (Primary Guest) */}
                                    </Text>
                                    {/* <Text style={{ fontSize: 9, marginTop: 2, color: "gray" }}>
                                LAKSHMANAN GANDHINATHAN
                            </Text> */}
                                </View>
                            ))
                        }

                    </View>

                    {/* horizontal line */}
                    <View
                        style={{
                            height: 0.5,
                            backgroundColor: "gray",
                            marginVertical: 10,
                            width: "100%",
                        }}
                    />
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            gap: 10,
                            marginVertical: 10,
                        }}
                    >
                        {/* Left: Room icon and count */}
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "flex-start",
                                gap: 5,
                                flex: 1,
                            }}
                        >
                            <Image
                                style={{ width: 12, height: 12 }}
                                src="/images/door.png"
                            />
                            <Text style={{ fontSize: 10 }}>1 Room</Text>
                        </View>

                        {/* Right: Room details */}
                        <View style={{ flex: 2, flexDirection: "column", gap: 2 }}>
                            <Text style={{ fontSize: 10 }}>
                                Superior, Guest Room, 1 King, City View
                            </Text>

                            <View
                                style={{
                                    flexDirection: "row",
                                    gap: 5,
                                    alignItems: "center",
                                }}
                            >
                                <Image
                                    style={{ width: 10, height: 10 }}
                                    src="/images/add.png"
                                />
                                <Text style={{ fontSize: 9, color: "gray" }}>
                                    Room Only
                                </Text>
                            </View>

                            <View
                                style={{
                                    flexDirection: "row",
                                    gap: 5,
                                    alignItems: "center",
                                }}
                            >
                                <Image
                                    style={{ width: 10, height: 10 }}
                                    src="/images/bed.png"
                                />
                                <Text style={{ fontSize: 9, color: "gray" }}>
                                    0 1 King Bed
                                </Text>
                            </View>

                            <View
                                style={{
                                    flexDirection: "row",
                                    gap: 5,
                                    alignItems: "center",
                                }}
                            >
                                <Image
                                    style={{ width: 10, height: 10 }}
                                    src="/images/guest.png"
                                />
                                <Text style={{ fontSize: 9, color: "gray" }}>
                                    {ticketData?.travellers} Guests
                                </Text>
                            </View>

                            <View
                                style={{
                                    flexDirection: "row",
                                    gap: 5,
                                    alignItems: "center",
                                }}
                            >
                                <Text>•</Text>
                                {/* <Text style={{ fontSize: 9, color: "gray" }}>
                                    Make My Trip Stay 7 and Save Pay Later
                                </Text> */}
                            </View>
                        </View>
                    </View>
                    {/* horizontal line */}
                    <View
                        style={{
                            height: 0.5,
                            backgroundColor: "gray",
                            marginVertical: 10,
                            width: "100%",
                        }}
                    />
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            gap: 10,
                            marginVertical: 10,
                            alignItems: "flex-start",
                        }}
                    >
                        {/* Left: Total Amount */}
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 5,
                                flex: 1,
                            }}
                        >
                            <Image
                                style={{ width: 12, height: 12 }}
                                src="/images/wallet.png"
                            />
                            <Text style={{ fontSize: 10 }}>Total Amount</Text>
                        </View>

                        {/*Total Amount */}
                        <View style={{ flex: 2, flexDirection: "column", gap: 2 }}>
                            <Text style={{ fontSize: 10 }}>{ticketData?.hotelInfo?.total_rate?.lowest}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ backgroundColor: "#1a943f31", flexDirection: 'row', alignItems: 'center', textAlign: 'center', height: 20, marginHorizontal: -11, paddingHorizontal: 11, paddingVertical: 2, gap: 5 }}>
                    <Image style={{ width: 10, height: 10 }} src="/images/check.png" />
                    <Text style={{ fontSize: 9, }}>
                        Free Cancellation (100% refund) till Mon, 23 Jul 2025, 11:59
                        PM (Abu Dhabi time)
                    </Text>
                </View>
            </View>
            {/* first box end */}

            <View style={{ fontSize: 10, gap: 4, marginVertical: 5 }}>
                <Text>Important information</Text>
                <Text style={{ color: 'gray' }}>•Only passport is considered as valid ID proof that each guest must carry.</Text>
                <Text style={{ color: 'gray' }}>
                    •For detailed Rules & Policies document, please click here <Link>click here</Link>
                </Text>
            </View>


            <View>
                <Text style={{ fontSize: 14, marginTop: 10, marginVertical: 10 }}>Room Type and Amenities
                </Text>
            </View>
            {/* box 2 */}
            <View style={{ borderWidth: 1, borderColor: "gray", padding: 10, fontSize: 10, color: 'gray', gap: 5 }}>
                <Text style={{ marginVertical: 5, fontSize: 11, color: 'balck' }}>
                    Superior, Guest Room, 1 King, City View
                </Text>

                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4, gap: 4 }}>
                    <Image style={{ width: 10, height: 10 }} src="/images/add.png" />
                    <Text style={{ color: "gray" }}>Room Only</Text>
                </View>

                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10, gap: 4 }}>
                    <Image style={{ width: 10, height: 10 }} src="/images/guest.png" />
                    <Text style={{ color: "gray" }}>{ticketData?.travellers} Guests</Text>
                </View>

                <Text style={{ marginBottom: 15 }}>
                    {ticketData?.hotelInfo?.amenities.map(amenity => `• ${amenity}`)}
                </Text>

                {/* <Text style={{ color: 'black', fontSize: 12, marginBottom: 10, marginTop: 20 }}>Inclusions</Text>
                <Text style={{ color: "gray" }}>• Make My Trip Stay 7 and Save Pay Later</Text> */}
            </View>
            {/* box 2 end */}


            {/* Hotel Amenities */}
            <View style={{ marginVertical: 20, fontSize: 10, gap: 16 }}>
                <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                    Hotel Amenities
                </Text>

                <View style={{ gap: 4 }}>
                    <Text>Common Area</Text>
                    <Text >
                        Lounge, Lawn, Reception, Library, Balcony/Terrace
                    </Text>
                </View>

                <View style={{ gap: 4 }}>
                    <Text>Business Center and Conferences</Text>
                    <Text>
                        Business Centre, Conference Room, Banquet
                    </Text>
                </View>

                <View style={{ gap: 4 }}>
                    <Text>Basic Facilities</Text>
                    <Text >
                        Swimming Pool, Smoke Detector, Elevator/Lift, Ironing Service, Housekeeping,
                        Newspaper, Umbrellas, Laundry Service, Free Wi-Fi, Free Parking - Reservation Required,
                        Express check-in/check-out
                    </Text>
                </View>

                <View style={{ gap: 4 }}>
                    <Text>Media and Technology</Text>
                    <Text >
                        TV, Electrical Chargers
                    </Text>
                </View>

                <View style={{ gap: 4 }}>
                    <Text>Food and Drinks</Text>
                    <Text >
                        Kids' Meals, Bar, Coffee Shop, Barbeque
                    </Text>
                </View>

                <View style={{ gap: 4 }}>
                    <Text>Room Amenities</Text>
                    <Text >
                        Bathtub, Mineral Water, Sofa, Minibar, Hairdryer, Air Conditioning,
                        Iron/Ironing Board, Mini Fridge, Toiletries, Dining Area, Work Desk,
                        Interconnected Room
                    </Text>
                </View>

                <View style={{ gap: 4 }}>
                    <Text>Beauty and Spa</Text>
                    <Text >
                        Spa, Steam and Sauna
                    </Text>
                </View>

                <View style={{ gap: 4 }}>
                    <Text>Other Facilities</Text>
                    <Text >
                        Family rooms, Valet parking
                    </Text>
                </View>

                <View style={{ gap: 4 }}>
                    <Text>Payment Services</Text>
                    <Text >
                        ATM, Currency Exchange
                    </Text>
                </View>

                <View style={{ gap: 4 }}>
                    <Text>Outdoor Activities and Sports</Text>
                    <Text >
                        Beach
                    </Text>
                </View>

                <View style={{ gap: 4 }}>
                    <Text>General Services</Text>
                    <Text >
                        Luggage Storage, Concierge, Multilingual Staff, Ticket/Tour Assistance,
                        Bellboy Service, Postal Services, Facilities for Guests with Disabilities
                    </Text>
                </View>

                <View style={{ gap: 4 }}>
                    <Text>Safety and Security</Text>
                    <Text >
                        CCTV, Fire Extinguishers
                    </Text>
                </View>

                <View style={{ gap: 4 }}>
                    <Text>Transfers</Text>
                    <Text >
                        Shuttle Service, Paid Airport Transfers
                    </Text>
                </View>

                <View style={{ gap: 4 }}>
                    <Text>Health and Wellness</Text>
                    <Text >
                        Gym, First-aid Services
                    </Text>
                </View>

                <View style={{ gap: 4 }}>
                    <Text>Shopping</Text>
                    <Text >
                        Shops
                    </Text>
                </View>

                <View style={{ gap: 4 }}>
                    <Text>Family and Kids</Text>
                    <Text >
                        Kids' swimming pool, Kids Play Area, Childcare Services
                    </Text>
                </View>
            </View>

            {/* rules and policies */}
            <View style={{ marginTop: 50, fontSize: 10, gap: 16 }}>
                <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                    Rules and Policies
                </Text>

                <View style={{ gap: 4 }}>
                    <Text>Must Read</Text>
                    <Text>
                        • Extra person fee for the 3rd adult/child in one room is chargeable at the hotel and not inclusive in the booking
                    </Text>
                    <Text>
                        • Extra-person charges may apply and vary depending on property policy | Government-issued photo identification and a credit card, debit card, or cash deposit may be required at check-in for incidental charges | Special requests are subject to availability upon check-in and may incur additional charges; special requests cannot be guaranteed | This property accepts credit cards, mobile payments, and cash | Mobile payment options include: Google Pay and Apple Pay | Cashless transactions are available | Safety features at this property include a smoke detector | This property affirms that it follows the cleaning and disinfection practices of Commitment to Clean (Marriott)
                    </Text>
                    <Text>• Optional: Airport transfer fee 350 AED</Text>
                </View>

                <View style={{ gap: 4 }}>
                    <Text>Guest Profile</Text>
                    <Text>• Minimum age for primary guest to check-in is 21 years.</Text>
                </View>

                <View style={{ gap: 4 }}>
                    <Text>Pet(s) Related</Text>
                    <Text>• Service animals not allowed. Pets not allowed.</Text>
                </View>

                <View style={{ gap: 4 }}>
                    <Text>Space Related</Text>
                    <Text>• Car recommended.</Text>
                </View>

                <View style={{ gap: 4 }}>
                    <Text>Child / Extra Bed Policy</Text>
                    <Text>•</Text>
                </View>
            </View>


            {/* <View
                style={{
                    backgroundColor: "#f7f7f7",
                    padding: 10,
                    marginTop: 20,
                    fontSize: 10,
                    gap: 8,
                }}
            >
                <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                    <Image src="/images/companyLogo.png" style={{ width: 20, height: 20 }} />
                    <Text style={{ fontSize: 10 }}>MyPartner Support</Text>
                </View>

                <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                    <Image src="/images/telephone.png" style={{ width: 10, height: 10 }} />
                    <Text style={{ color: "#007aff" }}>+0124 6280411</Text>
                </View>
            </View> */}


        </Page>
    </Document>
);

const HotelticketDownload = () => {

    const [ticketData, setTicketData] = useState(null);
    const id = "17558340494806sxgz4bdv";

    useEffect(() => {
        const fetchTicketData = async () => {
            const result = await axios.get(`${process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_BACKEND_URL : process.env.REACT_APP_PRODUCTION_BACKEND_URL}/booking/gethotelbookingdatabyid/${id}`);

            console.log("Ticket Data:", result.data);
            setTicketData(result.data);
        }
        fetchTicketData();
    }, []);

    return (

        <div className="flex flex-col items-center justify-center mt-10">

            <PDFViewer style={{ width: "100%", height: "100vh" }}>
                <Ticket ticketData={ticketData} />
            </PDFViewer>
            <p className="text-center text-gray-600 mt-2 text-sm font-bold">Click the icon to download your ticket</p>
        </div>
    )

};

export default HotelticketDownload;
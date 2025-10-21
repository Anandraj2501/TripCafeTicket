import React, { useEffect, useState } from 'react';
import { TfiDownload } from "react-icons/tfi";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, PDFViewer, Image } from '@react-pdf/renderer';
import { main } from 'motion/react-client';
import axios from 'axios';

const styles = StyleSheet.create({
    page: {
        padding: 20,
        fontFamily: 'Helvetica',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 10,
        borderBottom: '1px solid #ccc',
    },
    logoImage: {
        width: 100,
        height: 'auto',
    },
    leftSection: {
        width: '33%',
        justifyContent: 'center',
    },
    centerSection: {
        display: 'flex',
        alignItems: 'center',
    },
    rightSection: {
        width: '33%',
        alignItems: 'flex-end',
    },
    confirmationTitle: {
        fontSize: 10,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    labelRow: {
        fontSize: 7,
        flexDirection: 'row',
        gap: 4,
        marginBottom: 2,
    },
    labelText: {
        fontSize: 7,
        color: '#333',
    },
    valueText: {
        fontSize: 8,
        color: '#0070c9',
        fontWeight: 'bold',
    },
    msnUnderline: {
        width: '33%',
        height: 1,
        backgroundColor: '#0070c9',
        marginTop: 2,
    },
    msnLogo: {
        width: 40,
        height: 20,
        objectFit: 'contain',
    },



});

const  formatCoordinates=(lat, lon)=> {
  const format = (value, isLat) => {
    const direction = isLat
      ? value >= 0 ? 'N' : 'S'
      : value >= 0 ? 'E' : 'W';
    const absVal = Math.abs(value);
    const degrees = Math.floor(absVal);
    const minutes = ((absVal - degrees) * 60).toFixed(3);
    return `${direction} ${String(degrees).padStart(3, '0')}° ${minutes}`;
  };

  return `GPS coordinates: ${format(lat, true)}, ${format(lon, false)}`;
}

const TicketDocument = ({ ticketData }) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>

                <View style={styles.centerSection}>
                    {/* <Image style={styles.msnLogo} src={msnLogo} /> */}
                    <View style={styles.msnUnderline} />
                </View>

                <View style={styles.headerContainer}>
                    {/* Left: Booking.com logo */}
                    <View style={styles.leftSection}>
                        <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Booking.com</Text>
                    </View>


                    {/* Right: Booking details */}
                    <View style={styles.rightSection}>
                        <Text style={styles.confirmationTitle}>Booking confirmation</Text>
                        <Text style={styles.labelRow}>
                            <Text style={styles.labelText}>CONFIRMATION NUMBER: </Text>
                            <Text style={styles.valueText}>6390.085.531</Text>
                        </Text>
                        <Text style={styles.labelRow}>
                            <Text style={styles.labelText}>PIN CODE: </Text>
                            <Text style={styles.valueText}>5620</Text>
                        </Text>
                    </View>
                </View>

                <View style={{ border: '1px solid #ccc', marginTop: 10, padding: 10, backgroundColor: '#f8f9fb' }}>
                    <View style={{ display: "flex", flexDirection: "row" }}>

                        

                        <View style={{ display: "flex", flexDirection: "column", flex: 2, borderRight: '1px solid #ccc' }}>
                            <View style={{ width: "80%" }}>
                                <Text style={{ fontSize: 10, marginBottom: 2 }}>{ticketData?.hotelInfo?.name}</Text>
                                <Text style={{ fontSize: 10, marginBottom: 2 }}>Address: {ticketData?.city}</Text>
                                <Text style={{ fontSize: 10, marginBottom: 2 }}>Phone: +1220121</Text>
                                <Text style={{ fontSize: 10, marginBottom: 2 }}>{formatCoordinates(ticketData?.hotelInfo?.gps_coordinates?.latitude,ticketData?.hotelInfo?.gps_coordinates?.longitude)}</Text>
                            </View>
                        </View>

                        <View style={{ display: "flex", flexDirection: "column", gap: 2, flex: 1, fontSize: 10, justifyContent: "center", alignItems: "center", borderRight: '1px solid #ccc' }}>
                            <Text>Check In</Text>
                            <Text style={{ fontSize: 18, fontWeight: "bold" }}>27</Text>
                            <Text style={{ fontSize: 10, fontWeight: "bold" }}>July</Text>
                            <Text style={{ fontSize: 10, fontWeight: "bold" }}>Sunday</Text>
                            <Text>Form 15:00</Text>
                        </View>

                        <View style={{ display: "flex", flexDirection: "column", gap: 2, flex: 1, fontSize: 10, justifyContent: "center", alignItems: "center", borderRight: '1px solid #ccc' }}>
                            <Text>Check out</Text>
                            <Text style={{ fontSize: 18, fontWeight: "bold" }}>27</Text>
                            <Text style={{ fontSize: 10, fontWeight: "bold" }}>July</Text>
                            <Text style={{ fontSize: 10, fontWeight: "bold" }}>Sunday</Text>
                            <Text>untill 15:00</Text>
                        </View>

                        <View style={{ display: "flex", flexDirection: "column", flex: 1, fontSize: 10, alignItems: "center", gap: 2 }}>
                            <View style={{ display: "flex", flexDirection: "row", gap: 10, }}>
                                <Text>Room</Text>
                                <Text>Night</Text>
                            </View>
                            <View style={{ display: "flex", flexDirection: "row", gap: 10, }}>
                                <Text style={{ fontSize: 18, fontWeight: "bold" }}> 1</Text>
                                <Text style={{ fontSize: 18, fontWeight: "bold" }}>/</Text>
                                <Text style={{ fontSize: 18, fontWeight: "bold" }}>1</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ borderBottom: "1px solid #ccc", marginVertical: 10 }}></View>

                    <View>
                        <View style={{ display: "flex", flexDirection: "row", fontSize: 10, justifyContent: "space-between" }}>
                            <View>
                                <Text style={{ fontSize: 16, fontWeight: "bold" }}>Price</Text>
                                <Text>1 room 10% vat</Text>
                            </View>
                            <View style={{ display: "flex", alignItems: "flex-end", flexDirection: "column" }}>
                                <Text>Rs 12323</Text>
                                <Text style={{ fontSize: 16, fontWeight: "bold" }}>approx RS 2313132</Text>
                                <Text>Rs 23213</Text>
                            </View>
                        </View>

                        <View style={{ fontSize: 10, gap: 2 }}>
                            <Text>Price</Text>
                            <Text>for (one guest)</Text>
                            <Text>Additional Charges</Text>
                            <Text>The price you see below is an approximate that may include fees based on the maximum occupancy. This can include taxes set by local governments or charges set by the property.</Text>
                            <Text>A City tax is applicable, charges may vary</Text>
                            <Text>Final price (taxes included)</Text>

                        </View>

                        <View style={{ display: "flex", flexDirection: "row", fontSize: 10, justifyContent: "space-between", marginTop: "10" }}>
                            <View style={{ width: "70%" }}>
                                <Text style={{ fontSize: 12, fontWeight: "bold" }}>The final price shown is the amount you will pay to the property.</Text>
                                <Text>Your card issuer may charge you a foreign transaction fee.</Text>
                            </View>
                            <View style={{ display: "flex", alignItems: "flex-end", flexDirection: "column", }}>
                                <Text>Rs 12323</Text>
                                <Text style={{ fontSize: 16, fontWeight: "bold" }}>approx RS 2313132</Text>
                                <Text>Rs 23213</Text>
                            </View>
                        </View>


                        <View style={{ fontSize: 10, gap: 2 }}>
                            <Text style={{ fontSize: 12, fontWeight: "heavy" }}>Payment information</Text>
                            <Text>No prepayment is needed. You'll pay during your stay at Toyoko Inn Tokyo Fussa Ekimae Higashi guchi. Booking.com will only charge your card in case of a late cancellation or no-show. Your card details are stored securely and won't be shared with the property, so please bring your preferred payment method during your stay. This property accepts the following forms of payment: American Express, Visa, Mastercard, Diners Club, JCB</Text>
                            <Text style={{ fontSize: 12, fontWeight: "heavy" }}>Currency and exchange rate information</Text>
                        </View>

                        <View style={{ borderBottom: "1px solid #ccc", marginVertical: 10 }}></View>

                        <View style={{ fontSize: 10 }}>
                            <Text>You'll pay Toyoko Inn Tokyo Fussa Ekimae Higashi guchi in JPY according to the exchange rate on the day of payment.</Text>
                            <Text>The amount displayed in INR is just an estimate based on today's exchange rate for JPY.</Text>
                        </View>

                        <View style={{ borderBottom: "1px solid #ccc", marginVertical: 10 }}></View>

                        <View style={{ fontSize: 8 }}>
                            <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 5 }}>Additional Information</Text>
                            <Text>Please note that additional supplements (e.g. extra bed) are not added in this total.</Text>
                            <Text>If you cancel outside the free cancellation period, cancellation fees may apply. Check the cancellation cost below for more info.</Text>
                            <Text>If you don't show up at this booking, and you don't cancel beforehand, no-show fees may apply.</Text>
                            <Text>Make sure to always modify or cancel this booking via Booking.com to avoid any unexpected cancellation or no-show fees afterwards.</Text>
                            <Text>Please remember to read the Important information below, as this may contain important details not mentioned here.</Text>
                        </View>
                    </View>
                </View>

                <View style={{ border: '1px solid #ccc', padding: 10, backgroundColor: '#f8f9fb', display: "flex" }}>
                    <View style={{ width: "70%", borderRight: "1px solid #ccc", gap: 20 }}>
                        <View style={{ fontSize: 8, marginRight: 10 }}>
                            <Text style={{ fontSize: 14, fontWeight: "bold" }}>Single Room - Non Smoking</Text>
                            <Text>Guest Name:</Text>
                            <Text>Meal Plan:</Text>
                        </View>


                        <View style={{ fontSize: 8, marginRight: 10 }}>
                            <Text>Private bathroom • Mountain view • Free toiletries • Air conditioning • Toilet • Bath or shower • Towels • Desk •
                                Slippers • Refrigerator • Telephone • Heating • Flat-screen TV • Hairdryer • Wake up service/Alarm clock • Electric
                                kettle • Wardrobe or closet • Toilet paper</Text>
                            <Text style={{ fontWeight: "bold" }}>Bed Sizes</Text>
                        </View>
                    </View>

                    <View></View>

                </View>

                <View style={{ fontSize: 8, marginTop: 5, display: "flex", flexDirection: "row", padding: 10 }}>
                    <View style={{ gap: 2, flex: 1 }}>
                        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Important Information</Text>
                        <Text>Housekeeping serviceis only offered every 4 nights.{"\n"}
                            When booking 10 rooms or more, different policies and additional
                            supplements may apply.{"\n"} Room change is required every 7 nights.</Text>
                    </View>

                    <View style={{ gap: 2, flex: 1 }}>
                        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Hotel Policies</Text>
                        <Text style={{ fontSize: 12, fontWeight: "bold" }}>Guest Parking</Text>
                        <Text>Private parking is possible on site (reservation is not possible) and
                            costs ¥800 per day.{"\n"}WiFi is available in the rooms and is free of charge.</Text>
                    </View>
                </View>

            </Page>
        </Document>
    );
}

const HotelTicket = () => {
    const [ticketData,setTicketData] = useState(null);

     useEffect(() => {
            const fetchTicketData = async () => {
                try {
                    const token = localStorage.getItem("token");
                    const response = await axios.get(`${process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_BACKEND_URL : process.env.REACT_APP_PRODUCTION_BACKEND_URL}/booking/getHotelBookingDataById/1748278417666hp8uvpnl3`, {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
                        withCredentials: true,
                    });
                    setTicketData({ ...response.data });
    
                    console.log('Ticket data fetched successfully:', response.data);
                    // console.log(response);
                } catch (error) {
                    // console.error('Error fetching ticket data:', error);
                    // setLoading(false);
                }
            };
    
            fetchTicketData();
        }, []);

    return (
        <div className="flex flex-col items-center justify-center mt-10">
            <PDFViewer style={{ width: '100%', height: '900px' }}>
                <TicketDocument ticketData={ticketData} />
            </PDFViewer>

            {/* Uncomment below if you want the download functionality */}
            {/* <PDFDownloadLink
                document={<TicketDocument ticketData={ticketData} />}
                fileName={`ticket_1.pdf`}
            >
                {({ loading }) =>
                    loading ? (
                        "Generating PDF..."
                    ) : (
                        <span className="flex justify-center items-center w-20 h-20 rounded-full bg-green-500 hover:bg-green-300 cursor-pointer">
                            <TfiDownload size={40} title="Download Ticket PDF" className="text-white" />
                        </span>
                    )
                }
            </PDFDownloadLink> */}
        </div>
    );
}

export default HotelTicket;

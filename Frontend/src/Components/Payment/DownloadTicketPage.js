import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import airlinesData from "../BookingDetails/airlines.json";
import dayjs from 'dayjs';
import { TfiDownload } from "react-icons/tfi";
//import tripCafelogo from 'http://localhost:3000/images/trip-cafe.jpg';




import axios from 'axios';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, PDFViewer, Image, } from '@react-pdf/renderer';
import { span } from 'motion/react-client';



const styles = StyleSheet.create({
    page: {
        padding: 10,
        fontSize: 10,
        fontFamily: 'Helvetica',
    },
    container: {
        flexDirection: 'row',
        borderTop: '1px solid #000',
        borderBottom: '1px solid #000',
    },
    leftSection: {
        flex: 1,
        gap: 5,
        padding: 10,
        borderRight: '1px solid #000',
    },
    rightSection: {
        flexDirection: 'row',
        flex: 1,
        padding: 10,
        justifyContent: 'center',
    },
    rightLeftSection: {
        flex: 1,
        gap: 5,
        paddingRight: 4,
        justifyContent: 'center',
    },
    rightRightSection: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    logoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,

    },
    logo: {
        width: 70,
        height: 20,
        marginRight: 6,
    },
    boldText: {
        fontWeight: 'bold',
    },
    airlineCode: {
        fontWeight: 'bold',
        marginTop: 4,
    },
    subText: {
        color: 'gray',
        fontSize: 9,
    },
    table: {
        display: 'table',
        width: '100%',
        border: '1px solid #000',
        borderBottom: 0,
        marginTop: 10,
    },
    headerRow: {
        flexDirection: 'row',
        backgroundColor: '#000',
        color: '#fff',
    },
    headerCellLeft: {
        flex: 3,
        padding: 6,
        borderRight: '1px solid #fff',
    },
    headerCellRight: {
        flex: 5,
        padding: 6,
        textAlign: 'right',
        fontStyle: 'italic',
    },
    subHeaderRow: {
        flexDirection: 'row',
        backgroundColor: '#d3d3d3',
        borderBottom: '1px solid #000',
    },

    subHeaderCell: {
        flex: 1,
        padding: 5,
        borderRight: '1px solid #000',
        fontWeight: 'bold',
    },
    lastSubHeaderCell: {
        borderRight: 0,
    },
    dataRow: {
        flexDirection: 'row',
    },
    dataCell: {
        flex: 1,
        padding: 5,
        borderRight: '1px solid #000',
        borderBottom: '1px solid #000',
    },
    lastDataCell: {
        borderRight: 0,
    },
    blackHeader: {
        flexDirection: 'row',
        backgroundColor: '#000',
        color: '#fff',
        padding: 6,
        borderBottom: '1px solid #000',
    },
    passengerdataRow: {
        flexDirection: 'row',
        borderBottom: '1px solid #000',
    },
    cell: {
        padding: 6,
        borderRight: '1px solid #000',
        flex: 1,
        textAlign: 'center',
    },
    wideCell: {
        flex: 2,
    },
    lastCell: {
        borderRight: 0,
    },


    faredetailscontainer: {
        border: '1px solid #000',
        width: '100%',
        marginTop: 10,
    },
    faredetailsblackHeader: {
        backgroundColor: '#000',
        color: '#fff',
        padding: 6,
        fontWeight: 'bold',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 6,
        borderTop: '1px solid #000',
    },
    boldRow: {
        fontWeight: 'bold',
    },

    section: {
        borderBottom: '1px solid #000',
        marginTop: 10,
    },
    instructionlogoRow: {
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'center',      // Center horizontally
        justifyContent: 'center',  // Center vertically
    },
    instructionlogo: {
        width: "100%",       // Set desired width
        height: 'auto',   // Maintain aspect ratio
        objectFit: 'contain',
    },
});

const getAirlineLogo = (iataCode) => {
    // // console.log(iataCode);
    const airline = airlinesData?.data?.find(airline => airline?.iata_code === iataCode);
    // // console.log(airline);
    return airline?.logo ? airline?.logo : "images/notfound.png"; // Default image if not found

}
const getAirlineName = (iataCode) => {
    console.log(iataCode);
    const airline = airlinesData?.data?.find(airline => airline?.iata_code === iataCode);
    // // console.log(airline);
    return airline?.name ? airline?.name : iataCode;

}
const formatTime = (local_departure, local_arrival) => {
    // console.log(local_departure, local_arrival);
    const diffMs = new Date(local_arrival) - new Date(local_departure);
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
}

const formatFlightDate = (dateStr) => {
    const [year, month, day] = dateStr.split("-").map(Number);

    // Create date without timezone shift
    const date = new Date(year, month - 1, day);

    const options = { weekday: 'short', day: '2-digit', month: 'short', year: '2-digit' };
    const formatted = date.toLocaleDateString('en-GB', options)
        .replace(',', '')
        .replace(/(\d{2})$/, "'$1");

        return formatted;
}
const TicketDocument = ({ ticketData, departureSegments, returnSegments }) => (

    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.container}>
                {/* Left Section */}
                <View style={styles.leftSection}>
                    <Text>Booking Date: {ticketData?.createdAt.split("T")[0]}</Text>
                    <Text>Booking ID: {ticketData?.referenceId.toUpperCase()}</Text>
                    <Text>
                        Booking Status: <Text style={styles.boldText}>{ticketData?.status === "paid" ? "Confirmed" : "Pending"}</Text>
                    </Text>
                </View>

                {/* Right Section */}
                <View style={styles.rightSection}>
                    <View style={styles.rightLeftSection}>
                        {
                            ticketData?.addOnDetails?.airlines && ticketData?.addOnDetails?.airlines.length > 0 && ticketData?.addOnDetails?.airlines.map((airline, index) => (
                                <View style={styles.logoRow}>
                                    <Image style={styles.logo} src={getAirlineLogo(airline)} />
                                    <Text>{getAirlineName(airline)}</Text>
                                </View>
                            ))
                        }

                    </View>

                    <View style={styles.rightRightSection}>
                        <Text style={styles.airlineCode}>{ticketData?.pnr}</Text>
                        <Text style={styles.subText}>Airline PNR</Text>
                    </View>
                </View>
            </View>

            <View style={styles.table}>
                {/* Black Header */}
                <View style={styles.headerRow}>
                    <Text style={styles.headerCellLeft}>Flight Detail  From {ticketData?.travellingDetails.from} to {ticketData?.travellingDetails.to}</Text>
                    <Text style={styles.headerCellRight}>
                        *Please verify flight timings & terminal info with the airlines
                    </Text>
                </View>

                {/* Grey Sub-header */}
                <View style={styles.subHeaderRow}>
                    <Text style={styles.subHeaderCell}>Flight</Text>
                    <Text style={styles.subHeaderCell}>Fare Type</Text>
                    <Text style={styles.subHeaderCell}>Class</Text>
                    <Text style={styles.subHeaderCell}>Departing</Text>
                    <Text style={styles.subHeaderCell}>Arriving</Text>
                    <Text style={[styles.subHeaderCell, styles.lastSubHeaderCell]}>Duration</Text>
                </View>

                {/* Data Row */}
                {
                    ticketData && departureSegments.map((flight, index) => (
                        <View style={styles.dataRow}>
                            <Text style={styles.dataCell}>
                                {flight?.airline}-{flight?.flight_no}{"\n"}{getAirlineName(flight?.airline)}
                            </Text>
                            <Text style={styles.dataCell}>NA</Text>
                            <Text style={styles.dataCell}>Economy</Text>
                            <Text style={styles.dataCell}>
                                {formatFlightDate(flight?.local_departure.split("T")[0])}{flight?.local_departure.split("T")[1].split(".")[0]},{"\n"}{flight?.cityFrom}
                            </Text>
                            <Text style={styles.dataCell}>
                                {formatFlightDate(flight?.local_arrival.split("T")[0])}{flight?.local_arrival.split("T")[1].split(".")[0]},{"\n"}{flight?.cityTo}
                            </Text>
                            <Text style={[styles.dataCell, styles.lastDataCell]}>{formatTime(flight?.local_departure, flight?.local_arrival)}</Text>
                        </View>
                    ))
                }

            </View>

            {/* return  */}
            {
                returnSegments && returnSegments.length > 0 && (
                    <View style={styles.table}>
                        {/* Black Header */}
                        <View style={styles.headerRow}>
                            <Text style={styles.headerCellLeft}>Flight Detail  From {ticketData?.travellingDetails.to} to {ticketData?.travellingDetails.from}</Text>
                            <Text style={styles.headerCellRight}>
                                *Please verify flight timings & terminal info with the airlines
                            </Text>
                        </View>

                        {/* Grey Sub-header */}
                        <View style={styles.subHeaderRow}>
                            <Text style={styles.subHeaderCell}>Flight</Text>
                            <Text style={styles.subHeaderCell}>Fare Type</Text>
                            <Text style={styles.subHeaderCell}>Class</Text>
                            <Text style={styles.subHeaderCell}>Departing</Text>
                            <Text style={styles.subHeaderCell}>Arriving</Text>
                            <Text style={[styles.subHeaderCell, styles.lastSubHeaderCell]}>Duration</Text>
                        </View>

                        {/* Data Row */}
                        {
                            ticketData && returnSegments.map((flight, index) => (
                                <View style={styles.dataRow}>
                                    <Text style={styles.dataCell}>
                                        {flight?.airline}-{flight?.flight_no}{"\n"}{getAirlineName(flight?.airline)}
                                    </Text>
                                    <Text style={styles.dataCell}>NA</Text>
                                    <Text style={styles.dataCell}>Economy</Text>
                                    <Text style={styles.dataCell}>
                                        {formatFlightDate(flight?.local_departure.split("T")[0])}{flight?.local_departure.split("T")[1].split(".")[0]},{"\n"}{flight?.cityFrom}
                                    </Text>
                                    <Text style={styles.dataCell}>
                                        {formatFlightDate(flight?.local_arrival.split("T")[0])}{flight?.local_arrival.split("T")[1].split(".")[0]},{"\n"}{flight?.cityTo}
                                    </Text>
                                    <Text style={[styles.dataCell, styles.lastDataCell]}>{formatTime(flight?.local_departure, flight?.local_arrival)}</Text>
                                </View>
                            ))
                        }

                    </View>
                )
            }


            <View style={styles.table}>
                {/* Black Section Header */}
                <View style={styles.blackHeader}>
                    <Text>Passenger Details</Text>
                </View>

                {/* Grey Sub-Header */}
                <View style={styles.subHeaderRow}>
                    <Text style={styles.cell}>Sr.</Text>
                    <Text style={[styles.cell, styles.wideCell]}>Name & FF</Text>
                    <Text style={styles.cell}>Oneway{"\n"}Sector</Text>
                    {
                        returnSegments && returnSegments.length > 0 && (
                            <Text style={styles.cell}>Return{"\n"}Sector</Text>
                        )
                    }
                    <Text style={styles.cell}>PNR & Ticket No.</Text>
                    <Text style={styles.cell}>Baggage{"\n"}Check-in | Cabin</Text>
                    <Text style={[styles.cell, styles.lastCell]}>Meal, Seat & Other Preference</Text>
                </View>

                {/* Data Row */}


                {
                    ticketData?.passengers?.map((passenger, index) => (
                        <View style={styles.passengerdataRow}>
                            <Text style={styles.cell}>{index + 1}</Text>
                            <Text style={[styles.cell, styles.wideCell]}>{passenger?.title} {passenger?.firstName} {passenger?.lastName}</Text>
                            <Text style={styles.cell}>{ticketData?.travellingDetails.from} - {ticketData?.travellingDetails.to}</Text>
                            {
                                returnSegments && returnSegments.length > 0 && (
                                    <Text style={styles.cell}>{ticketData?.travellingDetails.to} - {ticketData?.travellingDetails.from}</Text>
                                )
                            }
                            <Text style={styles.cell}>{ticketData?.pnr}</Text>
                            <Text style={styles.cell}>{ticketData?.addOnDetails?.bag?.hold_weight ? ticketData?.addOnDetails?.bag?.hold_weight + " KG " : "NA"} | {ticketData?.addOnDetails?.bag?.hand_weight ? ticketData?.addOnDetails?.bag?.hand_weight + " KG " : "NA"}</Text>
                            <Text style={[styles.cell, styles.lastCell]}>NA</Text>
                        </View>
                    ))
                }
            </View>

            <View style={styles.faredetailscontainer}>
                {/* Header */}
                <Text style={styles.faredetailsblackHeader}>Fare Details</Text>
                <View style={[styles.row, styles.boldRow]}>
                    <Text>Base Fare + Taxes & Fees</Text>
                    <Text>
                        INR{" "}
                        {ticketData?.addOnDetails?.price
                            ? new Intl.NumberFormat("en-IN").format(ticketData.addOnDetails.price)
                            : "NA"}
                    </Text>
                </View>
            </View>


            <View style={styles.section}>
                {/* Header */}
                <Text style={styles.blackHeader}>Important Information</Text>

                {/* Bullet Points */}
                <View>
                    {[
                        'You must web check-in on the airline website and obtain a boarding pass.',
                        'Reach the terminal at least 2 hours prior to the departure for domestic flight and 4 hours prior to the departure of international flight.',
                        'For departure terminal please check with the airline first.',
                        'Date & Time is calculated based on the local time of the city/destination.',
                        'Use the Airline PNR for all Correspondence directly with the Airline.',
                        'For rescheduling/cancellation within 4 hours of the departure time contact the airline directly.',
                        'Your ability to travel is at the sole discretion of the airport authorities and we shall not be held responsible.',
                    ].map((item, index) => (
                        <Text style={styles.listItem} key={index}>
                            {index + 1} - {item}
                        </Text>
                    ))}
                </View>


            </View>

            <View style={styles.instructionlogoRow}>
                <Image style={styles.instructionlogo} src="/images/instructions.png" />
            </View>
        </Page>
    </Document>
);

const DownloadTicketPage = ({ id }) => {

    const location = useLocation();
    const [ticketData, setTicketData] = useState(null);
    const [loading, setLoading] = useState(true);

    const [departureSegments, setDepartureSegments] = useState([]);
    const [returnSegments, setReturnSegments] = useState([]);

    // Extract the txnId from the URL
    const params = new URLSearchParams(location.search);
    const txnId = params.get('txnId');

    const finalId = id || txnId;
    console.log('Final ID:', finalId);
    // Fetch the ticket data from the backend using the txnId
    useEffect(() => {
        const fetchTicketData = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`${process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_BACKEND_URL : process.env.REACT_APP_PRODUCTION_BACKEND_URL}/booking/getbookingdatabyid/${finalId}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    withCredentials: true,
                });
                setTicketData({ ...response.data }); // Ensure a new object reference for state update
                setLoading(false);
                setDepartureSegments(response?.data?.flightDetails?.filter(flight => flight?.return === 0));
                setReturnSegments(response.data.flightDetails.filter(flight => flight?.return === 1));

                console.log('Ticket data fetched successfully:', response.data);
                // console.log(response);
            } catch (error) {
                // console.error('Error fetching ticket data:', error);
                setLoading(false);
            }
        };

        fetchTicketData();
    }, [finalId]);

    // If still loading data, display a loading message
    if (loading) {
        return <Text>Loading ticket data...</Text>;
    }

    // If no data found, display an error message
    // if (!ticketData) {
    //     return <Text>No ticket found for transaction ID: {txnId}</Text>;
    // }

    // Provide a download link for the PDF document
    return (
        <div className="flex items-center justify-center ">
  <PDFDownloadLink
    document={
      <TicketDocument
        ticketData={ticketData}
        departureSegments={departureSegments}
        returnSegments={returnSegments}
      />
    }
    fileName={`ticket_${finalId}.pdf`}
  >
    {({ loading }) =>
      loading ? (
        "Generating PDF..."
      ) : (
        <div className="flex items-center gap-2 px-4 py-2 rounded-md bg-orange-500 hover:bg-orange-600 cursor-pointer transition">
          {/* Small Icon */}
          <TfiDownload size={18} title="Download Ticket PDF" className="text-white" />
          {/* Text */}
          <span className="text-white font-semibold text-sm">
            Download Ticket
          </span>
        </div>
      )
    }
  </PDFDownloadLink>
</div>



    );
};

export default DownloadTicketPage;

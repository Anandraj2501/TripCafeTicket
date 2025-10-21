import { useCallback, useEffect, useRef, useState } from "react";

import { Plane, Hotel, Calendar, Mail, Search, Download, X, Edit2, Save, User, Phone } from 'lucide-react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const statusColors = {
    paid: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    failed: "bg-red-100 text-red-800",
};

const FlightSection = () => {
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [pnr, setPnr] = useState("");
    const [status, setStatus] = useState();
    const [stats, setStats] = useState();
    const [page, setPage] = useState(1);

    const [tickets, setTickets] = useState([]);
    // const [filteredTickets, setFilteredTickets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const observer = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_BACKEND_URL : process.env.REACT_APP_PRODUCTION_BACKEND_URL}/booking?page=${page}`, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                setTickets(prevData => [...prevData, ...response.data.orders]);
                // console.log(response.data);
                // setFilteredTickets(prevData => [...prevData, ...response.data.orders]);
                if (response.data.orders.length === 0) {
                    setHasMore(false);
                }
            } catch (error) {
                if(error.response.status===401){
                    navigate("/login")
                }
                setHasMore(false);
            } finally {
                setLoading(false);

            }
        };

        fetchTickets();
    }, [page]);


    useEffect(() => {
        const getStats = async () => {
            try {
                const response = await axios.get(`${process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_BACKEND_URL : process.env.REACT_APP_PRODUCTION_BACKEND_URL}/booking/getStats`, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                setStats(response?.data);
            } catch (error) {
                if(error.response.status===401){
                    navigate("/login")
                }
                // setLoading(false);
            }
        }

        getStats();
    }, [])

    const filteredTickets = tickets.filter(ticket => {
        if (fromDate && new Date(ticket.createdAt) < new Date(fromDate)) return false;
        if (toDate && new Date(ticket.createdAt) > new Date(toDate)) return false;
        if (pnr && ticket.pnr !== pnr) return false;
        if (status && ticket.status.toLowerCase() !== status.toLowerCase()) return false;
        return true;
    });

    const lastItemRef = useCallback(node => {
        if (loading || !hasMore) return;

        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPage => prevPage + 1);
            }
        })

        if (node) observer.current.observe(node);

    }, [loading]);

    return (
        <div className="p-6 max-w-[1400px] mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <img alt="Your Company" src="images/trip-cafe-logo-admin.png" className=" filter invert h-8 m-[0 auto] w-auto"
                    />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">Booking Dashboard</h1>

            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="bg-blue-50 p-3 rounded-lg">
                            <Plane className="w-6 h-6 text-blue-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-400">Last 30 days</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats?.flightbookingLastThirtyDays}</h3>
                    <p className="text-sm text-gray-600">Total Tickets Booked</p>
                </div>

                <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="bg-purple-50 p-3 rounded-lg">
                            <Hotel className="w-6 h-6 text-purple-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-400">Last 30 days</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats?.hotelBookingLastThirtyDays}</h3>
                    <p className="text-sm text-gray-600">Total Hotels Booked</p>
                </div>

                <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="bg-green-50 p-3 rounded-lg">
                            <Calendar className="w-6 h-6 text-green-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-400">Total</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats?.totalHotelBooking + stats?.totalFlightBooking}</h3>
                    <p className="text-sm text-gray-600">Total Bookings</p>
                </div>


            </div>

            {/* Search Filters */}
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">From Date</label>
                        <input
                            type="date"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">To Date</label>
                        <input
                            type="date"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">PNR</label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Enter PNR"
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                value={pnr}
                                onChange={(e) => setPnr(e.target.value)}
                            />
                            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Ticket Status</label>
                        <select
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="">All</option>
                            <option value="paid">Paid</option>
                            <option value="pending">Pending</option>
                            <option value="failed">Failed</option>
                        </select>

                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-50">
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking Date&Time</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Txn ID</th>
                            {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ReferenceId</th> */}
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PNR</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredTickets?.map((ticket, index) => (
                            <tr key={index} ref={index === filteredTickets.length - 1 ? lastItemRef : null} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {new Date(ticket.createdAt).toLocaleString("en-US")}
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ticket.transactionId}</td>
                                {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ticket.referenceId}</td> */}
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ticket.referenceId}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ticket.pnr}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ticket.amount}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ticket.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[ticket.status]}`}>
                                        {ticket.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <button className="text-blue-600 hover:text-blue-800" >View Details</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default FlightSection;
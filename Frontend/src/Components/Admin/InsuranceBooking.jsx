import { Plane, Hotel, Calendar, Mail, Search, Download, X, Edit2, Save, User, Phone, ChevronLeft, ChevronRight } from 'lucide-react';
const statusColors = {
    paid: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    failed: "bg-red-100 text-red-800",
};


const InsuranceBooking = ({ filteredTickets, handleViewDetails, showModal, bookingType, selectedBooking, setShowModal }) => {
    return (
        <>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-50">
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking Date&Time</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Txn ID</th>
                            {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ReferenceId</th> */}
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference ID</th>
                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purpose</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">To</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredTickets?.map((ticket, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {new Date(ticket.createdAt).toLocaleString("en-US")}
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ticket?.transactionId}</td>
                                {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ticket.referenceId}</td> */}
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ticket?.referenceId}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ticket?.purpose}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ticket?.departureDate?.split("T")[0]}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ticket?.returnDate?.split("T")[0]}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ticket?.from}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ticket?.to}</td>

                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ticket?.amount}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ticket?.source}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ticket?.contactDetails?.phone}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ticket?.contactDetails?.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[ticket.status.toLowerCase()]}`}>
                                        {ticket.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <button className="text-blue-600 hover:text-blue-800" onClick={() => handleViewDetails(ticket)}>View Details</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {
                showModal && selectedBooking && bookingType === "Insurance" && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
                            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                                <h3 className="text-xl font-semibold text-gray-900">Booking Details</h3>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="text-gray-400 hover:text-gray-500"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="p-6 overflow-y-auto flex-1">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

                                    <div>
                                        <h4 className="text-sm font-medium text-gray-500 mb-1">Transaction ID</h4>
                                        <p className="text-gray-900">{selectedBooking?.transactionId}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-500 mb-1">Reference ID</h4>
                                        <p className="text-gray-900">{selectedBooking?.referenceId}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-500 mb-1">Amount</h4>
                                        <p className="text-gray-900">₹{selectedBooking?.amount}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-500 mb-1">Status</h4>
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                ${statusColors[selectedBooking?.status.toLowerCase()]}`}>
                                            {selectedBooking?.status}
                                        </span>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <h4 className="text-lg font-medium text-gray-900 mb-3">Passenger Details</h4>
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200 border border-gray-300 rounded-lg">
                                            <thead className="bg-gray-100">
                                                <tr className="text-left text-sm font-medium text-gray-500">
                                                    <th className="px-4 py-2">Title</th>
                                                    <th className="px-4 py-2">Firstname</th>
                                                    <th className="px-4 py-2">Lastname</th>
                                                    <th className="px-4 py-2">Gender</th>
                                                    <th className="px-4 py-2">DOB</th>
                                                    <th className="px-4 py-2">Passport Number</th>
                                                    <th className="px-4 py-2">Nationality</th>
                                                    <th className="px-4 py-2">Address</th>
                                                    <th className="px-4 py-2">State</th>
                                                    <th className="px-4 py-2">City</th>
                                                    <th className="px-4 py-2">Zip Code</th>
                                                    <th className="px-4 py-2">Phone</th>
                                                    <th className="px-4 py-2">Email</th>
                                                    <th className="px-4 py-2">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200 bg-white">
                                                {selectedBooking?.passengers.map((passenger) => (
                                                    <tr key={passenger.id} className="text-sm text-gray-900">
                                                        <td className="px-4 py-2 flex items-center">
                                                            <User className="w-4 h-4 mr-2 text-gray-400" />
                                                            {passenger.title}
                                                        </td>
                                                        <td className="px-4 py-2">{passenger.firstName}</td>
                                                        <td className="px-4 py-2">{passenger.lastName}</td>
                                                        <td className="px-4 py-2">{passenger.gender}</td>
                                                        <td className="px-4 py-2">{passenger.dob?.split("T")[0]}</td>
                                                        <td className="px-4 py-2">{passenger.passportNumber}</td>
                                                        <td className="px-4 py-2">{passenger.nationality}</td>
                                                        <td className="px-4 py-2">{passenger.address}</td>
                                                        <td className="px-4 py-2">{passenger.state}</td>
                                                        <td className="px-4 py-2">{passenger.city}</td>
                                                        <td className="px-4 py-2">{passenger.zipcode}</td>
                                                        <td className="px-4 py-2">{passenger.phone}</td>
                                                        <td className="px-4 py-2">{passenger.email}</td>
                                                        <td className="px-4 py-2">
                                                            <button
                                                                // onClick={() => startEditingPassenger(passenger)}
                                                                className="text-blue-600 hover:text-blue-800"
                                                                title="Edit passenger"
                                                            >
                                                                <Edit2 size={18} />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                            </div>

                            <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-end">
                                <div className='flex gap-3'>


                                    <button
                                        onClick={() => setShowModal(false)}
                                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default InsuranceBooking;
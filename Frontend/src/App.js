import './App.css';
import BookingDetails from './Components/BookingDetails/BookingDetails';
import DummyTickets from './Components/Dummy-Tickets/DummyTickets';
//import Footer from './Components/Footer/Footer';
//import Main from './Components/Main/Main';
import { Routes, Route } from 'react-router-dom';
import PaymentComponent from './Components/Payment/PaymentComponent';
import Login from './Components/Auth/Login';
import Signup from './Components/Auth/Signup';
import 'react-toastify/dist/ReactToastify.css';
import DownloadTicketPage from './Components/Payment/DownloadTicketPage';
import AboutUs from './Components/About/AboutUs';
import FAQs from './Components/FAQs/FAQs';
import AdminMain from "./Components/Admin/AdminMain";
import ContactUs from './Components/Contact/ContactUs';
import TermsConditions from './Components/TermsConditions';
import Privacy from './Components/Privacy';
import PaymentSuccess from './Components/Payment/PaymentSuccess';
import HotelBookingDetailsModern from './Components/Hotels/HotelBookingDetailsModern';
import HotelPaymentPage from './Components/Hotels/HotelPaymentPage';
import HotelPaymentSuccess from './Components/Payment/HotelPaymentSuccess';
import ReviewsList from './Components/Review/ReviewList';
import InsuranceBooking from './Components/Insurance/InsuranceBooking';
import InsurancePaymentPage from './Components/Insurance/InsurancePaymentPage.jsx';
import InsurancePaymentSuccess from './Components/Insurance/InsurancePaymentSuccess';
import HotelTicket from './Components/Payment/HotelTicket.js';
import HotelticketDownload from './Components/Hotels/HotelTicketDownload.jsx';
import HotelReservationMessage from './Components/Dummy-Tickets/HotelReservationMessage.jsx';
import InsurancePage from './Components/Insurance/InsurancePage.jsx';
import AnnouncementBar from './Components/Add/AnnouncementBar.jsx';

function App() {
  return (
    <div className="App">
      {/* <HotelReservationMessage/> */}
      <AnnouncementBar />
      <Routes>

        <Route path="/" element={<DummyTickets />} />
        <Route path='/about-us' element={<AboutUs />} />
        <Route path='/contact-us' element={<ContactUs />} />
        <Route path='/faqs' element={<FAQs />} />
        <Route path='/terms-conditions' element={<TermsConditions />} />
        <Route path='/Privacy' element={<Privacy />} />
        <Route path='/booking-details' element={<BookingDetails />} />
        <Route path='/payment-page' element={<PaymentComponent />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/downloadTicket" element={<DownloadTicketPage />} />
        <Route path="/downloadHotelTicket" element={<HotelticketDownload />} />
        <Route path="/hotelticket" element={<HotelTicket />} />
        <Route path="/paymentStatus/:id" element={<PaymentSuccess />} />
        <Route path="/hotelpaymentsuccess/:id" element={<HotelPaymentSuccess />} />
        <Route path="/insurancepaymentsuccess/:id" element={<InsurancePaymentSuccess />} />
        <Route path="/admin" element={<AdminMain />} />
        <Route path="/hotel-bookingDetails" element={<HotelBookingDetailsModern />} />
        <Route path="/insurance-details" element={<InsuranceBooking />} />
        <Route path="/hotel-paymentPage" element={<HotelPaymentPage />} />
        <Route path="/insurance-paymentPage" element={<InsurancePaymentPage />} />
        <Route path="/review" element={<ReviewsList />} />
        <Route path="/insurance" element={<InsurancePage />} />
      </Routes>

    </div>
  );
}

export default App;

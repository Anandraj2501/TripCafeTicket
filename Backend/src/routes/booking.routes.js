import { Router } from "express";
import { getBookingData, updateBookingData, getBookingDataById, getHotelBookingDataById, getHotelBookingData, updateHotelBookingData,getStats, searchBookingData, searchHotelData, updateBookingDetailsData, searchHotel,getInsuranceBookingDataById,getInsuranceBookingData} from "../controllers/booking.controller.js";
import  { verifyJWT }  from "../middlewares/admin.middleware.js";

const router = Router();

router.route("/").get(verifyJWT,getBookingData);
router.route("/hotel").get(verifyJWT,getHotelBookingData);
router.route("/insurance").get(verifyJWT,getInsuranceBookingData);
router.route("/getStats").get(verifyJWT,getStats);
router.route("/searchBooking").get(verifyJWT,searchBookingData);
router.route("/searchHotelData").get(verifyJWT,searchHotelData);
router.route("/getbookingdatabyid/:id").get(getBookingDataById);
router.route("/getinsurancebookingdatabyid/:id").get(getInsuranceBookingDataById);

router.route("/getSuccessBookingDataById/:id").get(getBookingDataById);
router.route("/searchHotel").get(searchHotel);

router.route("/gethotelbookingdatabyid/:id").get(getHotelBookingDataById);
router.route("/updateBookingData/:bookingId/passenger/:passengerId").put(verifyJWT,updateBookingData);
router.route("/updateBookingDetailsData/:bookingId").put(verifyJWT,updateBookingDetailsData);

router.route("/updateHotelBookingData/:bookingId/passenger/:passengerId").put(verifyJWT,updateHotelBookingData);


export default router;
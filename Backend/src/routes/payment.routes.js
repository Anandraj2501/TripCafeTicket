import { Router } from "express";
import express from "express";
import {  paymentFailed, paymentSuccess, hotelpaymentSuccess, hotelpaymentFailed, initiateRazorpayHotelPayment, verifyRazorpayPayment, initializeRazorpayFlightPayment, verifyFlightrazorpayPayment,initiateInsurancePayment,verifyRazorpayPaymentForInsurance } from "../controllers/payment.controller.js";
const router = Router();


router.route("/hotelrazorpay").post(initiateRazorpayHotelPayment);
router.route("/flightrazorpay").post(initializeRazorpayFlightPayment);
router.route("/insurancerazorpay").post(initiateInsurancePayment);


router.route("/success").post(paymentSuccess);
router.route("/verifyRazorpayPayment/:id").post(verifyRazorpayPayment);
router.route("/verifyflightPayment/:id").post(verifyFlightrazorpayPayment);
router.route("/verifyInsurancePayment/:id").post(verifyRazorpayPaymentForInsurance);


router.route("/hotelpaymentSuccess").post(hotelpaymentSuccess);
router.route("/failed").post(paymentFailed);
router.route("/hotelpaymentFailed").post(hotelpaymentFailed);




export default router;
import { Router } from "express";
import { login, signup, submitReview, getReview } from "../controllers/user.controller.js";
const router = Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/submitReview").post(submitReview);
router.route("/getReview").get(getReview);

export default router; 
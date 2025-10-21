import { Router } from "express";
import express from "express";
import { razorpayWebhookHandler } from "../controllers/webhooks.controller.js";
const router = Router();

router.post('/webhookFlight', express.raw({ type: 'application/json' }), razorpayWebhookHandler);

export default router;
// routes/orderRoutes.js
import express from "express";
import { handleStripeWebhook } from "../controllers/webHookController.js";
import { postOrder } from "../controllers/orderController.js";

const router = express.Router();

router.post("/webhook", handleStripeWebhook);
router.post("/checkout", postOrder);

export default router;

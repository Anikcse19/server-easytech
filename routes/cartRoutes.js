// routes/productRoutes.js
import express from "express";
import { getCartItems } from "../controllers/cartController.js";

const router = express.Router();

router.post("/", getCartItems);

export default router;

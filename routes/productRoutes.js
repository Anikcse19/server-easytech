// routes/productRoutes.js
import express from "express";
import {
  getProducts,
  getProductById,
  createOrUpdateProduct,
  getProductsByCategory,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/category/:id", getProductsByCategory);
router.get("/:id", getProductById);
router.post("/", createOrUpdateProduct);

export default router;

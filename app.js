// app.js
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
// import userRoutes from "./routes/userRoutes.js";

// Allow requests from localhost:5173

dotenv.config();

const app = express();
app.use(express.json());

const uri = process.env.MONGODB_URI;
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST", // Allow only these methods
    credentials: true, // Allow credentials if needed
  })
);

// Route middleware
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/user", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
// app.use("/api/users", userRoutes);

export default app;

import dotenv from "dotenv";
dotenv.config(); 

import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";
import authRouter from "./router/authRouter.js";
import categoryRoute from "./router/categoryRoute.js";
import subCategoryRoute from "./router/subCategoryRoute.js";
import productRoute from "./router/productRoute.js";



const app = express();

connectDB();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/category", categoryRoute);
app.use("/api/subcategory", subCategoryRoute);
app.use("/api/products", productRoute);


const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

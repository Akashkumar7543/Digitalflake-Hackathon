import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import authRouter from "./router/authRouter.js";


dotenv.config();
connectDB(); //DB

const app = express();
app.use(cors({
    origin: "http://localhost:3000", 
    credentials: true
}));



app.use(express.json()); //gobal middleware

app.use("/api/auth", authRouter);

const port = process.env.PORT || 6000
app.listen(port, () => {
    console.log(`Sever is running on port.....${port}`)
})
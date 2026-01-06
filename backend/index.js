import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import e from "express";
dotenv.config();

const app = express();

app.use(express.json()); //gobal middleware

connectDB(); //DB

const port = process.env.PORT || 6000
app.listen(port, () => {
    console.log(`Sever is running on port.....${port}`)
})
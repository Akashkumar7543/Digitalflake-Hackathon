import mongoose from "mongoose";

const connectDB = async() =>{
     try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Database Connected Sussfully.")
     } catch (error) {
        console.error("MongoDB connection failed")
        console.error(error.message);
        process.exit(1);
     }
}

export default connectDB
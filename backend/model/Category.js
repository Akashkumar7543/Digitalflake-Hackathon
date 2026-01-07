import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    categoryId: {
        type: Number,
        unique: true,
      },
    name:{
        type: String,
        required: true,
        trime: true,
    },
    image: {
        url: String,
        public_id: String,
      },
    status:{
        type: String,
        enum: ["Active", "Inactive"],
        default: "Active"
    },
},
{timestamps: true});

export default mongoose.model("Category", categorySchema);
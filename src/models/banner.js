import mongoose, { Schema } from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;
const bannerSchema = new mongoose.Schema({
    img: {
        type: String,
        required: true,
    },
}, { timestamps: true });

export default mongoose.model("banner", bannerSchema);
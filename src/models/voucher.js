import mongoose, { Schema } from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;
const voucherSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    status: {
        type: Number,
        required: true,
    },
    timeStart: {
        type: Date,
        required: true,
    },
    timeEnd: {
        type: Date,
        required: true,
    }
}, { timestamps: true });

export default mongoose.model("voucher", voucherSchema);
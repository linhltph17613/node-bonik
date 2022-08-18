import mongoose, { Schema } from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;

const invoiceSchema = new Schema({
    fullname: {
        type: String,
        minLength: 1,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    status: {
        type: Number,
        default: 0
    },
    note: {
        type: String,
    },
    userId: {
        type: ObjectId,
        ref: 'Auth'
    }

}, { timestamps: true });

export default mongoose.model('Invoice', invoiceSchema);
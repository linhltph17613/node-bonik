import mongoose, { Schema } from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;

const invoiceDetailSchema = new Schema({
    name: {
        type: String,
        minLength: 5,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    size: {
        type: String,
        required: true
    },
    regularPrice: {
        type: Number,
        required: true
    },
    salePrice: {
        type: Number,
    },
    quantity: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    invoiceId: {
        type: ObjectId,
        ref: 'Invoice'
    },

}, { timestamps: true });

export default mongoose.model('InvoiceDetail', invoiceDetailSchema);
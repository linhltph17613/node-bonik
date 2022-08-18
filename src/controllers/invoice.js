import Invoice from "../models/invoice";
import InvoiceDetail from "../models/invoiceDetail";

export const list = async (req, res) => {
    try {
        const invoice = await Invoice.find({}).sort({ 'createdAt': -1 }).exec();
        res.json(invoice);
    } catch (error) {
        res.status(400).json({
            msg: "Can't found invoice!"
        })
    }
}
export const create = async (req, res) => {
    console.log(req.body)
    try {
        const invoice = await new Invoice(req.body).save();
        res.json(invoice);
    } catch (err) {
        console.log("err", err);
        res.status(400).json({
            msg: "Can't add invoice!"
        })
    }
}
export const get = async (req, res) => {
    try {
        const invoice = await Invoice.findOne({ _id: req.params.id }).exec();
        res.json(invoice);
    } catch (err) {
        console.log(err);
        res.status(400).json({
            msg: "Can't found invoice!"
        })
    }
}
export const read = async (req, res) => {
    const condition = { _id: req.params.id }
    try {
        const invoice = await Invoice.findOne(condition).exec();
        // neu trung ten thi khong can viet: categoryPro: category._id
        const invoiceDetails = await InvoiceDetail.find({ invoiceId: invoice._id }).exec();
        res.json({ invoice, invoiceDetails });
    } catch (error) {
        res.status(400).json({
            msg: "Can't found invoice and invoice details!"
        })
    }
}
export const remove = async (req, res) => {
    try {
        const invoice = await Invoice.findOneAndDelete({ _id: req.params.id });
        res.json(invoice);
    } catch (err) {
        res.status(400).json({
            msg: "Can't remove invoice!"
        })
    }
}
export const update = async (req, res) => {
    const condition = { _id: req.params.id }
    const update = req.body;
    try {
        const invoice = await Invoice.findOneAndUpdate(condition, update).exec();
        res.json(invoice);
    } catch (err) {
        res.status(400).json({
            msg: "Can't update invoice!"
        })
    }
}

import InvoiceDetail from "../models/invoiceDetail";

export const list = async (req, res) => {
    try {
        const invoiceDetail = await InvoiceDetail.find().populate('invoiceId');
        res.json(invoiceDetail);
    } catch (error) {
        console.log(error);

        return res.status(400).json({
            status: false,
            msg: "Can't found invoice detail!"
        })
    }
}
export const create = async (req, res) => {
    console.log(req.body)
    try {
        const invoiceDetail = await new InvoiceDetail(req.body).save();
        res.json(invoiceDetail);
    } catch (err) {
        console.log(err);
        res.status(400).json({
            msg: "Can't add invoice detail!"
        })
    }
}
export const get = async (req, res) => {
    try {
        const invoiceDetail = await InvoiceDetail.findOne({ _id: req.params.id }).select("-__v").populate("invoiceId").exec();
        res.json(invoiceDetail);
    } catch (err) {
        console.log(err);
        res.status(400).json({
            msg: "Can't found invoice detail!"
        })
    }
}
export const remove = async (req, res) => {
    try {
        const invoiceDetail = await InvoiceDetail.findOneAndDelete({ _id: req.params.id });
        res.json(invoiceDetail);
    } catch (err) {
        res.status(400).json({
            msg: "Can't remove invoice detail!"
        })
    }
}
export const update = async (req, res) => {
    const condition = { _id: req.params.id }
    const update = req.body;
    try {
        const invoiceDetail = await InvoiceDetail.findOneAndUpdate(condition, update).exec();
        res.json(invoiceDetail);
    } catch (err) {
        res.status(400).json({
            msg: "Can't update invoice detail!"
        })
    }
}

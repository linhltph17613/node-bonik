import Voucher from "../models/voucher";
export const list = async(req, res) => {
    try {
        const ListVoucher = await Voucher.find().sort({ 'createdAt': -1 });
        res.json(ListVoucher);
    } catch (error) {
        res.status(400).json({
            msg: "Can't found voucher!"
        });
    }
};
// thêm Voucher
export const post = async(req, res) => {
    try {
        const voucher = await new Voucher(req.body).save();
        res.json(voucher);
    } catch (error) {
        res.status(400).json({
            msg: "Can't add voucher!"
        });
    }
};

//update
export const update = async(req, res) => {
    try {
        const UpdateVoucher = await Voucher.findByIdAndUpdate(
            req.params.id,
            req.body
        );
        res.json(UpdateVoucher);
    } catch (error) {
        res.status(400).json({
            msg: "Can't update voucher!"
        });
    }
};

// xoa
export const remove = async(req, res) => {
    try {
        const removeVoucher = await Voucher.findByIdAndDelete(req.params.id);
        res.json(removeVoucher);
    } catch (error) {
        res.status(400).json({
            msg: "Can't remove voucher!"
        });
    }
};
//
export const read = async(req, res) => {
    try {
        const readVoucher = await Voucher.findById(req.params.id);
        res.json(readVoucher);
    } catch (error) {
        res.status(400).json({
            msg: "Can't found voucher!"
        });
    }
};
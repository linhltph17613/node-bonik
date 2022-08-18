import Product from "../models/product";

export const list = async (req, res) => {
    try {
        const products = await Product.find().populate('category').sort({ 'createdAt': -1 });
        res.json(products);
    } catch (error) {
        return res.status(400).json({
            status: false,
            msg: "Can't found product!"
        })
    }
}
export const create = async (req, res) => {
    console.log(req.body)
    try {
        const product = await new Product(req.body).save();
        res.json(product);
    } catch (err) {
        console.log(err);
        res.status(400).json({
            msg: "Can't add product!"

        })
    }
}
export const get = async (req, res) => {
    try {
        const product = await Product.findOne({ _id: req.params.id }).populate('category').exec();
        res.json(product);
    } catch (err) {
        console.log(err);
        res.status(400).json({
            msg: "Can't found product!"

        })
    }
}
export const remove = async (req, res) => {
    try {
        const product = await Product.findOneAndDelete({_id: req.params.id});
        res.json(product);
    } catch (err) {
        res.status(400).json({
            msg: "Can't remove product!"

        })
    }
}
export const update = async (req, res) => {
    const condition = { _id: req.params.id }
    const update = req.body;
    try {
        const product = await Product.findOneAndUpdate(condition, update).exec();
        res.json(product);
    } catch (err) {
        res.status(400).json({
            msg: "Can't update product!"

        })
    }
}

export const search = async (req, res) => {
    try {
        const searchField = req.query.name;
        const product = await Product.find({ name: { $regex: searchField, $options: '$i' } }).sort({ 'createdAt': -1 })
        if (searchField == "") {
            res.json("")
        } else {
            res.json(product)
        }
    } catch (error) {
        res.status(400).json(
            { msg: "Khong tim thay san pham" }
        )
    }
}

export const page = async (req, res) => {
    try {
        const page = req.query.page * 1 || 1;
        const limit = req.query.limit * 1 || 5;
        const skip = limit * (page - 1)
        const sort = req.query.sort || {'createdAt': -1}
        const product = await Product.find().limit(limit).skip(skip).sort(sort)
        res.json(product)
    } catch (error) {
        res.status(400).json(
            { error: "Khong tim thay san pham" }
        )
    }
}
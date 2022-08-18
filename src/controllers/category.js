import Category from "../models/category"
import Product from "../models/product";

export const list = async(req, res) => {
    try {
        const ListCategory = await Category.find().sort({ 'createdAt': -1 });
        res.json(ListCategory)
    } catch (error) {
        res.status(400).json({
            message: "Can't found category",
        });
    }
}

// thêm category
export const post = async(req, res) => {
        try {
            const category = await new Category(req.body).save();
            res.json(category);
        } catch (error) {
            res.status(400).json({
                message: "Can't add category"
            })
        }

    }
    //update 
export const update = async(req, res) => {
        try {
            const UpdateCategory = await Category.findByIdAndUpdate(req.params.id, req.body)
            res.json(UpdateCategory);
        } catch (error) {
            res.status(400).json({
                message: "Can't update category"
            })
        }

    }
    //
export const get = async(req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        res.json(category);
    } catch (error) {
        res.status(400).json({
            message: "Can't found category"
        })
    }

}
export const read = async (req, res) => {
    const condition = { _id: req.params.id }
    try {
        const category = await Category.findOne(condition).exec();
        const products = await Product.find({ category: category._id }).select('-category').exec();
        res.json({ category, products });
    } catch (error) {
        res.status(400).json({
            msg: "No products found in this category!"
        })
    }
}
export const remove = async(req, res) => {
    try {
        const removeCategory = await Category.findByIdAndDelete(req.params.id)
        res.json(removeCategory);
    } catch (error) {
        res.status(400).json({
            message: "Can't found category"
        })
    }

}
export const relatedProduct = async (req, res) => {
    const idPro = req.params.idPro
    const condition = { _id: req.params.id }
    try {
        const category = await Category.findOne(condition).exec();
        console.log(category._id);
        const products = await Product.find({ category: category._id }).select('-categoryPro').sort({ 'createdAt': -1 }).exec();
        console.log(products);
        const relatedProduct = products.filter((item) => item._id != idPro)
        res.json({ category, relatedProduct });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: "Can't found product related!"
        })
    }
}
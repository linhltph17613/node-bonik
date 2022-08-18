import Auth from "../models/user";
import Invoice from "../models/invoice";

export const list = async (req, res) => {
    try {
        const users = await Auth.find({}).sort({ 'createdAt': -1 }).exec();
        res.json(users);
    } catch (error) {
        res.status(400).json({
            msg: "Can't found user!"
        })
    }
}

export const userById = async (req, res, next, id) => {
    try {
        const user = await Auth.findById(id).exec();
         if(!user){
            res.status(400).json({
                msg: "Can't found user!"
            })
        }
        req.profile = user;
        req.profile.password = undefined;
        next();

    } catch (error) {
        res.status(400).json({
            msg: "Can't found user!"
        })
    }
}

export const get = async (req, res) => {
    try {
        const userInfo = await Auth.findOne({ _id: req.params.id }).exec();
        res.json(userInfo);
    } catch (err) {
        console.log(err);
        res.status(400).json({
            msg: "This user does not exist!"
        })
    }
    
}

export const read = async (req, res) => {
    const condition = { _id: req.params.id }
    try {
        const user = await Auth.findOne(condition).exec();
        const invoices = await Invoice.find({ userId: user._id }).exec();
        res.json({ user, invoices });
    } catch (error) {
        res.status(400).json({
            msg: "This person's invoice could not be found!"
        })
    }
}

export const update = async (req, res) => {
    const condition = { _id: req.params.id }
    const update = req.body;
    try {
        const user = await Auth.findOneAndUpdate(condition, update).exec();
        res.json({
            user: {
                _id: user._id,
                email: user.email,
                name: user.name,
            }
        });
    } catch (err) {
        res.status(400).json({
            msg: "Can't update user!"
        })
    }
}


import Auth from "../models/user";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    const {email, name, password} = req.body;
    try {
        const existUser = await Auth.findOne({email}).exec()
        if(existUser) {
            return res.status(400).json({
                msg: "This email is already in use, please use another email"
            })
        }
        
        const user = await new Auth({email, name, password}).save();

        res.json({
            user: {
                _id: user._id,
                email: user.email,
                name: user.name,
            }
        });
    } catch (error) {
        console.log("error", error);
        res.status(400).json({
            msg: "Can't sign up for an account"
        })
    }
}

export const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await Auth.findOne({email}).exec();

        if(!user) {
            return res.status(400).json({
                msg: "Account does not exist"
            })
        }
        if (!user.authenticate(password) || !user) {
            return res.status(400).json({
                msg: "Your password is incorrect"
            })
        }
        const token = jwt.sign({_id: user._id}, "abc" );
        
        res.json({
            token,
            user: {
                _id: user._id,
                email: user.email,
                name: user.name,
                role: user.role,
                status: user.status
            }
        })
       
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: "Fail to login"
        })
    }
}



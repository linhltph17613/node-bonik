import mongoose, { Schema } from  "mongoose";
import {createHmac} from "crypto";
import {v4 as uuidv4} from "uuid";

const authSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
    },
    status: {
        type: Number,
        default: 0
    },
    salt: {
        type: String
    },
    about: {
        type: String,
        trim: true,
    },
    role: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

// di voi kieu phuong thuc khong dung duoc arrow function
authSchema.pre("save", function(next){
    this.salt = uuidv4()
    this.password = this.encryptPassword(this.password)
    next();
});
authSchema.methods = {
    // ma hoa password nhap voi password da ma hoa trong db
    authenticate(password){
        //password trong db             password tu input
        return this.password === this.encryptPassword(password)
    },

    //ma hoa password
    encryptPassword(password) {
        if(!password) return
        try {
            // password tu input, chuyen thanh he hex
            return createHmac("sha256", this.salt).update(password).digest("hex")
        } catch (error) {
            console.log(error)
        }
    }
}

export default mongoose.model('Auth', authSchema);
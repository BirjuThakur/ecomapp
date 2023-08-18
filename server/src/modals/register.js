const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//creating schema for register 
const registerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name must be provide"]
    },
    email: {
        type: String,
        required: [true, "email must be provide"],
        unique: true
    },
    phoneNumber: {
        type: Number,
        required: [true, "number must be provide"]
    },
    companyName: {
        type: String,
        required: [true, "name must be provide"]
    },
    GST_Number: {
        type: String,
        required: [true, "GST Number must be provide"]
    },
    companyAddress: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    otp:{
        type:Number,
        default:null
    },
    token: {
        type: String
    }
}, {
    timestamps: true
});

//hasing password 
registerSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12)
    }
    next();
})

//generating token 
registerSchema.methods.generateToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id.toString() }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        })
        this.token = token;
        console.log(token)
        await this.save();
        return token
    } catch (error) {
        console.log("getting error in token creation");
        return undefined;
    }
}
//create collection 
const Register = mongoose.model("Register", registerSchema);

module.exports = Register;
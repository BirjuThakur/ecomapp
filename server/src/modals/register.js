const mongoose = require("mongoose");

//creating schema for register 

const registerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"name must be provide"]
    },
    email:{
        type:String,
        required:[true,"email must be provide"],
        unique:true
    },
    phoneNumber:{
        type:Number,
        required:[true,"number must be provide"]
    },
    companyName:{
       type:String,
       required:[true,"name must be provide"]
    },
    GST_Number:{
        type:String,
        required:[true,"GST Number must be provide"]
    },
    companyAddress:{
        type:String,
    },
    password:{
        type:String,
        required:true
    },
    isVerified:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
});

//create collection 
const Register = mongoose.model("Register",registerSchema);

module.exports = Register;
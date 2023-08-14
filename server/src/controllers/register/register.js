const Register = require("../../modals/register");

//create register 
const createRegister = async(req,res) =>{
    try {
        const {name,email,phoneNumber,companyName,GST_Number,password} = req.body;
        const registerUser = new Register({
            name,email,phoneNumber,companyName,GST_Number,password
        });
        const user = await registerUser.save();
        res.status(201).send({
            success:true,
            message:"user register successfully",
            user
        })
    } catch (error) {
        res.status(400).send({
            success:false,
            message:"user register error",
            error
        })
    }
}

//get all register 
const getRegisterData =async(req,res)=>{
    try {
        const getData = await Register.find();
        res.status(201).send({
            success:true,
            message:"user register data",
            getData
        })
    } catch (error) {
        res.status(400).send({
            success:false,
            message:"user register error",
            error
        })
    }
}

//get single regiter data 
const getSingleRegisterData = async(req,res) =>{
    try {
        const {userid} = req.params;
        const singleData = await Register.findById(userid);
        res.status(201).send({
            success:true,
            message:"getting single register data",
            singleData
        })
    } catch (error) {
        res.status(400).send({
            success:false,
            message:"user register error",
            error
        })
    }
}

//update single register 
const updateRegisterData = async(req,res) =>{
    try {
       const {userid} = req.params; 
       const {name,email,phoneNumber,companyName,GST_Number} = req.body;
       const updating =await Register.findByIdAndUpdate(userid,
        {name,email,phoneNumber,companyName,GST_Number});
        res.status(201).send({
            success:true,
            message:"update single register data",
            updating
        })
    } catch (error) {
        res.status(400).send({
            success:false,
            message:"update user register error",
            error
        })
    }
}

const deleteRegisterData = async(req,res) =>{
    try {
        const {userid} = req.params;
        const deleteData = await Register.findByIdAndDelete(userid);
        res.status(201).send({
            success:true,
            message:"delete single register data",
            deleteData
        })
    } catch (error) {
        res.status(400).send({
            success:false,
            message:"delete user register error",
            error
        })
    }
}

module.exports = {createRegister,getRegisterData,getSingleRegisterData,updateRegisterData,deleteRegisterData}
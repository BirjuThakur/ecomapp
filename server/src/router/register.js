const express = require("express");
const registerRouter = express.Router();
const { createRegister, getRegisterData, getSingleRegisterData, updateRegisterData, deleteRegisterData } = require("../controllers/register/register");
const verifyUser = require("../controllers/register/registerUserVerify");
const userLogin = require("../controllers/register/login");
const userLogOut = require("../controllers/register/logout");
const forgotPassword = require("../controllers/register/forgotPass");
const resetPassword = require("../controllers/register/resetPass");
const jwtAuth = require("../controllers/authanticate/jwtAuth");
const adminAuth = require("../controllers/authanticate/adminAuth");


registerRouter.get("/",(req,res)=>{
    res.send("welcome to register router")
})

//create register data 
registerRouter.post("/register",createRegister);

//verify register user 
registerRouter.get("/register/:id/verify/:token",verifyUser);

//get register data 
registerRouter.get("/register",getRegisterData);

//get single register data
registerRouter.get("/register/:userid",getSingleRegisterData);

//update register data
registerRouter.put("/register/:userid",updateRegisterData);

//delete register data
registerRouter.delete("/register/:userid",deleteRegisterData);

//login user
registerRouter.post("/login",userLogin);

//logout user
registerRouter.get("/logout",jwtAuth,userLogOut);

//forgot password for send otp
registerRouter.post("/fogotpassword",forgotPassword);

//reset password 
registerRouter.post("/resetpassword",resetPassword);

module.exports = registerRouter;
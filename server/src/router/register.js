const express = require("express");
const { createRegister, getRegisterData, getSingleRegisterData, updateRegisterData, deleteRegisterData } = require("../controllers/register/register");
const registerRouter = express.Router();

registerRouter.get("/",(req,res)=>{
    res.send("welcome to register router")
})

//create register data 
registerRouter.post("/register",createRegister);

//get register data 
registerRouter.get("/register",getRegisterData);

//get single register data
registerRouter.get("/register/:userid",getSingleRegisterData);

//update register data
registerRouter.put("/register/:userid",updateRegisterData);

//delete register data
registerRouter.delete("/register/:userid",deleteRegisterData);

module.exports = registerRouter;
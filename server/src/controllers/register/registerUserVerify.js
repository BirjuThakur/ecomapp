const Register = require("../../modals/register");
const jwt = require("jsonwebtoken");

const verifyUser = async (req,res) =>{
    try {
        const {id,token} = req.params;
        const verify = await Register.findById(id);
        jwt.verify(token, process.env.JWT_SECRET,{
            expiresIn:"1h"
        }, (error,decode) =>{
            if(error){
                return res.status(400).send({
                    success:false,
                    message:"Invalid token for this user."
                });
            }
            if(decode._id !==verify._id.toString()){
                return res.status(500).send({
                    success:false,
                    message:"Invalid token for this user."
                })
            }
            verify.isVerified = true;
            verify.token= undefined;
            verify.save();
            res.status(201).send({
                success:true,
                message:"user verified successfully"
            })
        });
    } catch (error) {
        console.log("getting error in verification user",error);
        res.status(400).send({
            success:false,
            message:"user register verification error",
            error
        })
    }
}

module.exports = verifyUser;
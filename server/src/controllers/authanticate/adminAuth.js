const jwt = require("jsonwebtoken");
const Register = require("../../modals/register");

const adminAuth = async(req,res,next) =>{
try {
    const token = req.cookies.jwt;
    if(!token){
        return res.status(401).send({
            success:false,
            message:"user token not getting"
        })
    };
const decoded = jwt.verify(token,process.env.JWT_SECRET);
if(!decoded || !decoded._id){
    return res.status(500).send({
        success:false,
        message:"invalid token"
    })
}
const user = await Register.findById(decoded._id);
if(!user.isAdmin){
    return res.status(401).send({
        success:false,
        message:"admin not verified"
    })
}
next();
} catch (error) {
    res.status(400).send({
        success: false,
        message: "user not verify with token",
        error
    })
}
}


module.exports = adminAuth;
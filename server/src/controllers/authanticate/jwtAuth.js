const jwt = require("jsonwebtoken");
const Register = require("../../modals/register");

const jwtAuth = async (req,res,next) =>{
    try {
        const token = req.cookies.jwt;
        //verifying user
        const verifyUser = jwt.verify(token,process.env.JWT_SECRET);
        const user = await Register.findById({_id:verifyUser._id.toString()},token);
        if (!user) {
            return res.status(400).send({
                success: false,
                message: "user not found",
            })
        };
        req.user = user;
        next();
    } catch (error) {
        res.status(400).send({
            success: false,
            message: "user not verify with token",
            error
        })
    }
}

module.exports = jwtAuth;
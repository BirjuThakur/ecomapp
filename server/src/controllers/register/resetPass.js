const Register = require("../../modals/register");

const resetPassword = async (req,res) =>{
    try {
        const {email,otp,newPass} = req.body;
        const user = await Register.findOne({email});
        if (!user) {
            return res.status(500).send({
                success: false,
                message: "user not registered"
            })
        };
        // Check if the provided OTP matches the OTP stored in the user document
        if(user.otp && user.otp.toString() !== otp.toString()){
            return res.status(401).send({
                success:false,
                message:"invalid otp"
            })
        }

        //reset otp 
        user.otp = null ;
        user.password = newPass;
        await user.save();
        res.status(201).send({
            success:true,
            message:"user password change successfully"
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "user not registered",
            error
        })
    }
}

module.exports = resetPassword;
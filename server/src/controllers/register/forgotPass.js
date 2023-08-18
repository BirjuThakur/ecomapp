const forgotOtp = require("../nodemailer/forgotPassward");
const Register = require("../../modals/register");

//generate otp 
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000)
}
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await Register.findOne({ email });
        if (!user) {
            return res.status(500).send({
                success: false,
                message: "user not registered"
            })
        };
        const otp = generateOTP();
        //to save otp 
        user.otp = otp;
        await user.save();
        // send otp via mail 
        const emailText = `${otp}`;
        await forgotOtp(email, emailText);
        res.status(200).send({
            success: true,
            message: "otp send on your mail, please check your mail"
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "user not registered",
            error
        })
    }
}

module.exports = forgotPassword;
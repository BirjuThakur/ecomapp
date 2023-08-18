const Register = require("../../modals/register");
const bcrypt = require("bcrypt");

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await Register.findOne({ email });
        if (!user) {
            return res.status(400).send({
                success: false,
                message: "user not registerd, please register",
            })
        };
        if (!user.isVerified) {
            return res.status(400).send({
                success: false,
                message: "User email not verified",
            })
        };

        const IsMatch = await bcrypt.compare(password, user.password);
        if (IsMatch) {
            if (user.isAdmin) {
                const token = await user.generateToken();
                //cookie store
                res.cookie("jwt", token);
                res.status(201).send({
                    success: true,
                    message: "admin login successfully",
                    token: token,
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                    companyName: user.companyName,
                    GST_Number: user.GST_Number
                })
            } else {
                const token = await user.generateToken();
                //cookie store
                res.cookie("jwt", token);
                res.status(201).send({
                    success: true,
                    message: "user login successfully",
                    token: token,
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                    companyName: user.companyName,
                    GST_Number: user.GST_Number
                })
            };
        } else {
            res.status(400).send({
                success: false,
                message: "please enter correct all credential"
            })
        }
    } catch (error) {
        console.log("getting error in login " + error);
        res.status(400).send({
            success: false,
            message: "user not registerd, please register",
            error
        })
    }
}

module.exports = userLogin;
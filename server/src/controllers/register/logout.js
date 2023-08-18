const Register = require("../../modals/register");


const userLogOut = async (req, res) => {
    try {
        if (req.cookies.jwt) {
            const token = req.cookies.jwt;
            // Clear the cookie
            res.clearCookie("jwt");

            const user = await Register.findOne({ token });
                user.token = null;
                await user.save();
                res.status(200).send({
                    success: true,
                    message: "user logout successfully"
                })
        } else {
               res.status(401).send({
                success: false,
                message: "already user logout"
            })
        }
    } catch (error) {
        res.status(400).send({
            success: false,
            message: "user not registerd, please register",
            error
        })
    }
}

module.exports = userLogOut;
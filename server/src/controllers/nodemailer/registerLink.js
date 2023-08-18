const nodemailer  = require("nodemailer");

const RegisterLink = async(email,token,userId) =>{
    try {
        const  transport = nodemailer.createTransport({
            service:"gmail",
            secure:true,
            auth:{
                user:process.env.EMAIL,
                pass:process.env.EMAIL_SECRET
            }
        });

        let details = mailDetails = {
            from:process.env.EMAIL,
            to:email,
            subject:"register verification link",
            html:`<h1> Click the link to verify your email:</h1>
            <a href="http://127.0.0.1:5000/user/register/${userId}/verify/${token}">Verify Email</a>`
        }

        await transport.sendMail(details,(err)=>{
            console.log("Verification email sent successfully.");
            if(err){
                console.error('Error sending email:', err);
            }else{
                console.log(transport.sendMail(details))
            }
        })
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

module.exports = RegisterLink;
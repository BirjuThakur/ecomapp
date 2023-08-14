const mongoose = require("mongoose");

const URI = process.env.DBCONNECT;

const connectDB = () =>{
    mongoose.connect(URI).then(()=>console.log("connection successfully"))
    .catch(()=>console.log("connection dismiss"))
}

module.exports = connectDB;

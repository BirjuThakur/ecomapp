const mongoose = require("mongoose");

// const URI = process.env.DBCONNECT;
   const URI = "mongodb://127.0.0.1:27017/newecomapp";

const connectDB = () =>{
    mongoose.connect(URI).then(()=>console.log("connection successfully"))
    .catch(()=>console.log("connection dismiss"))
}

module.exports = connectDB;

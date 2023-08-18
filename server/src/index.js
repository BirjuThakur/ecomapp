require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000 ;
const cors = require("cors");
const connectDB = require("./db/connection");
const registerRouter = require("./router/register");
const cookieParser = require('cookie-parser');

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use("/user",registerRouter);

app.get("/",(req,res)=>{
    res.send("welcome to my programming")
})

app.listen(port, ()=>{
    connectDB();
    console.log(`running on ${port}`)
})
require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000 ;
const connectDB = require("./db/connection");
const registerRouter = require("./router/register");

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use("/user",registerRouter);

app.get("/",(req,res)=>{
    res.send("welcome to my programming")
})

app.listen(PORT, ()=>{
    connectDB();
    console.log(`running on ${PORT}`)
})
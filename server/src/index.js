require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000 ;


app.get("/",(req,res)=>{
    res.send("welcome to my programming")
})

app.listen(PORT, ()=>{
    console.log(`running on ${PORT}`)
})
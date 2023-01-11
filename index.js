const express = require("express")
const mongoose=require('mongoose')
const dotenv = require('dotenv')
const app = express();

dotenv.config()

mongoose.connect(process.env.MONGO_URL, () =>{ console.log('connected to mongo ')})
app.get("/",(req,res)=> {
    res.status(200).send("hello from server")
})
const port= process.env.PORT||5000;
app.listen(port, ()=>{
    console.log(`app running on port ${port}..`)
})
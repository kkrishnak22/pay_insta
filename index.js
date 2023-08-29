//  index.js

const express = require("express")
const path = require("path")
const cors = require("cors");
const mongoose= require("mongoose");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const verifyJwt = require("./middleware/verifyJwt")
require('dotenv').config();
const userModel = require("./models/user")
const authRoutes = require('./routes/authRoutes');

const app = express();

const PORT = 5000


app.use(express.json())
app.use(cors())
mongoose.connect("mongodb://127.0.0.1:27017/test1")


app.use('/auth', authRoutes); 



// app.post("/signup",verifyJwt,(req,res)=>{
//     userModel.create(req.body)
//         .then(user=> res.json(user))
//         .catch(err=>res.json(err))
// })
// app.post("/login",(req,res)=>{
//     const {email, password} = req.body ;
//     userModel.findOne({email:email})
//         .then(user =>{
//             if(user){
//                 if(user.password === password){

//                     const accessToken = jwt.sign(
//                         {   
//                             "username": user.email
//                         },
//                         process.env.ACCESS_TOKEN_SECRET,
//                         {expiresIn:'30s'}
//                     )
//                     const refreshToken = jwt.sign(
//                         {   
//                             "username": user.email
//                         },
//                         process.env.ACCESS_TOKEN_SECRET,
//                         {expiresIn:'1d'}
//                     )
//                     res.cookie('jwt',refreshToken,{
//                         httpOnly:true,
//                         maxAge:24 * 60 *60 * 1000
//                     })
//                     res.json({
//                         token: accessToken
//                     })
//                 } else{
//                     res.json("pass incorrect")
//                 }
//             }
//         })
// })

app.listen(PORT,()=>{
    console.log("server started at port",PORT)
})

module.exports = {app}
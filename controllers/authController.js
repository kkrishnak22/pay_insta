const asyncHandler = require("express-async-handler")

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');
require('dotenv').config();

exports.signup = asyncHandler( async (req, res) => {
    const {name,email ,password,mobileNumber} = req.body
    console.log(name,email,password)
    const isUserPresent = await userModel.findOne({email:req.body.email})
    if(isUserPresent) return res.json({masg:"User exists please login"})
    const pass = await bcrypt.hash(password,10);
    console.log(pass)
   await userModel.create({
        name,
        email,
        password:pass,
        mobileNumber
    })
        .then(user => res.json(user))
        .catch(err => res.json(err));
});

 exports.login = asyncHandler(async (req,res)=>{
    const {email, password} = req.body ;
    console.log(email,password)
    const user = await userModel.findOne({email})
    console.log("user is",user)
    const doesPassMatch =await (bcrypt.compare(password,user.password));
        if(user && doesPassMatch){
            console.log(doesPassMatch)
            const accessToken = jwt.sign(
                {   
                    "username": user.email
                },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn:'1d'}
            )
            const refreshToken = jwt.sign(
                {   
                    "username": user.email
                },
                process.env.REFRESH_TOKEN_SECRET,
                
            )
            res.cookie('jwt',refreshToken,{
                httpOnly:true,
                maxAge:24 * 60 *60 * 1000
            })
            res.json({
                token: accessToken,
                refreshToken:refreshToken
            })
        } else{
            res.json("pass incorrect")
        }
    
})




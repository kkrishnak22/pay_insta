
const asyncHandler = require("express-async-handler");
const userModel = require("../models/user");

exports.currentUser = asyncHandler(async (req,res)=>{
   const  username = req.user;
    
   const user = await userModel.findOne({email:username})
   if(!user) return res.json({msg:"User Not Found"})
    res.json({
        msg:"token validated",
        user
    })
})

const User=require('../models/userModel.js')
const bcrypt=require("bcryptjs")
const jwt=require('jsonwebtoken')
const dotenv=require('dotenv')

dotenv.config()

exports.checkUser=async (req,res)=>{
    try {
        const {username,password}=req.body
        const fetchedData=await User.findOne({$or: [{username:username},{email:username}]})
        console.log(fetchedData)
        if(!fetchedData)
            res.status(400).json({message:"User Doesn't Exist",errorStatus:0})
        else if(!await bcrypt.compare(password,fetchedData.password))
            res.status(400).json({message:"Invalid Password",errorStatus:1})
        const token=jwt.sign({id:fetchedData._id,username:fetchedData.username},process.env.JWT_KEY,{expiresIn:'1h'})
        res.status(200).json({message:`successfully logged in`,token:token})

        
    } catch (error) {
        console.log(error)
    }

}

exports.loadOnPageLoad=async (req,res)=>{
    try {
        const {id,username}=req.user
        const fetchedData=await User.findOne({_id:id})
        console.log(fetchedData)
        res.status(200).json({message:"data fetched for the loaded page",fetchedData})
        
    } catch (error) {
        console.log(error)
        
    }
}



const User=require('../models/userModel.js')
const Doctor=require('../models/doctorModel.js');
const { response } = require('express');
const fs=require('fs')

exports.checkAdmin=async (req,res)=>{
    try {
        const {username,password}=req.body
        const fetchedData = User.find({
            $and: [
              { $or: [{ username: username }, { email: username }] },
              { role: "4" }
            ]
          });
        if(!fetchedData){
            return res.status(404).json({message:"No user Exist"})
        }
        else if(fetchedData.password!=password){
            return res.status(401).json({message:"Not valid password"})
        }
        res.status(200).json({message:"Login successfull",adminData:fetchedData})
        
    } catch (error) {
        console.log(`error ${error}`)
    }
}

exports.approveDoctor=async (req,res)=>{
    try {
        const {doctorId}=req.body
        console.log(doctorId)
        // const fetchedApprovedStatus=await Doctor.find({_id:doctorId})
        const fetchedApprovedStatus=await Doctor.updateOne({_id:doctorId},{verificationStatus:"0"},{
            new:true
        })
        if(!fetchedApprovedStatus){
            return res.status(400).json({message:"User not found"})
        }
        console.log(fetchedApprovedStatus)
        res.status(200).json({message:"Approved Successfully"})

        
    } catch (error) {
        console.log(`error ${error}`)
    }
}

exports.rejectDoctor=async (req,res)=>{
    try {
        const {doctorId}=req.body
        const fetchedApprovedStatus=Doctor.updateOne({_id:doctorId},{verificationStatus:"3"},{
            new:true
        })
        if(!fetchedApprovedStatus){
            return res.status(400).json({message:"User not found"})
        }
        res.status(200).json({message:"Rejected Successfully"})

        
    } catch (error) {
        console.log(`error ${error}`)
    }
}


exports.getAllToBeApprovedDoctors=async (req,res)=>{
    try {
        const fetchedDoctors=await Doctor.find({verificationStatus:"1"})
        let profileImagePath,profileImageBuffer
        const profileImage={}
        for(doctor of fetchedDoctors){
            profileImagePath=doctor.profileImage
            profileImageBuffer=fs.readFileSync(profileImagePath)
            profileImage[doctor._id]=profileImageBuffer.toString('base64')
        }
        // console.log(profileImage)
        res.status(200).json({message:"Fetched Successfully",doctors:{details:fetchedDoctors,profileImage:profileImage}})
        
    } catch (error) {
        console.log(`error ${error}`)
    }
}
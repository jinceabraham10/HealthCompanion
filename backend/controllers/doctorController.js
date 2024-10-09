const { mongoose } = require("mongoose");
const Doctor = require("../models/doctorModel.js");
const { updateOne, base } = require("../models/userModel.js");
const fs=require('fs')
const path=require('path')

exports.submitForVerification = async (req, res) => {
  try {
    const toBeVerifiedData = req.body;
    toBeVerifiedData.status = 3;
    console.log(toBeVerifiedData);
    const resp = new Doctor(toBeVerifiedData);
    console.log(resp);
    res.status(200).json({ message: "submitted for verification" });
  } catch (error) {
    console.log(error);
  }
};

exports.getAllDoctors = async (req, res) => {
  try {
    const allDoctors = await Doctor.find({verificationStatus:"0"}).populate("userId");
    await console.log(allDoctors);
    if (allDoctors.length == 0) {
      return res.status(404).json({ message: `No Doctors Available` });
    }
    res
      .status(200)
      .json({ allDoctors: allDoctors, message: "success fetched all doctors" });
  } catch (error) {
    res.status(400).json({ message: `error ${error}` });
  }
};

exports.getDoctorDetails = async (req, res) => {
  try {
    const doctorDetails = await Doctor.findOne({ userId: req.body.userId });
    if(!doctorDetails){
      return res.status(400).json({message:"no doctor exist"})
    }
    console.log(doctorDetails);
    let profileImage="",profileImageBuffer,profileImagePath
    if(doctorDetails.profileImage){
      profileImagePath=doctorDetails.profileImage
      profileImageBuffer=fs.readFileSync(profileImagePath)
      profileImage=profileImageBuffer.toString('base64')

    }
    
    res
      .status(200)
      .json({ message: "fetched Successfully", doctorDetails:{doctorDetails,profileImage:profileImage }});
  } catch (error) {
    console.log(error)
  }
};

exports.createDoctor = async (doctorData) => {
  try {
    const { userId, createdAt } = doctorData;
    await console.log(`doctorData ${userId}`);
    const doctor = new Doctor({
      userId,
      createdAt,
      updatedAt: createdAt,
    });
    const fetchedData = await doctor.save();
    console.log(`fetched data from doctors ${fetchedData}`);
  } catch (error) {
    console.log(error);
  }
};

exports.submitVerificationData = async (req, res) => {
  try {

    console.log("File mimetype received:", req.files);
    if (!req.files) {
      return res.status(400).json({ message: "no files received" });
    }
    const {
      firstName,
      lastName,
      bloodGroup,
      height,
      specialization,
      gender,
      schoolTen,
      marksTen,
      schoolTwelth,
      marksTwelth,
      schoolMbbs,
      marksMbbs,
    } = req.body;
    const profileImage = req.files["profileImage"][0].path;
    const license = req.files["license"][0].path;
    const certificateTen = req.files["certificateTen"][0].path;
    const certificateMbbs = req.files["certificateMbbs"][0].path;
    const certificateTwelth = req.files["certificateTwelth"][0].path;
    const updatedData = await Doctor.updateOne(
      {userId:req.body._id},
      {
        firstName,
        lastName,
        bloodGroup,
        height,
        specialization,
        gender,
        marksTwelth,
        schoolMbbs,
        marksMbbs,
        profileImage,
        license,
        educationalDetails: {
          ten: {
            school:schoolTen,
            marks:marksTen,
            certificate:certificateTen
          },
          twelth: {
            school:schoolTwelth,
            marks:marksTwelth,
            certificate:certificateTwelth
          },
          mbbs: {
            school:schoolMbbs,
            marks:marksMbbs,
            certificate:certificateMbbs
          }
        },
        verificationStatus: 1
      },
      { new: true }
    );
    if (!updatedData) {
      return res.status(404).json({ message: "not found" });
    }
    res.status(200).json({ message: "successfull" });
  } catch (error) {
    console.log(error);
  }
};





const { mongoose } = require("mongoose");
const Doctor = require("../models/doctorModel.js");
const { updateOne, base, populate } = require("../models/userModel.js");
const fs = require("fs");
const path = require("path");
const Slot = require("../models/slotModel.js");
const Review = require("../models/reviewModel.js");
const { match } = require("assert");

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
    const allDoctors = await Doctor.find({ verificationStatus: "0",status:"0" }).populate(
      "userId"
    );
    if (allDoctors.length == 0) {
      return res.status(404).json({ message: `No Doctors Available` });
    }
    let profileImageBuffer, profileImagePath, profileImage;
    const updated = allDoctors.map((doctor) => {
      const plainDoctor = doctor.toObject();
      profileImagePath = doctor.profileImage;
      profileImageBuffer = fs.readFileSync(profileImagePath);
      plainDoctor.realProfileImage = profileImageBuffer.toString("base64");
      return plainDoctor;
    });

    // await console.log(updated);
    res
      .status(200)
      .json({ allDoctors: updated, message: "success fetched all doctors" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: `error ${error}` });
  }
};

exports.getDoctorDetails = async (req, res) => {
  try {
    const doctorDetails = await Doctor.findOne({ userId: req.body.userId });
    if (!doctorDetails) {
      return res.status(400).json({ message: "no doctor exist" });
    }
    console.log(doctorDetails);
    let profileImage = "",
      profileImageBuffer,
      profileImagePath;
    if (doctorDetails.profileImage) {
      profileImagePath = doctorDetails.profileImage;
      profileImageBuffer = fs.readFileSync(profileImagePath);
      profileImage = profileImageBuffer.toString("base64");
    }

    res.status(200).json({
      message: "fetched Successfully",
      doctorDetails: { doctorDetails, profileImage: profileImage },
    });
  } catch (error) {
    console.log(error);
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
      { userId: req.body._id },
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
            school: schoolTen,
            marks: marksTen,
            certificate: certificateTen,
          },
          twelth: {
            school: schoolTwelth,
            marks: marksTwelth,
            certificate: certificateTwelth,
          },
          mbbs: {
            school: schoolMbbs,
            marks: marksMbbs,
            certificate: certificateMbbs,
          },
        },
        verificationStatus: 1,
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

exports.addSlot = async (req, res) => {
  try {
    console.log(req.body);
    const { _id, date, startTime, endTime } = req.body;
    const allSlots = await Slot.find({ doctorId: _id, date: date });
    for (let tempSlot of allSlots) {
      if (startTime >= tempSlot.startTime && startTime <= tempSlot.endTime) {
        return res.status(400).json({ message: "Dates are overlapping" });
      } else if (endTime >= tempSlot.startTime && endTime <= tempSlot.endTime) {
        return res.status(400).json({ message: "Times are overlapping" });
      }
    }
    console.log(allSlots);
    const slot = new Slot({ date, startTime, endTime, doctorId: _id });
    const addedSlot = await slot.save();

    // console.log(addedSlot);
    res.status(200).json({ message: "Slot Added Successsfully" });
  } catch (error) {
    console.log(`error ${error}`);
    return res.status(500).json({ message: "Dates are overlapping" });
  }
};

exports.existingSlots = async (req, res) => {
  try {
    const { _id,date } = req.body;
    const allSlots = await Slot.find({ doctorId: _id ,date:date}).populate({path: "patientId", populate: { path: "userId" }});
    allSlots.sort((a, b) => new Date(a.date) - new Date(b.date));
    res
      .status(200)
      .json({
        message: "succesfully fetched already set slots",
        setSlots: allSlots,
      });
  } catch (error) {
    console.log(error);
  }
};

exports.confirmedSlots = async (req, res) => {
  try {
    const { _id } = req.body;
    const allSlots = await Slot.find({
      doctorId: _id,
      confirmStatus: true,
    }).populate({ path: "patientId", populate: { path: "userId" } });
    allSlots.sort((a, b) => new Date(a.date) - new Date(b.date));
    let profileImageBuffer, profileImagePath, profileImage;
    const updatedSlots = allSlots.map((slot) => {
      const tempSlot = slot.toObject();
      if (tempSlot.patientId.profileImage != "") {
        profileImagePath = slot.patientId.profileImage;
        profileImageBuffer = fs.readFileSync(profileImagePath);
        tempSlot.patientId.realProfileImage = profileImageBuffer.toString("base64");
      }
      return tempSlot
    });
    res
      .status(200)
      .json({
        message: "succesfully fetched already set slots",
        bookedSlots: updatedSlots,
      });
  } catch (error) {
    console.log(error);
  }
};

exports.allSlots = async (req, res) => {
  try {
    const { _id } = req.body;
    const allSlots = await Slot.find({ doctorId: _id }).populate({path: "doctorId", populate: { path: "userId" }});
    allSlots.sort((a, b) => new Date(a.date) - new Date(b.date));
    res
      .status(200)
      .json({
        message: "succesfully fetched already set slots",
        setSlots: allSlots,
      });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteSlot=async (req,res)=>{
  try {

    const {date,doctorId,startTime}=req.body
    const fetchedSlotData=await Slot.findOne({date:date,doctorId:doctorId,startTime:startTime})
    if(fetchedSlotData.confirmStatus){
      return res.status(403).json({message:"Aleady booked by a Patient for Consulation"})
    }
    const deletedSlot=await Slot.deleteOne({date:date,doctorId:doctorId,startTime:startTime})
    console.log(`deleted Slot ${deletedSlot}`)
    res.status(200).json({message:"slot deleted successfully"})
    
  } catch (error) {
    console.log(error)
  }
}

exports.getAllReviewsForADoctor=async (req,res)=>{
  try {
    const {doctorId}=req.body
    console.log(req.body)
    const fetchedAllReviews=await Review.find({}).populate({path:"slotId",match:{
      doctorId:doctorId
    },populate:{
      path:"patientId"
    }})
    const filteredReviews = fetchedAllReviews.filter(review => review.slotId !== null);
    //  console.log(filteredReviews)
    let profilePatientImageBuffer
    const updatedFetchedAllReviews=filteredReviews.map((review)=>{
      review=review.toObject()
      if(review.slotId.patientId.profileImage){
        profilePatientImageBuffer=fs.readFileSync(review.slotId.patientId.profileImage)
        review.slotId.patientId.realProfileImage=`data:image/jpeg;base64,${profilePatientImageBuffer.toString('base64')}`
      }
      return review
    })
    res.status(200).json({message:"All reviews for the doctor",allReviews:updatedFetchedAllReviews  })
    
  } catch (error) {
    console.log(error)
  }
}
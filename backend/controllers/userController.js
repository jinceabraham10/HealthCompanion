const { default: mongoose } = require("mongoose");
const User = require("../models/userModel.js");
const { handlehashedPassword } = require("../utils/crypting.js");
const {
  mailOnSuccessfullRegisteration,
  mailWithSlotBookingConfirmation,
} = require("../utils/mailService.js");
const { createDoctor } = require("./doctorController.js");
const Slot = require("../models/slotModel.js");
const Doctor = require("../models/doctorModel.js");
const jwtDecode = require("jwt-decode");
const jwt = require("jsonwebtoken");
const { formattedDate } = require("../utils/dateUtil.js");
const Patient = require("../models/patientModel.js");
const fs = require("fs");

//get all users
exports.getAllUsers = async (req, res) => {
  try {
    const data = await User.find({});
    res.json(data);
    // console.log(req)
    console.log(data);
  } catch (error) {
    console.log("Error in fetching data", error);
    res.status(500).json({ error: err.message });
  }
};

//api to create User

exports.createUser = async (req, res) => {
  try {
    await console.log(`received data ${req.body}`);
    const { username, password, email, role, phone, createdAt } = req.body.user;
    let hashedPassword = await handlehashedPassword().setPassword(password);
    const newUser = new User({
      username,
      password: hashedPassword,
      email,
      role,
      phone,
      createdAt,
    });

    // const fetchedData = "save"

    const fetchedData = await newUser.save();
    mailOnSuccessfullRegisteration({
      username,
      email,
      role,
      phone,
      createdAt,
    });

    if (role == 0) {
      let validId = new mongoose.Types.ObjectId(fetchedData._id);
      const patient = new Patient({
        userId: createdUser._id,
        createdAt: formattedDate(date),
      });
      const fetchedPatientData = await patient.save();
      console.log(`patient data ${fetchedPatientData}`);
    } else if (role == 1) {
      let validId = new mongoose.Types.ObjectId(fetchedData._id);
      await createDoctor({ userId: validId, createdAt: createdAt });
    }

    req.session.destroy();
    res
      .status(200)
      .clearCookie("connect.sid")
      .json({ message: `Created Successfully ${fetchedData}` });
  } catch (error) {
    // console.log(req.body);
    console.log("Error", error);
    res
      .status(400)
      .json({ message: `Error Occured while Creating the Account, ${error}` });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const fetchedData = await User.find({
      $and: { username: req.params.usrname, password: req.params.pwd },
    });
    res.status(200).json({ Users: fetchedData });
  } catch (error) {
    console.log(error);
  }
};

exports.bookSlot = async (req, res) => {
  try {
    const { patientId, slotId,description } = req.body;
    await console.log(`recieved data ${JSON.stringify(req.body)}`)
    const fetchSlot = await Slot.findOne({ _id: slotId });
    if (fetchSlot.confirmStatus) {
      return res.status(400).json({ message: "slot is already confirmed" });
    }
    const userBasicData = await Patient.findOne({ _id: patientId }).populate('userId');
    const doctorData = await Doctor.findOne({
      _id: fetchSlot.doctorId,
    }).populate("userId");
    const confirmedSlot = await Slot.updateOne(
      { _id: slotId },
      { $set: { confirmStatus: true, patientId: userBasicData._id,patientDescription:description  } },
      { new: true }
    );
    if (!confirmedSlot) {
      return res
        .status(400)
        .json({ message: " unsuccesfull in confirming the slot booking" });
    }

    // console.log(`doctor data ${doctorData}`)
    // console.log(`patient data ${userBasicData}`)
    // console.log(`slot data ${fetchSlot}`)

    await mailWithSlotBookingConfirmation({
      slot: fetchSlot,
      doctor: doctorData,
      patient: userBasicData.userId,
    });
    res
      .status(200)
      .json({ message: " successfully confirmed the slot booking" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: `error occured while confirming the slot booking ${error}`,
    });
  }
};

exports.createGoogleUser = async (req, res) => {
  try {
    const { token, role } = req.body;
    const details = await jwtDecode.jwtDecode(token);
    console.log(details);
    const date = new Date();
    const user = new User({
      username: details.email,
      email: details.email,
      createdAt: `${formattedDate(date)}`,
      role: role,
    });

    const createdUser = await user.save();
    await console.log(createdUser);
    if (role == 0) {
      let validId = new mongoose.Types.ObjectId(createdUser._id);
      const patient = new Patient({
        userId: createdUser._id,
        createdAt: formattedDate(date),
      });
      const fetchedPatientData = await patient.save();
      console.log(`patient data ${fetchedPatientData}`);
    } else if (role == 1) {
      let validId = new mongoose.Types.ObjectId(createdUser._id);
      await createDoctor({ userId: validId, createdAt: formattedDate(date) });
    }
    mailOnSuccessfullRegisteration({
      username: details.email,
      email: details.email,
      role: role,
      phone: "",
      createdAt: formattedDate(date),
    });
    const token2 = await jwt.sign(
      { id: createdUser._id, username: createdUser.username },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
    await console.log(`token created ${token2}`);
    res.status(200).json({
      message: "google User created successfully",
      token: token2,
      userData: createdUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Couldn't create the user" });
  }
};

exports.OnLoadPatientData = async (req, res) => {
  try {
    const { userId } = req.body;
    await console.log(`recived userId at on Load patient data ${userId}`);
    const fetchedPatientData = await Patient.findOne({
      userId: userId,
    }).populate("userId");
    const tempPatient = fetchedPatientData.toObject();
    if (tempPatient.profileImage != "") {
      let profileImagePath = tempPatient.profileImage;
      let profileImageBuffer = fs.readFileSync(profileImagePath);
      tempPatient.realProfileImage = profileImageBuffer.toString("base64");
    }

    await console.log(`fetched Patient ${fetchedPatientData}`);
    res.status(200).json({
      message: "fetched patient data successfully",
      fetchedPatientData: tempPatient,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.updatePatientProfile = async (req, res) => {
  try {

    console.log(req.body)

    const {
      firstName,
      lastName,
      bloodGroup,
      height,
      weight,
      city,
      state,
      street,
      gender,
      phone,
      pincode,
      country,
      _id,
    } = req.body;
    // const profileImage = req.files["profileImage"][0].path;
    const updateBasicData = await User.updateOne(
      { _id: _id },
      {
        $set: {
          address: {
            city: city,
            state: state,
            country: country,
            pincode: pincode,
          },
          phone: phone,
        },
      },
      { new: true }
    );
    const updatedPatientData = await Patient.updateOne(
      { userId: _id },
      {
        $set: {
          firstName,
          lastName,
          gender,
          height,
          weight,
          bloodGroup
        },
      }
    );

    if (updatedPatientData && updateBasicData) {
      res.status(200).json({ message: "Update patient profile successfully" });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.getAllBookedSlots = async (req, res) => {
  try {
    const { patientId } = req.body;
    const allSlotsBooked = await Slot.find({ patientId: patientId }).populate(
      "doctorId patientId"
    );

    let profileImageBuffer, profileImagePath, profileImage;
    const updated = allSlotsBooked.map((slot) => {
      const plainSlot = slot.toObject();
      profileImagePath = slot.doctorId.profileImage;
      profileImageBuffer = fs.readFileSync(profileImagePath);
      plainSlot.doctorId.realProfileImage =
        profileImageBuffer.toString("base64");
      return plainSlot;
    });
    console.log(updated);
    res
      .status(200)
      .json({ message: "slots fetched Successfully", bookedSlots: updated });
  } catch (error) {
    console.log(error);
  }
};

exports.updateProfileImage = async (req, res) => {
  try {
    const {
      _id,
    } = req.body;
    const profileImage = req.files["profileImage"][0].path;
    const updatedPatientData = await Patient.updateOne(
      { userId: _id },
      {
        $set: {
          profileImage: profileImage,
        },
      }
    );

    if (updatedPatientData ) {
      res.status(200).json({ message: "Update patient profile Image successfully" });
    }
  } catch (error) {
    console.log(error);
  }
};



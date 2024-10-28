const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { sessionSetUp } = require("../config/sessionSetup.js");
const {
  getAllUsers,
  createUser,
  getUserById,
  bookSlot,
  createGoogleUser,
  OnLoadPatientData,
  updatePatientProfile,
  getAllBookedSlots,
  updateProfileImage,
  getBookedSlotsForToday,
  cancelBookedSlot,
  getAllCompletedConsultations,
  addReview,
  getReview,
  editReview,
} = require("../controllers/userController.js");
const {
  generateOTPForRegisteration,
  verifyOtpForRegisteration,
} = require("../middlewares/otpServiceMiddleware.js");
const { formattedDate } = require("../utils/dateUtil.js");
const { getAllReviewsForADoctor } = require("../controllers/doctorController.js");

// router.get('/',getAllUsers)

const uploadDir = path.join(__dirname, "patient");

const date = new Date();
const dateFormatted = formattedDate(date);

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    console.log(`filename ${file.filename}`);
    cb(null, `profileImage_${req.body._id}`);
  },
});
const upload = multer({
  storage: storage,
});

// const storage=multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null,uploadDir)
//     },
//     filename:(req,file,cb)=>{
//         console.log(`req ${JSON.stringify(req.body._id)}`)
//         cb(null,`profile_${req.body._id}_${file.originalname}`)
//     }
// })
// const upload=multer({
//     storage:storage
// })

router.post("/generateOtp", generateOTPForRegisteration);
router.post("/verifyOtp", verifyOtpForRegisteration, createUser);
router.post("/create", createUser);
router.post("/google/createUser", createGoogleUser);
router.post("/bookSlot", bookSlot);
router.get("/:city", getUserById);
router.post("/loadData/profile/patient", OnLoadPatientData);
router.post("/getAllBookedSlots", getAllBookedSlots);
router.post("/cancelSlot", cancelBookedSlot);
router.post("/getBookedSlotsToday", getBookedSlotsForToday);
router.post("/getAllCompletedConsultations", getAllCompletedConsultations);
router.post("/addReview", addReview);
router.post("/editReview", editReview);
router.post("/slot/getReview",getReview);
router.post(
  "/updateProfileImage/patient",
  upload.fields([{ name: "profileImage", maxCount: 1 }]),
  updateProfileImage
);
router.post("/updateProfile/patient", updatePatientProfile);
module.exports = router;

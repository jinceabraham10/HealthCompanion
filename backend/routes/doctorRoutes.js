const express=require('express')
const multer=require('multer')
const router=express.Router()
const fs=require('fs')
const path=require('path')
const {submitForVerification,getAllDoctors,submitVerificationData, getDoctorDetails, addSlot, existingSlots, confirmedSlots, allSlots, deleteSlot}=require('../controllers/doctorController.js')
const verifyToken = require("../middlewares/verifyJwt.js");



const uploadDir=path.join(__dirname,'uploads')

if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir,{recursive:true})
}

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,uploadDir)
    },
    filename:(req,file,cb)=>{
        console.log(`req ${JSON.stringify(req.body._id)}`)   
        cb(null,`${req.body._id}_${file.originalname}`)
    }
})

const upload=multer({
    storage:storage,
   
   
})

router.post('/submitForVerification',submitForVerification)
router.get('/getAllDoctors',getAllDoctors)

router.post('/verificationSubmit',upload.fields([
    {name:"license",maxCount:1},
    {name:"profileImage",maxCount:1},
    {name:"certificateTen",maxCount:1},
    {name:"certificateTwelth",maxCount:1},
    {name:"certificateMbbs",maxCount:1}

]),submitVerificationData)

router.post('/getDoctorDetails',getDoctorDetails)
router.post('/addSlot',addSlot)
router.post('/slots',existingSlots)
router.post('/confirmedSlots',confirmedSlots)
router.post('/availableSlots',allSlots)
router.post('/deleteSlot',deleteSlot)

module.exports=router
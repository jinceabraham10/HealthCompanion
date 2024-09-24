const express=require('express')
const router=express.Router()
const {submitForVerification,getAllDoctors}=require('../controllers/doctorController.js')
const verifyToken = require("../middlewares/verifyJwt.js");


router.post('/submitForVerification',submitForVerification)
router.get('/getAllDoctors',getAllDoctors)

module.exports=router
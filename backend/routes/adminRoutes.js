const express=require('express')
const multer=require('multer')
const router=express.Router()
const fs=require('fs')
const path=require('path')
const verifyToken = require("../middlewares/verifyJwt.js");
const {checkAdmin, approveDoctor, rejectDoctor, getAllToBeApprovedDoctors}=require('../controllers/adminController.js')

router.post('/checkAdmin',checkAdmin)
router.post('/approveDoctor',approveDoctor)
router.post('/rejectDoctor',rejectDoctor)
router.get('/getAllToBeApprovedDoctors',getAllToBeApprovedDoctors)


module.exports=router
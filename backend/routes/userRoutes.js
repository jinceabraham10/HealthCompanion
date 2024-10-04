const express=require('express')
const router=express.Router()
const {sessionSetUp}=require('../config/sessionSetup.js')
const {getAllUsers ,createUser,getUserById}= require('../controllers/userController.js')
const {generateOTPForRegisteration,verifyOtpForRegisteration}=require('../middlewares/otpServiceMiddleware.js')
// router.get('/',getAllUsers)

router.post('/generateOtp',generateOTPForRegisteration)
router.post('/verifyOtp',verifyOtpForRegisteration,createUser)
router.post('/create',createUser)
router.get('/:city',getUserById)
module.exports=router

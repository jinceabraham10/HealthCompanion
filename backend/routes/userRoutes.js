const express=require('express')
const router=express.Router()
const {getAllUsers ,createUser,getUserById}= require('../controllers/userController.js')
// router.get('/',getAllUsers)
router.post('/register',createUser)
router.get('/:city',getUserById)
module.exports=router

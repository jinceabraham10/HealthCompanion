const express=require('express')
const router=express.Router()
const {getAllUsers ,createUser}= require('../controllers/userController.js')
router.get('/user',getAllUsers)
router.post('/insert',createUser)

module.exports=router

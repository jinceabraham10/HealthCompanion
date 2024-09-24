const express=require('express')
const router=express.Router()
const {getAllTests}=require('../controllers/testController')

router.get('.getAllTests',getAllTests)


module.exports=router
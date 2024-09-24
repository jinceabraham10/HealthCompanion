const express=require('express')
const router=express.Router()
const {getAllMedicines}=require('../controllers/medicineController')

router.get('/getAllMedicines',getAllMedicines)

module.exports=router
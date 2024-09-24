const mongoose=require('mongoose')

const medicineSchema=new mongoose.Schema({
    medicineName:{
        type:String
    },
    description:{
        type:String
    },
    price:{
        type:String
    }
    
})

const Medicines=new mongoose.model('medicines',medicineSchema)
module.exports=Medicines
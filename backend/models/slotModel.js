const mongoose=require('mongoose')

const SlotSchema=new mongoose.Schema({
    date:{
        type:String,
        default:""
    },
    startTime:{
        type:String,
        default:""
    },
    endTime:{
        type:String,
        default:""
    },
    doctorId:{
        type:mongoose.Schema.ObjectId,
        ref:"doctors",
        default:null
    },
    patientId:{
        type:mongoose.Schema.ObjectId,
        ref:"patients",
        default:null
    },
    confirmStatus:{
        type:Boolean,
        default:false
    },
    completedStatus:{
        type:String,
        default:"0"
    },
    patientDescription:{
        type:String,
        default:""
    },
    doctorPrescription:{
        type:String,
        default:""
    },
    description:{
        type:String
    }
})

const Slot=new mongoose.model('slots',SlotSchema)

module.exports=Slot
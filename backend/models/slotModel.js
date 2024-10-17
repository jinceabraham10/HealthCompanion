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
    }
})

const Slot=new mongoose.model('slots',SlotSchema)

module.exports=Slot
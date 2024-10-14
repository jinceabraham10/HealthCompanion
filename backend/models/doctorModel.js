const { json } = require('body-parser')
const mongoose=require('mongoose')
const User = require('./userModel')

const educationalDetails={
    school:"",
    yearCompletion:"",
    marks:"",
    certificate:""
}

const slot={
    
}


const doctorSchema=new mongoose.Schema({
    firstName:{
        type:String,
        default:""
    },
    lastName:{
        type:String,
        default:""
    },
    bloodGroup:{
        type:String,
        default:""
    },
    height:{
        type:String,
        default:""
    },
    weight:{
        type:String,
        default:""
    },
    gender:{
        type:String,
        default:""
    },
    specialization:{
        type:String,
        default:""
    },
    educationalDetails:{
        type:JSON,
        default:{
            "ten":educationalDetails,
        "twelth":educationalDetails,
        "mbbs":educationalDetails
        }
    },
    slots:{
        type:JSON,
        default:{}
    },
    profileImage:{
        type:String,
        default:""
    },
    createdAt:{
        type:String,
        default:""
        
      },
    updatedAt:{
        type:String,
        default:""
      },
    verificationStatus:{
        type:String,
        default:2
    },
    status:{
        type:String,
        default:0
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        default:null
    },

})

const Doctor=new mongoose.model("doctors",doctorSchema)

module.exports=Doctor
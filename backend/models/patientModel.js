const { json } = require('body-parser')
const mongoose=require('mongoose')
const User = require('./userModel')

const patientSchema=new mongoose.Schema({
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

const Patient=new mongoose.model("patients",patientSchema)

module.exports=Patient
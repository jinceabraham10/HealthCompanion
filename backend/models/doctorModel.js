const { json } = require('body-parser')
const mongoose=require('mongoose')

const educationalDetails={
    school:"",
    yearCompletion:"",
    marks:"",
    certificate:""
}

const doctorSchema=new mongoose.Schema({
    firstName:{
        type:String,
    },
    lastName:{
        type:String
    },
    bloodGroup:{
        type:String
    },
    height:{
        type:String
    },
    weight:{
        type:String
    },
    gender:{
        type:String
    },
    specialization:{
        type:String
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
        type:Array,
        default:[]
    },
    status:{
        type:String,
        default:3
    }


})

const Doctor=new mongoose.model("doctors",doctorSchema)

module.exports=Doctor
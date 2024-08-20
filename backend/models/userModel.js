const mongoose=require('mongoose')
const UserSchema=new mongoose.Schema(
    {
        username:{
            type:String,
            required:true
        },
        password:{
            type:String,
            require:true
        },
        email:{
            type:String,
            require:true,
            unique:true
        },
        phone:{
            type:String,
            require:true,
            unique:true
        },
        role:{
            type:String,
            required:true
        },
        profile:{
            type:String,
            required:true
        }
    }
)

const User=mongoose.model("users",UserSchema)
module.exports=User
const mongoose=require('mongoose')
const UserSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        password:{
            type:String,
            require:true
        }
    }
)

const User=mongoose.model("users",UserSchema)
module.exports=User
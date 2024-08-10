const User=require('../models/userModel.js')
exports.getAllUsers=async (req,res)=>{
    try {
        const data=await User.find({})
        console.log(data)
        
    } catch (error) {
        console.log("Error in fetching data",error)
    }
}

exports.createUser=async (req,res)=>{

    try {
        const newUser=new User(req.body)
        await newUser.save()
        
    } catch (error) {
        console.log("Error",error)
    }

}


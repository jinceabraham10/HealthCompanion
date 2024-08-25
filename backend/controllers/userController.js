const User=require('../models/userModel.js')
exports.getAllUsers=async (req,res)=>{
    try {
        const data=await User.find({})
        res.json(data)
        // console.log(req)
        console.log(data)
        
    } catch (error) {
        console.log("Error in fetching data",error)
        res.status(500).json({ error: err.message });
    }
}

exports.createUser=async (req,res)=>{

    try {
        await console.log(req.body)
        const newUser=new User(req.body)
        const fetchedData=await newUser.save()
        res.status(200).json({"message":`Created Successfully ${fetchedData}`})
        
    } catch (error) {
        console.log(req.body)
        console.log("Error",error)
        res.status("400").json({"message":`Error Occured while Creating the Account`})
    }

}

exports.getUserById=async (req,res)=>{
    try {
        
        const fetchedData=await User.find({
            "address.city":req.params.city})
        res.status(200).json({"Users":fetchedData})
    } catch (error) {
        console.log(error)
    }

}


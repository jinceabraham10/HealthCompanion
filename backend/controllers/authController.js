const User=require('../models/userModel.js')

exports.checkUser=async (req,res)=>{
    try {
        console.log(req.body)
        const data=req.body
        const fetchedData= await User.findOne({username:data.name})
        console.log(fetchedData)
        if(!fetchedData){
            console.log("helooo")
            res.status(200).json({'message':'login unsuccessfull'})
        }
        else{
            res.json(fetchedData)
        }
    

        
    } catch (error) {
        console.log(error)
    }

}
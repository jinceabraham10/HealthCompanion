const User=require('../models/userModel.js')

exports.checkUser=async (req,res)=>{
    try {
        console.log(req.body)
        const data=req.body
        const fetchedData= await User.findOne({username:data.username})
        console.log(fetchedData)
        if(!fetchedData){
            res.status(400).json({'message':'login unsuccessfull'})
        }
        else{
            res.status(200).json({"message":"Login successfull"})
        }
    

        
    } catch (error) {
        console.log(error)
    }

}
const jwt=require("jsonwebtoken")
const dotenv=require('dotenv')
const jwtDecode=require('jwt-decode')

dotenv.config()


const verifyToken=async (req,res,next)=>{
    try {

        const token=req.headers['authorization']
        console.log(token)
        jwt.verify(token,process.env.JWT_KEY,(err,user)=>{
            if(err){
                res.status(400).json({message:"invalid token"})
            }
            req.user=user
            next()
        })

        
    } catch (error) {
        
    }
}

module.exports=verifyToken
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const connectToMongoDB=async ()=>{
    try {
        mongoose.set('debug',true)
        const connection=await mongoose.connect(process.env.Mongo_URL)
        console.log("connection successfull",connection.connection.host)
        
    } catch (error) {
        console.log("Connection Failed",error)
    }

}

module.exports=connectToMongoDB
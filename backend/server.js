const express=require('express')
const dotenv=require('dotenv')
const path=require('path')
const User=require('./models/userModel.js')
const connectToMongoDB=require('./config/db.js')
const userRoutes=require('./routes/userRoutes.js')
dotenv.config({path:path.resolve(__dirname,'config/config.env')})

port=process.env.PORT
connectToMongoDB()

const app=express()
app.use('/api',userRoutes)
app.listen(port,()=>{
    console.log("server is running at ",port)
})




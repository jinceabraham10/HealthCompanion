const express=require('express')
const dotenv=require('dotenv')
const path=require('path')
const cors=require('cors')
const connectToMongoDB=require('./config/db.js')
const userRoutes=require('./routes/userRoutes.js')
const authRoutes=require('./routes/authRoutes.js')
dotenv.config({path:path.resolve(__dirname,'config/config.env')})
const app=express()
app.use(cors())
app.use(express.json())
port=process.env.PORT
connectToMongoDB()
app.use('/api/login',authRoutes)
app.listen(port,()=>{
    console.log("server is running at ",port)
})




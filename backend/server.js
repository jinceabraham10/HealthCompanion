const express=require('express')
const dotenv=require('dotenv')
const path=require('path')
const cors=require('cors')

const connectToMongoDB=require('./config/db.js')
const {sessionSetUp}=require('./config/sessionSetup.js')


const userRoutes=require('./routes/userRoutes.js')
const authRoutes=require('./routes/authRoutes.js')


dotenv.config({path:path.resolve(__dirname,'config/config.env')})



const app=express()
app.use(sessionSetUp)
app.use(cors(
    {
        origin:"http://localhost:5173",
        credentials:true
    }
))
app.use(express.json())
port=process.env.PORT
connectToMongoDB()
app.use('/api/login',authRoutes)
app.use('/api/user',userRoutes)
app.listen(port,()=>{
    console.log("server is running at ",port)
})




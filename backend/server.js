const express=require('express')
const dotenv=require('dotenv')
const path=require('path')
const cors=require('cors')

const connectToMongoDB=require('./config/db.js')
const {sessionSetUp}=require('./config/sessionSetup.js')


const userRoutes=require('./routes/userRoutes.js')
const authRoutes=require('./routes/authRoutes.js')
const doctorRoutes=require('./routes/doctorRoutes.js')
const medicineRoutes=require('./routes/medicineRoutes.js')
const testRoutes=require('./routes/testRoutes.js')


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
app.use('/api/auth',authRoutes)
app.use('/api/user',userRoutes)
app.use('/api/doctor',doctorRoutes)
app.use('/api/medicine',medicineRoutes)
app.use('/api/test',testRoutes)
app.listen(port,()=>{
    console.log("server is running at ",port)
})




const session=require('express-session')
const dotenv=require('dotenv')
dotenv.config()

exports.sessionSetUp=session({
    secret:process.env.SECRET_KEY,
    resave:false,
    saveUninitialized:true,
    cookie:{
        secure:false,
        httpOnly:true,
        maxAge:600000
    }
})

console.log("Session Created")
const mongoose=require('mongoose')

const testSchema=new mongoose.Schema({
    testName:{
        type:String
    },
    description:{
        type:String
    },
    price:{
        type:String
    }
    
})


const Tests= new mongoose.model('tests',testSchema)

module.exports=Tests
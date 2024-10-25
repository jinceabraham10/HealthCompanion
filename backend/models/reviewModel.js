const mongoose=require('mongoose')

const ReviewSchema=new mongoose.Schema({
    slotId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"slots"
        
    },
    patientComment:{
        type:String
    }
})

const Review=new mongoose.model("reviews",ReviewSchema)
module.exports= Review
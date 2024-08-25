const mongoose=require('mongoose')

const AddressSchema=mongoose.Schema({
    street:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    pincode:{
        type:String,
        required:true
    }
})

// const Address=mongoose.model('addressn',AddressSchema)
module.exports={AddressSchema}
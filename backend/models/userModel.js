const mongoose = require("mongoose");
const {AddressSchema} = require("./addressModel");
// const Address = require("./addressModel.js");


const addressJson={
    city:"",
    state:"",
    country:"",
    pincode:""
}


const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique:true
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Array,
    required: true,
    default:[""],
    unique:false
  },
  role: {
    type: String,
    required: true,
    default:" "
  },
  address: {
    type:JSON,
    default:addressJson
  },
  createdAt:{
    type:String,
    required: true
  },
  updatedAt:{
    type:String,
    default:""
  },
  status:{
    type:Number,
    default:"0"
    
  }
});


const User = mongoose.model("users", UserSchema);

module.exports = User;

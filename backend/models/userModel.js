const mongoose = require("mongoose");
const {AddressSchema} = require("./addressModel");
// const Address = require("./addressModel.js");


const addressJson={
    "city":"",
    "state":"",
    "country":"",
    "pincode":""
}


const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  phone: {
    type: String,
    require: true,
    default:" "
  },
  role: {
    type: String,
    required: true,
    default:" "
  },
  address: AddressSchema,
  profile: {
    type: String,
    default:" ",
    required: true,
  },
  createdAt:{
    type:String,
    required: true
  },
  status:{
    type:Number,
    
  }
});


const User = mongoose.model("users", UserSchema);

module.exports = User;

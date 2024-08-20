const mongoose = require("mongoose");
const Address = require("./addressModel");
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
    unique: true,
  },
  role: {
    type: String,
    required: true,
  },
  address: {
    type: JSON,
    required:true,
    default:addressJson
  },
  profile: {
    type: String,
    required: true,
  },
});


const User = mongoose.model("users", UserSchema);

module.exports = User;

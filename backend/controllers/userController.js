const { default: mongoose } = require("mongoose");
const User = require("../models/userModel.js");
const { handlehashedPassword } = require("../utils/crypting.js");
const { mailOnSuccessfullRegisteration } = require("../utils/mailService.js");
const {createDoctor}=require('./doctorController.js')

//get all users
exports.getAllUsers = async (req, res) => {
  try {
    const data = await User.find({});
    res.json(data);
    // console.log(req)
    console.log(data);
  } catch (error) {
    console.log("Error in fetching data", error);
    res.status(500).json({ error: err.message });
  }
};

//api to create User

exports.createUser = async (req, res) => {
  try {
    await console.log(`received data ${req.body}`);
    const { username, password, email, role, phone, createdAt } = req.body.user;
    let hashedPassword = await handlehashedPassword().setPassword(password);
    const newUser = new User({
      username,
      password: hashedPassword,
      email,
      role,
      phone,
      createdAt,
    });

    // const fetchedData = "save"

    const fetchedData = await newUser.save();
    mailOnSuccessfullRegisteration({
      username,
      email,
      role,
      phone,
      createdAt,
    });


    if(role==1){
      let validId=new mongoose.Types.ObjectId(fetchedData._id)
      await createDoctor({userId: validId,"createdAt":createdAt})
    }

    req.session.destroy()
    res.status(200).clearCookie('connect.sid').json({ message: `Created Successfully ${fetchedData}`});
  } catch (error) {
    // console.log(req.body);
     console.log("Error", error);
    res
      .status(400)
      .json({ message: `Error Occured while Creating the Account, ${error}` });
  }
};



exports.getUserById = async (req, res) => {
  try {
    const fetchedData = await User.find({
      $and: { username: req.params.usrname, password: req.params.pwd },
    });
    res.status(200).json({ Users: fetchedData });
  } catch (error) {
    console.log(error);
  }
};



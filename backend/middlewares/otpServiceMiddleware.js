const crypto = require("crypto");
const { mailWithOtp } = require("../utils/mailService.js");

exports.generateOTPForRegisteration = async (req, res) => {
  try {
    
    const { email } = req.body;
    const otpGenerated = crypto.randomInt(100000, 1000000).toString();
    req.session.otp=otpGenerated
    console.log(`otp generated is ${req.session.otp} and id ${req.sessionID}`)
    if(!(await mailWithOtp(email, otpGenerated))){
      return res.status(400).json({'message':`couldn't send the Otp to the specified mail`,otpMailNotSend:true})
    }
    res.status(200).json({'message':`Otp generated successfully and is sent to the mail ${email}`,'otpStatus':(otpGenerated)?true:false})
  } catch (error) {
    console.log(`error on OTp generation ${error}`);
    res.status(400).json({'message':`error occured while generating otp  ${error}`})

  }
};

exports.verifyOtpForRegisteration = async (req, res, next) => {
  try {
    await console.log(`${req.session.otp} and id ${req.sessionID} ${req.body} `)
    const {otp}=req.body
    if((req.session.otp) && otp==req.session.otp){
      console.log('Otp is successfully verified ')
      delete req.session.otp
      return next()
    }
    else{
      res.status(400).json({message:`invlaid otp or Otp hasn't been generated`,invalidOtp:true})
    }
  } catch (error) {
    console.log(`error on Verifying the OTP ${error}`);
    res.status(400).json({message:`error while verifying ${error}`})
  }
};

exports.generateOTPForResetPassword= async (req, res) => {
  try {
    
    const { email } = req.body;
    const otpGenerated = crypto.randomInt(100000, 1000000).toString();
    req.session.otp=otpGenerated
    console.log(`otp generated is ${req.session.otp} and id ${req.sessionID}`)
    if(!(await mailWithOtp(email, otpGenerated))){
      return res.status(400).json({'message':`couldn't send the Otp to the specified mail`,otpMailNotSend:true})
    }
    res.status(200).json({'message':`Otp generated successfully and is sent to the mail ${email}`,'otpStatus':(otpGenerated)?true:false})
  } catch (error) {
    console.log(`error on OTp generation ${error}`);
    res.status(400).json({'message':`error occured while generating otp  ${error}`})

  }
};

const nodemailer = require("nodemailer");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const from =process.env.MAIL_FROM;
const pass=process.env.MAIL_PASS;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user:from,
    pass:pass
  }
});

exports.mailOnSuccessfullRegisteration = async (ReceiverData) => {
try {
  console.log(`${process.env.MAIL_FROM} ${from} ${process.env.MAIL_PASS} ${pass}`)
  console.log(`receiver mail ${ReceiverData.email} ${process.env.MAIL_SENDER} ${process.env.MAIL_PASSWORD}  `)
  const info=await transporter.sendMail({
    from: from,
    to: ReceiverData.email,
    subject: "Successfull Registeration",
    text: `Hi Good Day..!!, 
    You have successfully Created Account in the HealthCompanion with the username ${ReceiverData.username} and OTP has been sent to ${ReceiverData.phone}`
  });
  console.log(`Email sent ${info.response}`)
} catch (error) {
  console.log(`error ${error}`)
}
};

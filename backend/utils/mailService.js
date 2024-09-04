const nodemailer = require("nodemailer");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: path.resolve(__dirname, "config/config.env") });
const from = process.env.MAIL_SENDER;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "jinceabraham2025@mca.ajce.in",
    pass: process.env.MAIL_PASSWORD,
  },
});

exports.mailOnSuccessfullRegisteration = async (ReceiverData) => {
try {
  console.log(`receiver mail ${ReceiverData.email}`)
  const info=await transporter.sendMail({
    from: from,
    to: ReceiverData.email,
    subject: "Successfull Registeration",
    text: `Hi Good Day,
              You have successfully Created Account in the HealthCompanion with the username ${ReceiverData.username} and OTP has been sent to ${ReceiverData.phone}`
  });

  console.log(`Email sent ${info.response}`)
} catch (error) {
  console.log(error)
}
};

const nodemailer = require("nodemailer");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: path.resolve(__dirname, "config/config.env") });
const from = process.env.MAIL_SENDER;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "jinceabraham2025@mca.ajce.in",
    pass: process.send.MAIL_PASSWORD,
  },
});

exports.mailOnSuccessfullRegisteration = async (receiverMail) => {
try {
  
  const info=await transporter.sendMail({
    from: from,
    to: receiverMail,
    subject: "Successfull Registeration",
    text: `Hi,
              You have been successfully Created Account in the HealthCompanion. Hope you will be getting the required experience to the fullest `
  });

  console.log(`Email sent ${info.response}`)
} catch (error) {
  console.log(error)
}
};

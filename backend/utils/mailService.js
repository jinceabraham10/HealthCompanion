const nodemailer = require("nodemailer");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: path.resolve(__dirname, "config/config.env") });
const from = process.env.MAIL_SENDER;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "jinceabraham2025@mca.ajce.in",
    pass: "Jince@11",
  },
});

exports.mailOnSuccessfullRegisteration = async (receiverMail, text) => {
  transporter.sendMail({
    from: from,
    to: receiverMail,
    subject: "Successfull Registeration",
    text: `Hi,
              You have been successfully Registered in the HealthCompanion. Hope you will be getting the required experience to the fullest `,
  });
};

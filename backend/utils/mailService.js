const nodemailer = require("nodemailer");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const from = process.env.MAIL_FROM;
const pass = process.env.MAIL_PASS;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: from,
    pass: pass,
  },
});

exports.mailOnSuccessfullRegisteration = async (ReceiverData) => {
  try {
    // console.log(`${process.env.MAIL_FROM} ${from} ${process.env.MAIL_PASS} ${pass}`)
    // console.log(`receiver mail ${ReceiverData.email} ${process.env.MAIL_SENDER} ${process.env.MAIL_PASSWORD}  `)
    const info = await transporter.sendMail({
      from: from,
      to: ReceiverData.email,
      subject: "Successfull Registeration",
      text: `Hi Good Day..!!,\n\nYou have successfully Created Account in the HealthCompanion with the username ${ReceiverData.username} at ${ReceiverData.createdAt} `,
    });
    console.log(`Email sent ${info.response}`);
  } catch (error) {
    console.log(`error ${error}`);
  }
};

// Mail with otp sent to user

exports.mailWithOtp = async (email, otp) => {
  try {
    console.log(email);
    const info = await transporter.sendMail({
      from: from,
      to: email,
      subject: "Otp Verification",
      text: `Hi ,\n\nYour OTP for the verification is ${otp} and its valid only for 1 min`,
    });
    console.log(`OTP has been to ${email} info response : ${info.response}`);
    return true;
  } catch (error) {
    console.log(`error on senting Otp mail ${error}`);
    return false;
  }
};

exports.mailWithSlotBookingConfirmation = async (mailDetails) => {
  try {
    const {
      doctor,
      patient,
      slot
    } = mailDetails;
    // await console.log(`received patient ${patient}`)
    // await console.log(`receievd doctor ${doctor}`)
    // await console.log(`receieved slot ${slot}`)
    const infoPatient = await transporter.sendMail({
      from: from,
      subject:"Slot Confirmation",
      to: patient.email,
      text: `Hi User,\nYou have successfully booked slot for consulting with the doctor ${doctor.firstName} ${doctor.lastName} during ${slot.startTime} and ${slot.endTime} on ${slot.date}`
    });
    const infoDoctor = await transporter.sendMail({
      from: from,
      subject:"Slot Confirmation",
      to: doctor.userId.email,
      text: `Hi Doctor,\n${patient.username} has successfully booked slot for consulting with you during ${slot.startTime} and ${slot.endTime} on ${slot.date}`
    });
    console.log(`info patient ${infoPatient}`)
    console.log(`info Doctor ${infoDoctor}`)
  } catch (error) {
    console.log(error);
  }
};

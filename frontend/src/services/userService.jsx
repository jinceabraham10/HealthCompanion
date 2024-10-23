import axios from "axios";
import swal from "sweetalert2";

const message = {
  icon: "success",
  title: "Sign UP",
  text: "OTp has been verified and Account has been Created Successfully",
};
const alert = (message) => {
  swal.fire(message);
};

export async function createUser(userData) {
  try {
    // console.log("recieved from RegisterationPage",userData)
    const response = await axios.post(
      "http://localhost:5000/api/user/verifyOtp",
      userData,
      {
        withCredentials: true,
      }
    );
    console.log(response);
    message.icon = "success";
    message.title = "Sign UP";
    message.text =
      "OTp has been verified and Account has been Created Successfully";
    alert(message);
    return true;
  } catch (error) {
    console.log("Error during OTP submission:", error);

    // Handle 400 error for invalid OTP
    if (
      error.response &&
      error.response.status === 400 &&
      error.response.data.invalidOtp
    ) {
      message.icon = "error";
      message.title = "Invalid OTP";
      message.text = "Please try again";
      alert(message);
      return false; // Return failure status
    }

    // Generic error handling for other errors
    message.icon = "error";
    message.title = "Sign Up Failed";
    message.text = "Error during creation. Please try again.";
    alert(message);

    return false; // Return failure status
  }
}

export async function generateOtp(email) {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/user/generateOtp",
      { email },
      {
        withCredentials: true,
      }
    );
    console.log(response.data);
    return response.data.otpStatus;
  } catch (error) {
    if (error.response.data.otpMailNotsend) {
      message.icon = "error";
      message.title = "Otp mail couldn't be send";
      message.text = error.response.data.message;
      alert(message);
    }
    console.log(`error on the front end while clicking Otp ${error}`);
  }
}

export async function bookSlot(bookDetails){
  try {

    // console.log(bookDetails)
    const resp=await axios.post('http://localhost:5000/api/user/bookSlot',bookDetails)
    console.log(resp)
    swal.fire({
      icon:"success",
      title:"Booked",
      text:"Slot has been successfully booked"
    })
    
  } catch (error) {
    console.log(error)
    if(error.response.status==400 && error.response.data.message=="slot is already confirmed"){
      swal.fire({
        icon:"warning",
        title:"Slot already Booked",
        text:"Slot has been already booked"
      })
    }
  }
}

export async function updatePatientProfile(patientData) {
  try {
    await console.log(patientData)
    const resp=await axios.post("http://localhost:5000/api/user/updateProfile/patient",patientData)
    // console.log(resp.data)
    await swal.fire({
      icon:"success",
      title:"Updated Successfull",
      text:"New details have been updated successfully"
    })
    return true
  } catch (error) {
    console.log(error)
    return false
  }
  
}

export async function getAllSlotsBooked(userData) {
  try {
    const {patientId}=userData
    console.log(userData)
    const resp=await axios.post('http://localhost:5000/api/user/getAllBookedSlots',{patientId:patientId})
    return resp.data.bookedSlots
    
  } catch (error) {
    console.log(error)
    return false 
  }
  
}

export async function updatePatientProfileImage(patientData) {
  try {
    await console.log(patientData)
    const resp=await axios.post("http://localhost:5000/api/user/updateProfileImage/patient",patientData,{
      headers:{
        'Content-Type':"multipart/form-data"
      }
    })
    console.log(resp.data)
    await swal.fire({
      icon:"success",
      title:"Updated Successfull",
      text:"Profile Image has been updated successfully"
    })
    return true
  } catch (error) {
    console.log(error)
    return false
  }
  
}
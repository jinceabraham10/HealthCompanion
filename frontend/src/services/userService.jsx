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
      "https://healthcompanion.onrender.com/api/user/verifyOtp",
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
      "https://healthcompanion.onrender.com/api/user/generateOtp",
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
    const resp=await axios.post('https://healthcompanion.onrender.com/api/user/bookSlot',bookDetails)
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
    const resp=await axios.post("https://healthcompanion.onrender.com/api/user/updateProfile/patient",patientData)
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
    const resp=await axios.post('https://healthcompanion.onrender.com/api/user/getAllBookedSlots',{patientId:patientId})
    return resp.data.bookedSlots
    
  } catch (error) {
    console.log(error)
    return false 
  }
  
}

export async function updatePatientProfileImage(patientData) {
  try {
    await console.log(patientData)
    const resp=await axios.post("https://healthcompanion.onrender.com/api/user/updateProfileImage/patient",patientData,{
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

export async function getSlots(doctor) {
  try {
    const { _id } = doctor;
    console.log(`_id ${doctor}`);
    const resp = await axios.post("https://healthcompanion.onrender.com/api/doctor/availableSlots", {
      _id
    });
    console.log(resp);
    return resp.data.setSlots;
  } catch (error) {
    console.log(error);
  }
}

export async function getBookedSlotsForToday(userData) {
  try {
    const {patientId}=userData
    console.log(userData)
    const resp=await axios.post('https://healthcompanion.onrender.com/api/user/getBookedSlotsToday',{patientId:patientId})
    return resp.data.bookedSlots
    
  } catch (error) {
    console.log(error)
    return false 
  }
  
}

export async function cancelSlot({id}){
  try {
    // console.log(bookDetails)
    const resp=await axios.post('https://healthcompanion.onrender.com/api/user/cancelSlot',{_id:id})
    
    await console.log(`resp ${resp}`)
    await swal.fire({
      icon:"success",
      title:"Canceled",
      text:"Slot has been Canceled"
    })
    
  } catch (error) {
    console.log(error)
    // if(error.response.status==400 && error.response.data.message=="slot is already confirmed"){
    //   swal.fire({
    //     icon:"Error",
    //     title:"Server Error",
    //     text:"Some Interruption has occured"
    //   })
    // }
  }
}

export async function getAllCompletedSlot({patientId}){
  try {
    const allCompletedConsultations=await axios.post("https://healthcompanion.onrender.com/api/user/getAllCompletedConsultations",{patientId})
    // console.log(allCompletedConsultations.data.allCompletedConsultations)
    return allCompletedConsultations.data.allCompletedConsultations
    
  } catch (error) {
    console.log(error)
  }
}

export async function addReview(reviewDetails) {
  try {
    const resp=await axios.post("https://healthcompanion.onrender.com/api/user/addReview",reviewDetails)
    console.log(resp.data)
    swal.fire({
      icon:"success",
      text:"Your review has been added",
      title:"Review"
    })
    
  } catch (error) {
    console.log(error)
  }
  
}

export async function getReview({slotId}) {
  try {
    const resp=await axios.post("https://healthcompanion.onrender.com/api/user/slot/getReview",{slotId})
    console.log(resp.data)
    return resp.data.fetchedReview
    
  } catch (error) {
    console.log(error)
  }
  
}

export async function editReview(reviewDetails) {
  try {
    const resp=await axios.post("https://healthcompanion.onrender.com/api/user/editReview",reviewDetails)
    console.log(resp.data)
    swal.fire({
      icon:"success",
      text:"Your review has been Edited Successfully",
      title:"Review"
    })
    
  } catch (error) {
    console.log(error)
  }
  
}
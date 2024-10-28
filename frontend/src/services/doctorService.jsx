import axios from "axios";
import Swal from "sweetalert2";
export async function getAllDoctors() {
  try {
    const resp = await axios.get(
      "http://localhost:5000/api/doctor/getAllDoctors"
    );
    // console.log(resp.data.allDoctors)
    return resp.data.allDoctors;
  } catch (error) {
    console.log(error);
  }
}

export async function verificationFormSubmit(verificationData) {
  try {
    const resp = await axios.post(
      "http://localhost:5000/api/doctor/verificationSubmit",
      verificationData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(resp.data);
  } catch (error) {
    console.log(`${error}`);
  }
}

export async function loadDoctorData({ userId }) {
  try {
    const fetchedDoctorData = await axios.post(
      "http://localhost:5000/api/doctor/getDoctorDetails",
      { userId }
    );

    console.log(`doctor Details fetchedDoctorData.data.doctorDetails`);

    return fetchedDoctorData.data.doctorDetails;
  } catch (error) {
    console.log(`error ${error}`);
  }
}

export async function AddSlot(slot) {
  try {
    const resp = await axios.post(
      "http://localhost:5000/api/doctor/addSlot",
      slot
    );
    console.log(`resp ${resp}`);
    Swal.fire({
      icon: "success",
      title: "Slot added successfully",
      text: "The slot has been added successfully",
    });
  } catch (error) {
    console.log(error);
    if (error.response.status == "400") {
      Swal.fire({
        icon: "warning",
        title: "Timings Overlapping",
        text: "Times set are overlapping with existing ones",
      });
    }
  }
}

export async function getSetSlots(doctor) {
  try {
    const { _id,date } = doctor;
    console.log(`_id ${doctor}`);
    const resp = await axios.post("http://localhost:5000/api/doctor/slots", {
      _id,date
    });
    console.log(resp);
    return resp.data.setSlots;
  } catch (error) {
    console.log(error);
  }
}

export async function getBookedPatients(doctor) {
  try {
    const { doctorId } = doctor;
    const resp = await axios.post(
      "http://localhost:5000/api/doctor/confirmedSlots",
      { _id:doctorId }
    );
    console.log(resp.data)
    return resp.data.bookedSlots
  } catch (error) {
    console.log(error);
  }
}

export async function deleteSlot(slotDetails) {
  try {

    const resp=await axios.post("http://localhost:5000/api/doctor/deleteSlot",slotDetails)
    await Swal.fire({
      icon:"question",
      title:"Confirm Deletion",
      text:"Please confirm Deletion of the slot",
      confirmButtonText:"Delete",
      showCancelButton:true

    }).then((result)=>{
      if(result.isConfirmed){
        Swal.fire("Slot Deleted Successfully","","success")
      }
    })
    
  } catch (error) {
    Swal.fire(
      {
        icon:"error",
        title:"A patient has already booked the slot",
        text:"The slot has been already been booked thus can't be cancelled"
      }
    )
    console.log(error)
  }
  
}

export async function getAllReviewsForADoctor({doctorId}){
  try {
    const resp=await axios.post("http://localhost:5000/api/doctor/getAllReviewsForADoctor",{doctorId})
    console.log(resp.data)
    return resp.data.allReviews
  } catch (error) {
    console.log(error)
  }
}
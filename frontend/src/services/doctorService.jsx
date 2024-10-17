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
    console.log(error)
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

    console.log(`doctor Details fetchedDoctorData.data.doctorDetails`)

    return fetchedDoctorData.data.doctorDetails;
  } catch (error) {
    console.log(`error ${error}`);
  }
}

export async function AddSlot(slot) {
  try {

    const resp=await axios.post('http://localhost:5000/api/doctor/addSlot',slot)
    console.log(`resp ${resp}`)
    Swal.fire(
      {
        icon:"success",
        title:"Slot added successfully",
        text:"The slot has been added successfully"

      }
    )
    
  } catch (error) {
    console.log(error)
    if(error.response.status=="400"){
      Swal.fire({
        icon:"warning",
        title:"Timings Overlapping",
        text:"Times set are overlapping with existing ones"
      })
    }
  }
  
}

export async function getSetSlots(doctor) {
  try {

    const {_id}=doctor
    console.log(`_id ${doctor}`)
    const resp=await axios.post('http://localhost:5000/api/doctor/slots',{_id})
    console.log(resp)
    return resp.data.setSlots

    
  } catch (error) {
    console.log(error)
    
  }
  
}

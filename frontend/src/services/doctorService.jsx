import axios from "axios";
import Swal from "sweetalert2";
export async function getAllDoctors() {
  try {
    const resp = await axios.get(
      "http://localhost:5000/api/doctor/getAllDoctors"
    );
    // console.log(resp.data.allDoctors)
    return resp.data.allDoctors;
  } catch (error) {}
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

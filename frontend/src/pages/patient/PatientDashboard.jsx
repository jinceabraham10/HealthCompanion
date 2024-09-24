import React, { useEffect, useState } from "react";
import NavBar from "../../components/patient/naviagationBar/NavBar";
import PatientDoctorPage from "./doctorPage/PatientDoctorPage";
import MedicinePage from "./medicinePage/MedicinePage";
import axios from "axios";

function PatientDashboard() {
  return(
   <div className="patient-dashboard-parent">
    <NavBar/>
    {/* <PatientDoctorPage/> */}
    <MedicinePage/>

    
   </div>
  )
}

export default PatientDashboard;

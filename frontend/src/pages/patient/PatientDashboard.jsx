import React, { useEffect, useState } from "react";
import NavBar from "../../components/patient/naviagationBar/NavBar";
import axios from "axios";
function PatientDashboard() {
  return(
   <div className="patient-dashboard-parent">
    <NavBar/>
    
   </div>
  )
}

export default PatientDashboard;

import React, { useEffect, useState } from "react";
import NavBar from "../../components/patient/naviagationBar/NavBar";
import PatientDoctorPage from "./doctorPage/PatientDoctorPage";
import ResponsiveAppBar from "../../components/patient/responsiveNavBar/ResponsiveAppBar";
import MedicinePage from "./medicinePage/MedicinePage";
import {DataOnPageLoad} from "../.././services/authService"
import swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";


function PatientDashboard() {
  const navigate=useNavigate()
  const [userData,setUserData]=useState(undefined)
  const [Opened,setOpened]=useState({
    Doctors:true,
  })

  const load=async ()=>{
    await setUserData(await DataOnPageLoad(localStorage.getItem('token'),0))
  }

  useEffect(()=>{
    const token =localStorage.getItem('token')
    if(token){
     load()
   }
   else{
    swal.fire({
      'icon':'error',
      'title':'Please  Login',
      'text':'Please Login to use the services offered'
    })
    navigate('/login')
   }
  },[])

  return(
   <div className="patient-dashboard-parent">
    <ResponsiveAppBar setOpened={setOpened} />
    {/* <NavBar/> */}
    {(Opened.Doctors)&&<PatientDoctorPage/>}
    {(Opened.Medicines)&&<MedicinePage/>}


    
   </div>
  )
}

export default PatientDashboard;

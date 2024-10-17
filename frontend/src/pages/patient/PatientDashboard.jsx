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
    const user=await DataOnPageLoad(localStorage.getItem('token'),0)
    await setUserData(user)
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
   <div className="w-full h-full">
    <div className="fixed w-full top-0">
    <ResponsiveAppBar  setOpened={setOpened} />
    </div>
    <div className="mt-52 ml-10 mr-10">
    {(Opened.Doctors)&&(userData)&&<PatientDoctorPage patient={userData}/>}
    {(Opened.Medicines)&&<MedicinePage/>}
    {/* <NavBar/> */}
    </div>
   


    
   </div>
  )
}

export default PatientDashboard;

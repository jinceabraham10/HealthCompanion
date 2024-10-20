import React, { useEffect, useState } from "react";
import NavBar from "../../components/patient/naviagationBar/NavBar";
import PatientDoctorPage from "./doctorPage/PatientDoctorPage";
import ResponsiveAppBar from "../../components/patient/responsiveNavBar/ResponsiveAppBar";
import MedicinePage from "./medicinePage/MedicinePage";
import {DataOnPageLoad} from "../.././services/authService"
import swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import CustomNavBar from "./navBar/CustomNavBar";
import PatientProfile from "./profile/PatientProfile";


function PatientDashboard() {
  const navigate=useNavigate()
  const [userData,setUserData]=useState(undefined)
  const [Opened,setOpened]=useState({
    Doctors:true,
  })

  const load=async ()=>{
    const user=await DataOnPageLoad(localStorage.getItem('token'),0)
    if(!user){
      navigate('/login')
    }
    await setUserData(user)
  }

  useEffect(()=>{
    const token =localStorage.getItem('token')
    if(token){
     load()
   }
   else{
    navigate('/login')
    swal.fire({
      'icon':'error',
      'title':'Please  Login',
      'text':'Please Login to use the services offered'
    })
   }
  },[])

  return(
   <div className="w-full h-full overflow-hidden">
    <div className="fixed border shadow-lg w-full top-0 bg-gray-100 border-b-red-900  ">
    {/* <ResponsiveAppBar  setOpened={setOpened} /> */}
    <CustomNavBar setOpened={setOpened}/>
    </div>
    <div className="mt-56 ml-10 mr-10 h-full">
    {(Opened.Doctors)&&(userData)&&<PatientDoctorPage patient={userData}/>}
    {(Opened.Medicines)&&<MedicinePage/>}
    {/* <NavBar/> */}
    {(Opened.profile) && <PatientProfile/>}
    </div>
   


    
   </div>
  )
}

export default PatientDashboard;

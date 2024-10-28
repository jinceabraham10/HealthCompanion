import React, { useEffect, useState } from "react";
import { getAdminDetails } from "../../../services/adminService"
import { DataOnPageLoad } from "../../../services/authService";
import { CSidebar, CNavItem, CSidebarNav, CNavGroup } from "@coreui/react";
import { CIcon } from "@coreui/icons-react";
import { Avatar } from "flowbite-react";
import DoctorVerificationRequests from "../verifications/doctor/DoctorVerificationRequests";
import {
  cilSpeedometer,
  cilPuzzle,
  cilDescription,
  cilTask,
  cilChevronBottom,
  cilChevronTop,
} from "@coreui/icons";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {

  const navigate=useNavigate()


  const[fetchedData,setFetchedData]=useState(null)
  const[fetchedAdminData,setFetchedAdminData]=useState(null)
  const[profileImage,setProfileImage]=useState(null)
  const [opened,setOpened]=useState(null)

  const load=async ()=>{
    const tempdata=await DataOnPageLoad(sessionStorage.getItem('token'),4);
    if(tempdata==null){
      navigate('/login')
    }
    await setFetchedData(tempdata)
  
  }

  

useEffect(()=>{
  load()
  console.log(fetchedData)
},[])




  return (
    <div className="flex h-screen">
      <SidenavBar setOpened={setOpened} />
      <div className="p-5 w-full ml-64">
      <h1 className="text-xl font-bold">Welcome to the Admin Dashboard</h1>
        <Header/>
        {(opened=="verificationRequests") && <DoctorVerificationRequests/>}
      </div>
    </div>
  );
}

function SidenavBar(props) {
  // State to handle the dropdown visibility
  const [showMoreOptions, setShowMoreOptions] = useState(false);

  return (
    <div className="min-h-screen fixed bg-gray-800" id="id_adminDashboard">
    <CSidebar className="w-64 text-white shadow-lg">
      <CSidebarNav className="space-y-3 mt-20 ml-6">
        <CNavItem >
          <button className="flex flex-row gap-5 items-center" onClick={() => setShowMoreOptions(!showMoreOptions)}>
            Doctors{" "}
            <CIcon
              customClassName="w-4"
              icon={showMoreOptions ? cilChevronTop : cilChevronBottom}
              className="w-4"
            />
          </button>
        </CNavItem>
        {showMoreOptions && (
          <div className="relative flex flex-col gap-4 m-2">
            <CNavItem ><button className="hover:bg-red-600" onClick={()=>props.setOpened('verificationRequests')} >Verification Requests</button></CNavItem>
            <CNavItem ><button className="hover:bg-red-600">All Doctors</button></CNavItem>
          </div>
        )}
      </CSidebarNav>
    </CSidebar>
    </div>
  );
}

function Header(props){
  return (
    <div className="flex flex-row min-w-screen p-5 bg-green-300 rounded-lg justify-between m-4 ">
      <div className="w-40">
        <img src="logo/LogoPlain.png" alt="logo" />
      </div>
      <div className="relative top-3 right-10">
        <Avatar
          bordered
          rounded
          color="pink"
          status="online"
          statusPosition="bottom-right"
          img=""
          size="lg"
        />
        {/* {<p className="text-red-600 text-center">{(props.fetchedData)?props.fetchedData.username:""}</p>} */}
      </div>
    </div>
  );
}

export default AdminDashboard;

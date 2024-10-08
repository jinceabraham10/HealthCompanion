import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DoctorVerificationForm1 from "../doctorVerificationForm1/DoctorVerificationForm1";
import { Sidebar } from "flowbite-react";
import { Avatar } from "flowbite-react";
import LockIcon from "@mui/icons-material/Lock";
import { DataOnPageLoad } from "../../../services/authService";
import { loadDoctorData } from "../../../services/doctorService";

import Login from "../../../components/login/Login";

function DoctorDashboard() {
  const navigate = useNavigate();
  const [opened, setOpened] = useState("verificationForm");
  const [isVerified, setIsVerified] = useState(false);

  const handleItemClick = (option) => {
    setOpened(option);
    console.log(verified);
  };
  const [fetchedData,setFetchedData]=useState(undefined)
  const [fetchedDoctorDetails,setFetchedDoctorDetails]=useState(null)
  // console.log(fetchedData)

  let userName;

  const load=async ()=>{
    const token=localStorage.getItem('token')
    const fet=await DataOnPageLoad(token)
    await setFetchedData(fet)
    await setFetchedDoctorDetails(await loadDoctorData({userId:fet._id}))
    
  }

  useEffect(()=>{
    load()
  },[])



  useEffect(()=>{
    if(fetchedDoctorDetails){
      if(fetchedDoctorDetails.verificationStatus=="3")
        setIsVerified(true)
    }
 
   },[fetchedDoctorDetails])



  return (
    <>
      <div className="h-screen w-64 fixed top-0 left-0 ">
        <Sidebar className="h-screen flex flex-col ">
          <Sidebar.Items className="flex-grow h-full">
            <Sidebar.ItemGroup className="space-y-10 flex flex-col justify-evenly   ">
              <Sidebar.Item>
                <button onClick={() => handleItemClick("verificationForm")}>
                  verification form
                </button>
              </Sidebar.Item>
              <Sidebar.Item>
                <div className="flex flex-row space-x-4">
                  <button
                    onClick={() => handleItemClick("loginPage")}
                    disabled={!isVerified}
                  >
                    DashBoard
                  </button>
                  <span>{!isVerified && <LockIcon />}</span>
                </div>
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      </div>

      <div className="relative ml-64 fixed overflow-x-hidden">
        <div className="ml-2 mt-2">
        <HeaderBar fetchedData={fetchedData}  />
        </div>
        <div >
        {opened == "verificationForm" && (fetchedData) &&<DoctorVerificationForm1 fetchedData={fetchedData}/>}
        {opened == "loginPage" && <Login />}
        </div>
      </div>
    </>
  );
}

function HeaderBar(props) {
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
          img="logo/doctor.png"
          size="lg"
        />
        {<p className="text-red-600 text-center">{(props.fetchedData)?props.fetchedData.username:""}</p>}
      </div>
    </div>
  );
}

export default DoctorDashboard;

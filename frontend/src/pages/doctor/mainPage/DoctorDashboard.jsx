import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DoctorVerificationForm1 from "../doctorVerificationForm1/DoctorVerificationForm1";
import { Sidebar } from "flowbite-react";
import LockIcon from '@mui/icons-material/Lock';
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
} from "react-icons/hi";

import Login from "../../../components/login/Login";

function DoctorDashboard() {
  const navigate = useNavigate();
  const [opened, setOpened] = useState("verificationForm");
  const [isVerified,setIsVerified]=useState(false)

  const handleItemClick = (option) => {
    setOpened(option);
  };

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
              <Sidebar.Item >
                <button
                  onClick={() => handleItemClick("loginPage")}
                  disabled={true} >
                  DashBoard
                  {(!isVerified) && <LockIcon/>}
                </button>
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      </div>
      <div className="relative ml-64 fixed overflow-x-hidden">
        {opened == "verificationForm" && <DoctorVerificationForm1 />}
        {opened == "loginPage" && <Login />}
      </div>
    </>
  );
}

export default DoctorDashboard;

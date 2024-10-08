import React, { useState } from "react";
import { CSidebar, CNavItem, CSidebarNav, CNavGroup } from "@coreui/react";
import { CIcon } from "@coreui/icons-react";
import { Avatar } from "flowbite-react";
import {
  cilSpeedometer,
  cilPuzzle,
  cilDescription,
  cilTask,
  cilChevronBottom,
  cilChevronTop,
} from "@coreui/icons";

function AdminDashboard() {
  const[fetchedData,setFetchedData]=useState(null)
  const[fetchedAdminData,setFetchedAdminData]=useState(null)
  const[profileImage,setProfileImage]=useState(null)
  return (
    <div className="flex h-screen">
      <SidenavBar />
      <div className="p-5 w-full">
      <h1 className="text-xl font-bold">Welcome to the Admin Dashboard</h1>
        <Header/>
      </div>
    </div>
  );
}

function SidenavBar() {
  // State to handle the dropdown visibility
  const [showMoreOptions, setShowMoreOptions] = useState(false);

  return (
    <CSidebar className="w-64 bg-gray-800 text-white shadow-lg">
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
            <CNavItem ><button className="hover:bg-red-600">Verification Requests</button></CNavItem>
            <CNavItem ><button className="hover:bg-red-600">All Doctors</button></CNavItem>
          </div>
        )}
      </CSidebarNav>
    </CSidebar>
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

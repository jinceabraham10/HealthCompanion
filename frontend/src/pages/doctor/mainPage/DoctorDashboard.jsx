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
  };
  const [fetchedData, setFetchedData] = useState(undefined);
  const [fetchedDoctorDetails, setFetchedDoctorDetails] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  // console.log(fetchedData)

  let userName;

  const load = async () => {
    const token = localStorage.getItem("token");
    const fet = await DataOnPageLoad(token);
    await setFetchedData(fet);
    const doctorFet = await loadDoctorData({ userId: fet._id });
    // console.log(`doctor fet ${JSON.stringify(doctorFet.profileImage)}`)
    await setFetchedDoctorDetails(doctorFet.doctorDetails);
    await setProfileImage(`data:image/jpeg;base64,${doctorFet.profileImage}`);
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    console.log(`image ${profileImage}`);
  }, [profileImage]);

  useEffect(() => {
    if (fetchedDoctorDetails) {
      if (fetchedDoctorDetails.verificationStatus == "0") setIsVerified(true);
    }
    console.log(fetchedDoctorDetails);
  }, [fetchedDoctorDetails]);

  return (
    <>
      <div className="h-screen w-64 fixed top-0 left-0 bg-slate-700 ">
        <Sidebar className="h-screen flex flex-col bg-slate-700 justify-evenly ">
          <Sidebar.Items className="flex-grow h-full">
            <Sidebar.ItemGroup className="space-y-10 flex flex-col justify-evenly bg-yellow-300 ">
              {fetchedDoctorDetails &&
                fetchedDoctorDetails.verificationStatus == "1" && (
                  <Sidebar.Item className="flex-grow text-center outline-blue ">
                    <button onClick={() => handleItemClick("verificationForm")}>
                      verification form
                    </button>
                  </Sidebar.Item>
                )}

              <Sidebar.Item className="flex-grow ">
                <div className="flex flex-row space-x-4 justify-center">
                  <button
                    onClick={() => handleItemClick("loginPage")}
                    disabled={!isVerified}
                  >
                    Patients
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
          {profileImage && (
            <HeaderBar fetchedData={fetchedData} profileImage={profileImage} />
          )}
        </div>
        {fetchedDoctorDetails &&
          fetchedDoctorDetails.verificationStatus == "1" && (
            <p className="relative left-20 text-red-600 font-bold">
              *&emsp;Form has been Submitted for verification...Will be notified
              through the email the successfull verification
            </p>
          )}

        <div>
          {opened == "verificationForm" &&
            fetchedData &&
            fetchedDoctorDetails &&
            fetchedDoctorDetails.verificationStatus != "0" &&
            fetchedDoctorDetails.verificationStatus != "3" && (
              <DoctorVerificationForm1
                fetchedData={fetchedData}
                fetchedDoctorDetails={fetchedDoctorDetails}
              />
            )}
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
          img={props.profileImage}
          size="lg"
        />
        {
          <p className="text-red-600 text-center">
            {props.fetchedData ? props.fetchedData.username : ""}
          </p>
        }
      </div>
    </div>
  );
}

export default DoctorDashboard;

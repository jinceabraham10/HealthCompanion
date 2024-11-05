import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DoctorVerificationForm1 from "../doctorVerificationForm1/DoctorVerificationForm1";
import { Sidebar } from "flowbite-react";
import { Avatar } from "flowbite-react";
import LockIcon from "@mui/icons-material/Lock";
import { DataOnPageLoad } from "../../../services/authService";
import { loadDoctorData } from "../../../services/doctorService";
import BookingSlots from "../slot/BookingSlots";
import Modal from "react-modal";

import Login from "../../../components/login/Login";
import BookedPatients from "../bookedPatients/BookedPatients";
import BookingSlots1 from "../slot/BookingSlots1";

function DoctorDashboard() {
  const navigate = useNavigate();
  const [opened, setOpened] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOptionsOpened, setIsOptionsOpened] = useState(false);

  const handleItemClick = (option) => {
    setOpened(option);
  };
  const [fetchedData, setFetchedData] = useState(undefined);
  const [fetchedDoctorDetails, setFetchedDoctorDetails] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  // console.log(fetchedData)

  let userName;

  const load = async () => {
    const token = sessionStorage.getItem("token");
    const fet = await DataOnPageLoad(token, 1);
    if(!fet){
      navigate('/home')
    }
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
      else if (fetchedDoctorDetails.verificationStatus == "3") {
        setIsModalOpen(true);
      }
    }
    console.log(fetchedDoctorDetails);
  }, [fetchedDoctorDetails]);

  return (
    <div className="min-h-full">
      <ModalPopup isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />

      <div className="fixed w-screen top-0 z-50 bg-gray-100 p-4 h-[20%] border border-b-green-950 z-50 ">
          {profileImage && (
            <HeaderBar
              fetchedData={fetchedData}
              profileImage={profileImage}
              setIsOptionsOpened={setIsOptionsOpened}
              isOptionsOpened={isOptionsOpened}
            />
          )}
        </div>

      <div className="fixed mt-40 h-full">
        <Sidebar className="h-full">
          <Sidebar.Items className="h-full">
            <Sidebar.ItemGroup className="h-full flex flex-col gap-4">
              {fetchedDoctorDetails &&
                (fetchedDoctorDetails.verificationStatus == "1" ||
                  fetchedDoctorDetails.verificationStatus == "2"||
                  fetchedDoctorDetails.verificationStatus == "3") && (
                  <Sidebar.Item className="font-bold">
                    <button onClick={() => handleItemClick("verificationForm")}>
                      verification form
                    </button>
                  </Sidebar.Item>
                )}
              <Sidebar.Item className="font-bold">
                <div className="flex flex-row gap-5">
                  <button
                    onClick={() => navigate("/doctorDashboard")}
                    disabled={!isVerified}
                  >
                    Home
                  </button>
                  <span>{!isVerified && <LockIcon />}</span>
                </div>
              </Sidebar.Item>
              <Sidebar.Collapse label="Slots" id="id_btnSlotOption" className="font-bold">
                <Sidebar.Item className="font-bold">
                <div className="flex flex-row gap-5">
                  <button
                    onClick={() => handleItemClick("slots")}
                    disabled={!isVerified}
                    id="id_btnSetSlot"
                  >
                    Set Slot
                  </button>
                  <span>{!isVerified && <LockIcon />}</span>
                </div>
                </Sidebar.Item>
                <Sidebar.Item className="font-bold">
                <div className="flex flex-row gap-5">
                  <button
                    onClick={() => handleItemClick("bookedPatients")}
                    disabled={!isVerified}
                  >
                    Booked Patients
                  </button>
                  <span>{!isVerified && <LockIcon />}</span>
                </div>
                </Sidebar.Item>
                
              </Sidebar.Collapse>

              <Sidebar.Collapse label="Patients" className="font-bold">
                <Sidebar.Item className="font-bold">
                  <div className="flex flex-row gap-5">
                    <button
                      onClick={() => handleItemClick("loginPage")}
                      disabled={!isVerified}
                    >
                      Bookings
                    </button>
                    <span>{!isVerified && <LockIcon />}</span>
                  </div>
                </Sidebar.Item>
              </Sidebar.Collapse>

              <Sidebar.Item className="font-bold">
                <div className="flex flex-row gap-5">
                  <button
                    onClick={() => handleItemClick("loginPage")}
                    disabled={!isVerified}
                  >
                    Laboratory
                  </button>
                  <span>{!isVerified && <LockIcon />}</span>
                </div>
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      </div>
      

      <div className="ml-72 mt-40 pl-4 pt-5 h-[80%]">
        
        {/* {!opened && fetchedData && (
          <h1 className="text-center font-bold text-blue-500 weight-20 text-2xl">
            Welcome{" "}
            {fetchedDoctorDetails
              ? fetchedDoctorDetails.firstName
              : fetchedData.username}
          </h1>
        )} */}

        {fetchedDoctorDetails &&
          fetchedDoctorDetails.verificationStatus == "1" && (
            <p className="relative left-20 text-red-600 font-bold">
              *&emsp;Form has been Submitted for verification...Will be notified
              through the email the successfull verification
            </p>
          )}

        {fetchedDoctorDetails &&
          fetchedDoctorDetails.verificationStatus == "3" && (
            <p className="relative left-20 text-red-600 font-bold">
              *&emsp;Application Form has been rejected
            </p>
          )}

        <div className="h-full">
          {opened == "verificationForm" &&
            fetchedData &&
            fetchedDoctorDetails &&
            fetchedDoctorDetails.verificationStatus != "0" && (
              <DoctorVerificationForm1
                fetchedData={fetchedData}
                fetchedDoctorDetails={fetchedDoctorDetails}
              />
            )}
          {opened == "slots" &&
            fetchedData &&
            fetchedDoctorDetails &&
            fetchedDoctorDetails.verificationStatus == "0" && <BookingSlots1 fetchedDoctorDetails={fetchedDoctorDetails} fetchedData={fetchedData} />}
          
          {opened == "bookedPatients" &&
            fetchedData &&
            fetchedDoctorDetails &&
            fetchedDoctorDetails.verificationStatus == "0" && <BookedPatients fetchedDoctorDetails={fetchedDoctorDetails} fetchedData={fetchedData} />}
          {opened == "loginPage" && <Login />}
        </div>
      </div>
    </div>
  );
}

function HeaderBar(props) {
  const navigate = useNavigate();
  return (
    <div className="min-w-full flex flex-row justify-between z-50 ">
      <div className="w-40">
        <img src="logo/LogoPlain.png" alt="logo" />
      </div>
      <span className="font-bold text-2xl text-emerald-500 min-h-full flex flex-col justify-center items-center">
        Welcome {props.fetchedData ? props.fetchedData.username : ""} 
      </span>


      <div className="relative top-3 right-10">
        <Avatar
          bordered
          rounded
          color="pink"
          status="online"
          statusPosition="bottom-right"
          img={props.profileImage}
          size="lg"
          onClick={() => props.setIsOptionsOpened(!props.isOptionsOpened)}
        />

        {
          <p className="text-red-600 text-center">
            {props.fetchedData ? props.fetchedData.username : ""}
          </p>
        }

        {props.isOptionsOpened && (
          <div className="w-40 flex flex-col gap-4 absolute top-10 right-7 p-2 rounded-lg pg z-40 bg-slate-300">
            <button className="grow hover:bg-white">Profile</button>
            <button
              className="grow hover:bg-white"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/home");
              }}
            >
              Log out
            </button>
          </div>
        )}
      </div>


    </div>
  );
}

function ModalPopup(props) {
  return (
    <div className="flex flex-col h-full w-full justify-center items-center">
      <Modal
        isOpen={props.isModalOpen}
        onRequestClose={() => props.setIsModalOpen(false)}
        className="w-1/2 h-1/2 bg-white rounded-2xl p-10"
        overlayClassName="fixed w- inset-0 bg-gray-900 bg-opacity-70 flex justify-center items-center"
      >
        <div className="flex flex-col gap-10 items-center">
          <h1 className="text-red-800 font-bold text-center">
            Profile Rejected
          </h1>

          <h3 className="font-bold">
            Your verification form has been rejected
          </h3>
          <h3 className="font-bold text-yellow-300">
            * Either Submit the form with valid documents again
          </h3>
        </div>
      </Modal>
    </div>
  );
}

export default DoctorDashboard;

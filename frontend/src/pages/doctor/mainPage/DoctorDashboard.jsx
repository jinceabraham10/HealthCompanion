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
    const token = localStorage.getItem("token");
    const fet = await DataOnPageLoad(token, 1);
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
    <div className="h-full">
      <ModalPopup isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />

      <div className="h-screen w-64 fixed top-0 left-0 bg-slate-700">
        <Sidebar className="h-screen flex flex-col bg-slate-700 justify-evenly">
          <Sidebar.Items className="flex-grow h-full ">
            <Sidebar.ItemGroup className="space-y-10 h-full flex flex-col justify-center  p-2 bg-yellow-300">
              {fetchedDoctorDetails &&
                (fetchedDoctorDetails.verificationStatus == "1" ||
                  fetchedDoctorDetails.verificationStatus == "2"||
                  fetchedDoctorDetails.verificationStatus == "3") && (
                  <Sidebar.Item className="flex-grow text-center outline-blue mt-2 ">
                    <button onClick={() => handleItemClick("verificationForm")}>
                      verification form
                    </button>
                  </Sidebar.Item>
                )}
              <Sidebar.Item className="flex-grow">
                <div className="flex flex-row space-x-4 justify-center bg-slate-200">
                  <button
                    onClick={() => navigate("/doctorDashboard")}
                    disabled={!isVerified}
                  >
                    Home
                  </button>
                  <span>{!isVerified && <LockIcon />}</span>
                </div>
              </Sidebar.Item>
              <Sidebar.Item className="flex-grow">
                <div className="flex flex-row space-x-4 justify-center bg-slate-200">
                  <button
                    onClick={() => handleItemClick("slots")}
                    disabled={!isVerified}
                  >
                    Booking Slot
                  </button>
                  <span>{!isVerified && <LockIcon />}</span>
                </div>
              </Sidebar.Item>

              <Sidebar.Collapse label="Patients" className="bg-slate-300">
                <Sidebar.Item className="flex-grow">
                  <div className="flex flex-row space-x-4 justify-center">
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

              <Sidebar.Item className="flex-grow">
                <div className="flex flex-row space-x-4 justify-center bg-slate-200">
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

      <div className="relative ml-64">
        <div className="ml-2 mt-2">
          {profileImage && (
            <HeaderBar
              fetchedData={fetchedData}
              profileImage={profileImage}
              setIsOptionsOpened={setIsOptionsOpened}
              isOptionsOpened={isOptionsOpened}
            />
          )}
        </div>

        {!opened && fetchedData && (
          <h1 className="text-center font-bold text-blue-500 weight-20 text-2xl">
            Welcome{" "}
            {fetchedDoctorDetails
              ? fetchedDoctorDetails.firstName
              : fetchedData.username}
          </h1>
        )}

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
            fetchedDoctorDetails.verificationStatus == "0" && <BookingSlots fetchedDoctorDetails={fetchedDoctorDetails} fetchedData={fetchedData} />}
          {opened == "loginPage" && <Login />}
        </div>
      </div>
    </div>
  );
}

function HeaderBar(props) {
  const navigate = useNavigate();
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
                navigate("/login");
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

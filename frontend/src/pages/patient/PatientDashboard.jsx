import React, { useEffect, useState } from "react";
import NavBar from "../../components/patient/naviagationBar/NavBar";
import PatientDoctorPage from "./doctorPage/PatientDoctorPage";
import ResponsiveAppBar from "../../components/patient/responsiveNavBar/ResponsiveAppBar";
import MedicinePage from "./medicinePage/MedicinePage";
import { DataOnPageLoad } from "../.././services/authService";
import swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import CustomNavBar from "./navBar/CustomNavBar";
import PatientProfile from "./profile/PatientProfile";
import axios from "axios";
import BookedSlots from "./bookedSlots/BookedSlots";
import BookingPage from "./bookingPage/BookingPage";
import ConsultationSoon from "./consultationSoon/ConsultationSoon";
import { convertTo12Hour } from "../doctor/slot/BookingSlots";
import CompletedSlots from "./completedSlots/CompletedSlots";
import FooterPatient from "./footer/FooterPatient";

function PatientDashboard() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(undefined);
  const [patientData, setPatientData] = useState(undefined);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [openBookingSlot, setOpenBookingSlot] = useState(false);
  const [consultationIn30, setConsultationIn30] = useState(null);

  const [Opened, setOpened] = useState({
    Doctors: true,
  });

  const load = async () => {
    const user = await DataOnPageLoad(sessionStorage.getItem("token"), 0);
    if (!user) {
      navigate("/home");
    }
    const resp = await axios.post(
      "http://localhost:5000/api/user/loadData/profile/patient",
      { userId: user._id }
    );
    const fetchedPatientData = resp.data.fetchedPatientData;
    await setPatientData(fetchedPatientData);
    await setUserData(user);
  };

  const checkConsultationIn30 = async () => {
    const ws = new WebSocket("http://localhost:5000");
    ws.onopen = () => {
      console.log("Started connecting to the backend");
      ws.send(JSON.stringify({ type: "register", _id: patientData._id }));
    };

    ws.onmessage = async (event) => {
      const dataReceived = JSON.parse(event.data);
      await console.log(`data receieved ${JSON.stringify(dataReceived)}`);
      await setConsultationIn30(dataReceived.slots);
    };
  };

  useEffect(() => {
    if (patientData) {
      checkConsultationIn30();
    }
  }, [patientData]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      load();
    } else {
      navigate("/home");
      swal.fire({
        icon: "error",
        title: "Please  Login",
        text: "Please Login to use the services offered",
      });
    }
  }, []);

  useEffect(() => {
    if (consultationIn30) {
      swal.fire({
        icon: "warning",
        text: `Meeting with Dr ${consultationIn30.doctorId.firstName} ${consultationIn30.doctorId.lastName} in 30 min`,
        title: "Meeting in 30 min",
      });
    }
  }, [consultationIn30]);

  return (
    <div className="w-full h-full overflow-hidden">
      <div className="fixed border shadow-lg w-full h-[15%] bg-gray-100 border-b-red-900 z-50">
        {/* <ResponsiveAppBar  setOpened={setOpened} /> */}
        {patientData && (
          <CustomNavBar
            setOpened={setOpened}
            patientData={patientData}
            setOpenBookingSlot={setOpenBookingSlot}
            setConsultationIn30={setConsultationIn30}
            consultationIn30={consultationIn30}
            checkConsultationIn30={checkConsultationIn30}
            Opened={Opened}
          />
        )}
      </div>
      <div className="mt-40 overflow-y-auto px-10 py-5 h-[calc(100vh - 80px)]">
        {Opened.Doctors && userData && !openBookingSlot && (
          <PatientDoctorPage
            patient={userData}
            patientData={patientData}
            setSelectedDoctor={setSelectedDoctor}
            setOpenBookingSlot={setOpenBookingSlot}
            selectedDoctor={selectedDoctor}
          />
        )}
        {Opened.Doctors && userData && openBookingSlot && selectedDoctor && (
          <BookingPage
            doctor={selectedDoctor}
            patient={patientData}
            setOpenBookingSlot={setOpenBookingSlot}
          />
        )}
        {Opened.Medicines && <MedicinePage />}
        {/* <NavBar/> */}
        {Opened.profile && <PatientProfile patient={userData} />}

        {Opened.bookedSlots && userData && (
          <BookedSlots patient={userData} patientData={patientData} />
        )}

        {Opened.consultationToday && userData && (
          <ConsultationSoon
            patient={userData}
            patientData={patientData}
            consultationIn30={consultationIn30}
          />
        )}

        {Opened.CompletedSlot && userData && (
          <CompletedSlots
            patient={userData}
            patientData={patientData}
            consultationIn30={consultationIn30}
          />
        )}
        
        
      </div>
      {/* <FooterPatient/> */}
    </div>
  );
}

export default PatientDashboard;

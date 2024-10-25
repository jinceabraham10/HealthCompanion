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

function PatientDashboard() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(undefined);
  const [patientData, setPatientData] = useState(undefined);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [openBookingSlot, setOpenBookingSlot] = useState(false);
  const [Opened, setOpened] = useState({
    Doctors: true,
  });

  const load = async () => {
    const user = await DataOnPageLoad(localStorage.getItem("token"), 0);
    if (!user) {
      navigate("/login");
    }
    const resp = await axios.post(
      "http://localhost:5000/api/user/loadData/profile/patient",
      { userId: user._id }
    );
    const fetchedPatientData = resp.data.fetchedPatientData;
    await setPatientData(fetchedPatientData);
    await setUserData(user);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      load();
    } else {
      navigate("/login");
      swal.fire({
        icon: "error",
        title: "Please  Login",
        text: "Please Login to use the services offered",
      });
    }
  }, []);

  return (
    <div className="w-full h-full overflow-hidden">
      <div className="fixed border shadow-lg w-full h-[15%] bg-gray-100 border-b-red-900 z-50">
        {/* <ResponsiveAppBar  setOpened={setOpened} /> */}
        {patientData && (
          <CustomNavBar
            setOpened={setOpened}
            patientData={patientData}
            setOpenBookingSlot={setOpenBookingSlot}
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
          <ConsultationSoon patient={userData} patientData={patientData} />
        )}
      </div>
    </div>
  );
}

export default PatientDashboard;

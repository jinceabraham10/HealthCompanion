import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PatientDashboard from "./pages/patient/PatientDashboard";
import Login from "./components/login/Login";
import RegisterationPage from "./pages/registeration/RegisterationPage";
import DoctorVerificationForm from "./pages/doctor/doctorVerificationForm/DoctorVerificationForm";
import BookingPage from "./pages/patient/bookingPage/BookingPage";
import DoctorVerificationForm1 from "./pages/doctor/doctorVerificationForm1/DoctorVerificationForm1";
import DoctorDashboard from "./pages/doctor/mainPage/DoctorDashboard";
import AdminDashboard from "./pages/admin/dashboard/AdminDashboard";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<PatientDashboard/>} />
          <Route path="/register" element={<RegisterationPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/bookPage" element={<BookingPage />} />


          <Route path="/doctor" element={<BookingPage />} />
          <Route path="/doctorVerificationForm" element={<DoctorVerificationForm1/>}/>
          <Route path="/doctorDashboard" element={<DoctorDashboard/>}/>
          <Route path="/adminDashboard" element={<AdminDashboard/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;

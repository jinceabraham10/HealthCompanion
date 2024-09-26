import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PatientDashboard from "./pages/patient/PatientDashboard";
import Login from "./components/login/Login";
import RegisterationPage from "./pages/registeration/RegisterationPage";
import DoctorVerificationForm from "./pages/doctor/doctorVerificationForm/DoctorVerificationForm";
import BookingPage from "./pages/patient/bookingPage/BookingPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<PatientDashboard/>} />
          <Route path="/register" element={<RegisterationPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/doctorVerificationForm" element={<DoctorVerificationForm/>}/>
          <Route path="/bookPage" element={<BookingPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

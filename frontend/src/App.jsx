import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PatientDashboard from "./pages/patient/PatientDashboard";
import Login from "./components/Login";
import RegisterationPage from "./pages/RegisterationPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<RegisterationPage />} />
          <Route path="/patient" element={<PatientDashboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

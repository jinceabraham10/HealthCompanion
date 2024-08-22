import React from "react";
import "../styles/registeration/RegisterationPageStyle.css";

function RegisterationPage() {
  return (
    <div className="registeration-parent">
      <form action="">
        <RoleBlock />
        <CommonUserDetails />
      </form>
    </div>
  );
}

function CommonUserDetails() {
  return (
    <div>
      {/* <input
        type="text"
        name="username"
        id="id_username"
        placeholder="Enter a Username"
      />
      <input
        type="password"
        name="password"
        id="id_password"
        placeholder="Enter the Password"
      />
      <input
        type="password"
        name="confirmPassword"
        id="id_confirmPassword"
        placeholder="Confirm Password"
      />
      <input type="text" name="email" id="id_email" placeholder="Email" />
      <input type="text" name="phone" id="id_phone" placeholder="Phone" />
      <input type="submit" value="Sign Up" name="signUp" id="id_signUp" /> */}
    </div>
  );
}

function RoleBlock() {
  return (
    <div className="role-block-parent">
      <div className="role-image-container">
        <img src="/logo/Role.png" alt="user" />
        <span>Role</span>
      </div>
      <div className="role-drop-down-container">
      <select name="role" id="id_role">
        <option value="patient">Patient</option>
        <option value="doctor">Doctor</option>
        <option value="pharmacy">Patient</option>
        <option value="laboratory">Laboratory</option>
      </select>
      </div>
      
    </div>
  );
}

export default RegisterationPage;

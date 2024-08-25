import React, { useState } from "react";
import "../styles/registeration/RegisterationPageStyle.css";
import { createUser } from "../services/userService";

function RegisterationPage() {
  const [userData, setUserdata] = useState({
    username: "",
    password: "",
    email: "",
    phone: "",
    role:"patient",
  });

  const handleSignUp = (e) => {
    try {
      e.preventDefault();
      createUser(userData);
    } catch (error) {
      console.log(error)
    }
  };

  const handleOnChange =(e) => {
    try {
      setUserdata({...userData,[e.target.name]:e.target.value})
      console.log(userData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="registeration-parent">
      <div className="registeration-container">
        <form onSubmit={handleSignUp}>
          <RoleBlock handleOnChange={handleOnChange}/>
          <CommonUserDetails handleOnChange={handleOnChange} />
        </form>
      </div>
    </div>
  );
}

function CommonUserDetails({handleOnChange}) {
  return (
    <div className="form-registeration-user-details">
      <input
        type="text"
        name="username"
        id="id_username"
        placeholder="Enter a Username"
        onChange={handleOnChange}
      />
      <input
        type="password"
        name="password"
        id="id_password"
        placeholder="Enter the Password"
        onChange={handleOnChange}
      />
      <input
        type="password"
        name="confirmPassword"
        id="id_confirmPassword"
        placeholder="Confirm Password"
      />
      <input
        type="text"
        name="email"
        id="id_email"
        placeholder="Email"
        onChange={handleOnChange}
      />
      <input
        type="text"
        name="phone"
        id="id_phone"
        placeholder="Phone"
        onChange={handleOnChange}
      />
      <input
        type="submit"
        value="Sign Up"
        name="signUp"
        id="id_signUp"
      />
    </div>
  );
}

function RoleBlock({handleOnChange}) {
  return (
    <div className="role-block-parent">
      <div className="role-image-container">
        <img src="/logo/Role.png" alt="user" />
        <span>Role</span>
      </div>
      <div className="role-drop-down-container">
        <span style={{ fontWeight: "bold", fontSize: "1em" }}>
          Select a Role to proceed
        </span>
        <select name="role" id="id_role" onChange={handleOnChange}>
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

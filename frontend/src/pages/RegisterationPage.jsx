import React, { useEffect, useRef, useState } from "react";
import "../styles/registeration/RegisterationPageStyle.css";
import { createUser, generateOtp } from "../services/userService";
import { Link } from "react-router-dom";
import emailCheck from "../validations/login/emailValidation";

function RegisterationPage() {
  const date = new Date();
  let canBeSubmitted=false

  //Current Date object Details

  const CreatedDate = {
    year: date.getFullYear() + 1,
    month: date.getMonth() + 1,
    day: date.getDay() + 1,
    hour: date.getHours() % 12 ? date.getHours() % 12 : 12,
    minute:
      date.getMinutes() % 60
        ? date.getMinutes() % 60 < 10
          ? "0" + (date.getMinutes() % 60)
          : date.getMinutes() % 60
        : "00",
    second:
      date.getSeconds() % 60
        ? date.getSeconds() % 60 < 10
          ? "0" + (date.getSeconds() % 60)
          : date.getSeconds() % 60
        : "00",
    milliseconds: date.getMilliseconds(),
    ampm: date.getHours() > 12 ? "pm" : "am",
  };

  const validate = () => {
    const error = {};

    if (!userData.username.trim()) {
      error.username = `* username is empty`;
    }
    if (!userData.password.trim()) {
      error.password = `* password is empty`;
    } else if (userData.password.trim().length < 6) {
      error.password = `* password should be at least 6`;
    }
    if (!confirmPassword.trim()) {
      error.confirmPassword = `* confirm password is empty`;
    } else if (userData.phone.trim().length < 6) {
      error.confirmPassword = `* password should be atleast 6`;
    }else if(userData.password.trim()!=confirmPassword.trim()){
      error.confirmPassword = `* passwords are not matching`;
    }
    if (!userData.email.trim()) {
      error.email = `* email is empty`;
    } else if (!emailCheck(userData.email.trim())) {
      error.email = `email is not valid`;
    }
    if (!userData.phone.trim()) {
      error.phone = `* phone is empty`;
    } else if (userData.phone.trim().length !=10) {
      error.phone = `* phone number is incorrect`;
    }
    return error;
  };

  const accountCreatedat = `${CreatedDate.year}/${CreatedDate.month}/${CreatedDate.day} ${CreatedDate.hour}:${CreatedDate.minute}:${CreatedDate.second} ${CreatedDate.ampm}`;

  // console.log(accountCreatedat);

  //Hooks-> UseSate

  const [isFormvalid, setIsFormvalid] = useState(false);
  const [isOtpSet, setIsOtpSet] = useState(false);
  const [otp, setOtp] = useState("");
  const formRef=useRef(null)

  const [userData, setUserdata] = useState({
    username: "",
    password: "",
    email: "",
    phone: "",
    role: "0",
    createdAt: accountCreatedat,
  });

  const [errorMsg, setErrorMsg] = useState({});

  const [confirmPassword, setConfirmPassword] = useState("");

  //useEffects

  useEffect(() => {
    //console.log(userData);
  }, [userData, confirmPassword]);
  

 


  const handleSignUp =async (e) => {
    try {
      e.preventDefault();
      setErrorMsg(validate());
      console.log(Object.keys(errorMsg).length == 0)
      if (Object.keys(errorMsg).length == 0)
        canBeSubmitted=true
      else
        canBeSubmitted=false
      console.log(isFormvalid)
     
      if (canBeSubmitted) {
        console.log("otp function ")
        setIsOtpSet(generateOtp(userData.email))
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOtpSubmit = async (e) => {
    try {
      const submitStatus = await createUser({ user: userData, otp: otp.trim() });
      console.log(submitStatus);
      setIsOtpSet(!submitStatus);
      if(submitStatus)
        formRef.current.reset()
    } catch (error) {
      console.log(`error on otp submit ${error}`);
    }
  };

  const handleOnChange = async (e) => {
    try {
      setUserdata({ ...userData, [e.target.name]: e.target.value });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="registeration-parent">
      <div className="registeration-container">
        <form ref={formRef} onSubmit={handleSignUp}>
          <div
            className="titleContainer"
            style={{
              display: "flex",
              flexDirection: "row",
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            <h2>Create Account</h2>
          </div>
          <RoleBlock handleOnChange={handleOnChange} />
          <CommonUserDetails
            handleOnChange={handleOnChange}
            isFormvalid={isFormvalid}
            errorMsg={errorMsg}
            setConfirmPassword={setConfirmPassword}
          />
          <span className="error" id="id_emptyField"></span>
        </form>
        {isOtpSet && (
          <OtpBlock setOtp={setOtp} handleOtpSubmit={handleOtpSubmit} />
        )}
      </div>
    </div>
  );
}

function CommonUserDetails({
  handleOnChange,
  errorMsg,
  setConfirmPassword,
  isFormvalid,
}) {
  return (
    <div className="form-registeration-user-details">
      <input
        type="text"
        name="username"
        id="id_username"
        placeholder="Enter a Username"
        onChange={handleOnChange}
      />
      <span className="error">{errorMsg.username}</span>

      <input
        type="password"
        name="password"
        id="id_password"
        placeholder="Enter the Password"
        onChange={handleOnChange}
      />
      <span className="error">{errorMsg.password}</span>
      <input
        type="password"
        name="confirmPassword"
        id="id_confirmPassword"
        placeholder="Confirm Password"
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <span className="error">{errorMsg.confirmPassword}</span>
      <input
        type="text"
        name="email"
        id="id_email"
        placeholder="Email"
        onChange={handleOnChange}
      />
      <span className="error">{errorMsg.email}</span>
      <input
        type="text"
        name="phone"
        id="id_phone"
        placeholder="Phone"
        onChange={handleOnChange}
      />
      <span className="error">{errorMsg.phone}</span>
      <input type="submit" value="Sign Up" name="signUp" id="id_signUp" />
      <span>
        Already have an account ?{" "}
        <Link
          to="/login"
          style={{
            textDecoration: "none",
          }}
        >
          Login
        </Link>
      </span>
    </div>
  );
}

function RoleBlock({ handleOnChange }) {
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
          <option value="0">Patient</option>
          <option value="1">Doctor</option>
          <option value="2">Pharmacy</option>
          <option value="3">Laboratory</option>
        </select>
      </div>
    </div>
  );
}

function OtpBlock({ setOtp, handleOtpSubmit }) {
  return (
    <div className="otpBlockParent">
      <h2>Enter Otp</h2>
      <input
        type="text"
        name="txtOtp"
        onChange={(e) => {
          setOtp(e.target.value);
        }}
        id="txtOtp"
      />
      <input
        type="button"
        value="Submit"
        id="btnOtp"
        name="btnOtp"
        onClick={handleOtpSubmit}
      />
    </div>
  );
}

export default RegisterationPage;

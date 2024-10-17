import React, { useEffect, useRef, useState } from "react";
import "./RegisterationPageStyle.css";
import { createUser, generateOtp } from "../../services/userService";
import { Link, useNavigate } from "react-router-dom";
import emailCheck from "../../validations/login/emailValidation";
import { CheckUserPresent } from "../../services/authService";


function RegisterationPage(props) {

  const navigate=useNavigate()
  const date = new Date();
  let canBeSubmitted = false;

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
    if (!confirmPassword) {
      error.confirmPassword = `* confirm password is empty`;
    } else if (userData.phone.trim().length < 6) {
      error.confirmPassword = `* password should be atleast 6`;
    } else if (userData.password.trim() != confirmPassword.trim()) {
      error.confirmPassword = `* passwords are not matching`;
    }
    if (!userData.email.trim()) {
      error.email = `* email is empty`;
    } else if (!emailCheck(userData.email.trim())) {
      error.email = `email is not valid`;
    }
    const phoneRegex = /^[0-9]{10}$/;
    if (!userData.phone.trim()) {
      error.phone = `* phone is empty`;
    } else if (userData.phone.trim().length != 10) {
      error.phone = `* phone number is incorrect`;
    }else if(isNaN(userData.phone.trim())){
      error.phone = `* enter valid characters`;
    }

    return error;
  };

  const accountCreatedat = `${CreatedDate.year}/${CreatedDate.month}/${CreatedDate.day} ${CreatedDate.hour}:${CreatedDate.minute}:${CreatedDate.second} ${CreatedDate.ampm}`;

  // console.log(accountCreatedat);

  //Hooks-> UseSate

  const [isFormvalid, setIsFormvalid] = useState(false);
  const [isOtpSet, setIsOtpSet] = useState(undefined);
  const [otp, setOtp] = useState("");
  const formRef = useRef(null);

  const [userData, setUserdata] = useState({
    username: "",
    password: "",
    email: "",
    phone: "",
    role: "0",
    createdAt: accountCreatedat,
  });

  const [errorMsg, setErrorMsg] = useState({});
  const [isPresent,setIsPresent]=useState(undefined)

  const [confirmPassword, setConfirmPassword] = useState(undefined);

  //useEffects
  useEffect(() => { }, [userData,isPresent]);

  useEffect(() => {
    console.log("Errors:", errorMsg);
  }, [errorMsg]);

  const handleSignUp = async (e) => {
    try {
      e.preventDefault();
      const error = validate();
      setErrorMsg(error);
      
      if (Object.keys(error).length === 0) {
        canBeSubmitted = true;
        
        const isP = await CheckUserPresent({
          email: userData.email,
          username: userData.username
        });
        
        setIsPresent(isP);
        console.log(isP); 
  
        if (isP) {
          setIsOtpSet(false);
        } else {
 
          setIsOtpSet(generateOtp(userData.email));
        }
      } else {
        canBeSubmitted = false;
        setIsOtpSet(false);
      }
  
      console.log("Form Valid:", canBeSubmitted);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOtpSubmit = async (e) => {
    try {
      const submitStatus = await createUser({
        user: userData,
        otp: otp.trim(),
      });
      console.log(submitStatus);
      await setIsOtpSet(!submitStatus);
      if (submitStatus) {
        formRef.current.reset();
        navigate('/login')
        
      }
    } catch (error) {
      console.log(`error on otp submit ${error}`);
    }
  };

  const handleOnChange = async (e) => {
    try {
      await setUserdata({ ...userData, [e.target.name]: e.target.value });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="registeration-parent">
      <div className="companyName">
        <img src="logo/LogoPlain.png" height="300px" width="500px" alt="logo" />
      </div>

      <div className="registeration-container">
        <form ref={formRef}>
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
            handleSignUp={handleSignUp}
            setOpened={props.setOpened}
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
  handleSignUp,
  setOpened
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
      <input
        type="submit"
        value="Sign Up"
        name="signUp"
        onClick={handleSignUp}
        id="id_signUp"
      />
      <span>
        Already have an account ?{" "}
        <Link
          onClick={()=>{
            setOpened('login')
          }}
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

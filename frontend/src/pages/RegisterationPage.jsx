import React, { useEffect, useState } from "react";
import "../styles/registeration/RegisterationPageStyle.css";
import { createUser } from "../services/userService";
import {Link} from "react-router-dom"

function RegisterationPage() {
  const date = new Date();

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


  const accountCreatedat = `${CreatedDate.year}/${CreatedDate.month}/${CreatedDate.day} ${CreatedDate.hour}:${CreatedDate.minute}:${CreatedDate.second} ${CreatedDate.ampm}`;

  // console.log(accountCreatedat);

  //Hooks-> UseSate

  const[isFormvalid,setIsFormvalid]=useState(false)

  const [userData, setUserdata] = useState({
    username: "",
    password: "",
    email: "",
    phone: "",
    role: "0",
    createdAt:accountCreatedat
  });


  const[errorMsg,setErrorMsg]=useState({
    confirmPassword:"",
    emptyField:"",
    roleNotSelected:""
  })

  const[confirmPassword,setConfirmPassword]=useState("")


//useEffects

useEffect(()=>{
  //console.log(userData);
},[userData])

//useEffect for password

useEffect(()=>{
  
  setErrorMsg({...errorMsg,confirmPassword:userData.password!=confirmPassword? "Password Not Matching":"" })
  //console.log(userData.password!=confirmPassword,userData.password,confirmPassword)

},[confirmPassword,errorMsg.confirmPassword,userData.password])



  const handleSignUp = (e) => {
    try {
      e.preventDefault();
      // console.log(userData)
      createUser(userData);
    } catch (error) {
      console.log(error);
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
        <form onSubmit={handleSignUp}>
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
          <CommonUserDetails handleOnChange={handleOnChange} errorMsg={errorMsg} setConfirmPassword={setConfirmPassword} />
        </form>
      </div>
    </div>
  );
}

function CommonUserDetails({ handleOnChange ,errorMsg,setConfirmPassword}) {
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
        onChange={(e)=>setConfirmPassword(e.target.value)}
      />
      <span className="error">{errorMsg.confirmPassword}</span>
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
      <input type="submit" value="Sign Up" name="signUp" id="id_signUp" />
      <span>Already have an account ?  <Link to='/login' style={{
        "textDecoration":"none"
      }}>Login</Link></span>
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

export default RegisterationPage;

import React, { useEffect, useState } from "react";
import "../styles/registeration/RegisterationPageStyle.css";
import { createUser,generateOtp } from "../services/userService";
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

  const[isFormvalid,setIsFormvalid]=useState(true)
  const[isOtpSet,setIsOtpSet]=useState(false)
  const[otp,setOtp]=useState('')

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
  console.log(userData)
  errorMsg.emptyField=""
      for(const key in userData)
      {
        userData[key]=userData[key].trim()
        if(!userData[key]){
          errorMsg.emptyField=errorMsg.emptyField+`<br>** ${key} is empty `
        }
      }
      if(!(confirmPassword.trim())){
         console.log(`confirm password is  ${!(confirmPassword.trim())}`)
        errorMsg.emptyField=errorMsg.emptyField+`<br>** Confirm password box is empty`
      }
      if(errorMsg.emptyField)
      {
        console.log("heyyyyy")
        document.getElementById('id_emptyField').innerHTML=`${errorMsg.emptyField}`
        setIsFormvalid(true)
      }
      else{
        console.log("heloooo")
        setIsFormvalid(false);
      }
  
},[userData,confirmPassword])

//useEffect for password

useEffect(()=>{
  setErrorMsg({...errorMsg,confirmPassword:userData.password!=confirmPassword? "Password Not Matching":"" })
  //console.log(userData.password!=confirmPassword,userData.password,confirmPassword)

},[confirmPassword,errorMsg.confirmPassword,userData.password])



  const handleSignUp = (e) => {
    try {
      e.preventDefault();
      // setIsOtpSet(generateOtp(userData.email))
      
        
      
    } catch (error) {
      console.log(error);
    }
  };

  const handleOtpSubmit=async (e)=>{
    try {
      const submitStatus=await createUser({user:userData,otp:otp})
      console.log(submitStatus)
      setIsOtpSet(!submitStatus)
     
    } catch (error) {
      console.log(`error on otp submit ${error}`);
      
    }
  }

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
          <CommonUserDetails handleOnChange={handleOnChange} isFormvalid={isFormvalid} errorMsg={errorMsg} setConfirmPassword={setConfirmPassword} />
          <span className="error" id='id_emptyField'></span>

        </form>
        {isOtpSet && <OtpBlock setOtp={setOtp} handleOtpSubmit={handleOtpSubmit}/>}
      </div>
    </div>
  );
}

function CommonUserDetails({ handleOnChange ,errorMsg,setConfirmPassword,isFormvalid}) {
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
      <input type="submit" value="Sign Up" disabled={isFormvalid} name="signUp" id="id_signUp" />
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

function OtpBlock({setOtp,handleOtpSubmit}){
  return(
    <div className="otpBlockParent">
      <h2>Enter Otp</h2>
      <input type="text" name="txtOtp" onChange={(e)=>{
        setOtp(e.target.value)

      }} id="txtOtp" />
      <input type="button" value="Submit" id="btnOtp" name="btnOtp" onClick={handleOtpSubmit} />

    </div>
  )
}

export default RegisterationPage;

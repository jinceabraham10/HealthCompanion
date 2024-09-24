import React, { useEffect, useState } from "react";
import styles from "./navbar_profile_icon.module.css";
import {DataOnPageLoad} from "../.././services/authService"


var isTokenPresent=false 

function Navbar_ProfileIcon() {

  const [userData,setUserData]=useState(undefined)
  const load=async ()=>{
    await setUserData(await DataOnPageLoad(localStorage.getItem('token')))
  }
  
 useEffect(()=>{
   if(localStorage.getItem('token')){
    isTokenPresent=true
    load()
  }
  else{
    isTokenPresent=false
  }
 },[])
  // console.log(!localStorage.getItem('token'))

 
 
  const handlelogOut=async ()=>{
    isTokenPresent=false;
    localStorage.removeItem('token')
    await setUserData({})


  }
  


  return (
    <div className={styles.profileContainer}>
      <img className={styles.image} src="logo/doctor.png" alt="profile" />
      { (isTokenPresent) ? <UserProfile username={userData.username} handlelogOut={handlelogOut} /> : <NavLoginSignUpLink />}
    </div>
  );
}

function NavLoginSignUpLink() {
  return (
    <div className={styles.loginOrSignup}>
      <a href={`http://localhost:5173/login`}>Login</a> /
     <a href={`http://localhost:5173/register`}> Sign Up</a>
    </div>
  );
}

function UserProfile({username,handlelogOut}){

  return(
    <div className={styles.userProfileParent}>
      <span style={{
        color:"red",
        fontStyle:"bold"
      }}>{username}</span>
      
      <button onClick={handlelogOut}>log out</button>
      
      
    </div>
  )
}

export default Navbar_ProfileIcon;

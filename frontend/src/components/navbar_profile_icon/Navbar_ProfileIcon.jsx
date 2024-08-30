import React, { useState } from "react";
import styles from "./navbar_profile_icon.module.css";

function Navbar_ProfileIcon() {
  const [userDetails, setUserDetails] = useState("");

  return (
    <div className={styles.profileContainer}>
      <img className={styles.image} src="logo/doctor.png" alt="profile" />
      {userDetails ? userDetails : <NavLoginSignUpLink />}
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

export default Navbar_ProfileIcon;

import "./NavBarStyle.css";
import React, { useEffect } from "react";
import Logo from "../../app_logo/Logo";
import { Link } from "react-router-dom";
import Navbar_ProfileIcon from "../../navbar_profile_icon/Navbar_ProfileIcon";


function NavBar() {


  return (
    <div className="nav-bar-parent">
      <Logo />
      <NavigationOptions />
      <Navbar_ProfileIcon/>
      
    </div>
  );
}


function NavigationOptions() {
  return (
    <div className="nav-bar-navigation-options">
      <ul className="navigation-option-list">
        <li className="nav-item" id="id_home">
          <Link className="nav-item doctor" to="/patient">Home</Link>
        </li>
        <li className="nav-item" id="id_doctor">
          <Link className="nav-item doctor" to="/doctor">Consult Doctor</Link>
        </li>
        <li className="nav-item" id="id_pharmacy">
          <Link className="nav-item doctor" to="/doctor">Medicines</Link>
        </li>
        <li className="nav-item laboratory" id="id_laboratory">
          <Link className="nav-item doctor" to="/doctor">Lab Tests</Link>
        </li>
      </ul>
    </div>
  );
}



export default NavBar;

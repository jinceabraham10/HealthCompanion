import "./NavBarStyle.css";
import React from "react";
import Logo from "../../app_logo/Logo";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="nav-bar-parent">
      <Logo />
      <NavigationOptions />
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
          <Link className="nav-item doctor" to="/doctor">Doctor</Link>
        </li>
        <li className="nav-item" id="id_pharmacy">
          <Link className="nav-item doctor" to="/doctor">Pharmacy</Link>
        </li>
        <li className="nav-item laboratory" id="id_laboratory">
          <Link className="nav-item doctor" to="/doctor">Laboratory</Link>
        </li>
      </ul>
    </div>
  );
}



export default NavBar;

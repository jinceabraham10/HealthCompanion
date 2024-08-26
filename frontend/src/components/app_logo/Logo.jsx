import React from "react";
import "./LogoStyle.css";

function Logo() {
  return (
    <div className="logo-parent">
      <div className="logo-image-container">
        <img src="/logo/LogoPlain.png" className="logo-image" alt="Logo" />
        {/* <span className="logo-under-slogan">
            All Services at your comfortability
          </span> */}
      </div>
    </div>
  );
}

export default Logo;

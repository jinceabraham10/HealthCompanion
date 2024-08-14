import React, { useState, useRef } from "react";
import "../styles/Login.css";
import { Register } from "../services/authService";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassWord] = useState("");
  const ref_username = useRef(null);
  const ref_password = useRef(null);
  const handleClick = () => {
    const result = {
      name: ref_username.current.value,
      password: ref_password.current.value,
    };

    Register(result);
  };

  return (
    <div className="outer-login-block">
      <div className="login-block">
        <div>
          <input
            type="text"
            name="userName"
            id="id_userName"
            placeholder="username"
            ref={ref_username}
          />
          <input
            type="text"
            name="password"
            id="id_password"
            placeholder="password"
            ref={ref_password}
          />
          <span className="bottom-login-click-layer">
          <button type="button" onClick={handleClick}>
            Log In
          </button>
          <a href="http://">forgot Password</a>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;

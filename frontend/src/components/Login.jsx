import React, { useState, useRef } from "react";
import "../styles/Login.css";
import RoleBar from "./RoleBar";
import { LoginUser } from "../services/authService";
import {useNavigate} from "react-router-dom"

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassWord] = useState("");
  const[isUserExist,setIsUserExist]=useState(false)
  const [role,setRole]=useState("")
  const ref_username = useRef(null);
  const ref_password = useRef(null);
  const navigate=useNavigate()


  const handleClick =async () => {
    const user = {
      username: ref_username.current.value.trim(),
      password: ref_password.current.value.trim(),
    };
    
    if(await LoginUser(user)){
      navigate("/")
    }

    
  };

  return (
    <div className="outer-login-block">
      <LoginInputBlock
        handleClick={handleClick}
        ref_username={ref_username}
        ref_password={ref_password}
      />
    </div>

  );
}

function LoginInputBlock({ handleClick, ref_username, ref_password }) {
  return (
    <div className="login-block">
      <img src={"/logo/LogoPlain.png"} alt="logo" />
      <input
        type="text"
        name="userName"
        id="id_userName"
        placeholder="Email /Username"
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
  );
}

export default Login;

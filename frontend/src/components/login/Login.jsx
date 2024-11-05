import React, { useState, useRef, useEffect } from "react";
import "./Login.css";
import RoleBar from "../altSignInBar/RoleBar";
import { LoginUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import axios from "axios";
import Modal from "react-modal";
import { GoogleSignIN } from "../../services/authService";
import { FloatingLabel } from "flowbite-react";
import { useFormik } from "formik";
import * as yup from "yup";

function Login(props) {
  const [userName, setUserName] = useState("");
  const [password, setPassWord] = useState("");
  const [isUserExist, setIsUserExist] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [role, setRole] = useState("");
  const ref_username = useRef(null);
  const ref_password = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(`id ${import.meta.env.VITE_GOOGLE_CLIENT_ID}`);
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    google.accounts.id.initialize({
      client_id: clientId,
      callback: handleCredentialResponse,
    });

    google.accounts.id.renderButton(document.getElementById("id_google"), {
      theme: "filled_blue",
      size: "large",
      width: 350,
      type: "standard",
    });
  }, []);

  const handleCredentialResponse = async (response) => {
    console.log("Encoded JWT ID token: " + response.credential);
    // const details=jwtDecode(response.credential)
    // console.log(details)
    const signedStatus = await GoogleSignIN(response.credential);
    if (signedStatus) {
      switch (signedStatus.role) {
        case "0":
          navigate("/");
          break;
        case "1":
          navigate("/doctorDashboard");
          break;
        case "4":
          navigate("/adminDashboard");
          break;
      }
    }
  };

  const handleClick = async () => {
    const user = {
      username: ref_username.current.value.trim(),
      password: ref_password.current.value.trim(),
    };

    await console.log("heloooo");

    const userData = await LoginUser(user);
    console.log(userData);
    if (userData) {
      switch (userData.role) {
        case "0":
          navigate("/");
          break;
        case "1":
          navigate("/doctorDashboard");
          break;
        case "4":
          navigate("/adminDashboard");
          break;
      }
    }
  };

  return (
    <div className="flex flex-row min-h-full min-w-full gap-40 justify-center items-center mt-24 ">
      <img src={"/logo/LogoPlain.png"} alt="logo" className="w-1/2 h-1/2" />

      <LoginInputBlock
        handleClick={handleClick}
        ref_username={ref_username}
        ref_password={ref_password}
        setOpened={props.setOpened}
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
      />

      <ForgotPasswordEmailInputModal
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
      />
    </div>
  );
}

function LoginInputBlock(props) {
  const { handleClick, ref_username, ref_password, setOpened } = props;
  const [touchedError, setTouchedError] = useState({});
  return (
    <div className="flex flex-col gap-10 items-center justify-center">
      <div className=" flex flex-col gap-8 border rounded p-10 justify-center items-center shadow-lg z-30 bg-slate-400">
        <input
          type="text"
          name="userName"
          id="id_userName"
          placeholder="Email /Username"
          className="rounded-lg text-center w-full"
          pattern=""
          onBlur={(e) => {
            if (ref_username.current.value == "") {
              setTouchedError({
                ...touchedError,
                username: true,
              });
            }
          }}
          ref={ref_username}
        />
        {touchedError.username ? (
          <span className="text-red-700">* Enter Valid username /email</span>
        ) : (
          " "
        )}
        <input
          type="password"
          name="password"
          id="id_password"
          className="rounded-lg text-center w-full"
          placeholder="password"
          onBlur={(e) => {
            if (ref_username.current.value == "") {
              setTouchedError({
                ...touchedError,
                password: true,
              });
            }
          }}
          ref={ref_password}
        />
        {touchedError.password ? (
          <span className="text-red-700">* Enter Valid Password</span>
        ) : (
          " "
        )}

        <div className="flex flex-row gap-8 justify-center w-full text-white">
          <button
            type="button"
            className="btnlogin"
            onClick={handleClick}
            id="id_login1"
          >
            Log In
          </button>
          <button
            type="button"
            onClick={() => {
              props.setIsOpenModal(true);
            }}
          >
            forgot Password
          </button>
        </div>
        <span className="text-white flex flex-row gap-4 justify-center w-full ">
          <span>New User ?</span>

          <button
            onClick={() => {
              setOpened("register");
            }}
            id="id_register"
          >
            Register
          </button>
        </span>
      </div>

      {/* <div className="w-full flex flex-row items-center justify-center border p-5 rounded-lg shadow-lg bg-red-500">
        <button className="flex flex-row gap-4 text-white font-bold " onClick={async ()=>{
          await google.accounts.id.signIn();

        }}>
          <GoogleIcon />
          <span>Google Sign in</span>
        </button>
      </div> */}

      <div className="">
        <button id="id_google"></button>
      </div>
    </div>
  );
}

function ForgotPasswordEmailInputModal(props) {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: yup.object().shape({
      email: yup.string().email("should be valid email").required("Requires Email to proceed forward"),
    }),
  });

  return (
    <Modal
      isOpen={props.isOpenModal}
      onRequestClose={() => {
        props.setIsOpenModal(false);
      }}
      className="absolute w-[50%] h-[50%] flex flex-col items-center justify-center border bg-white z-50 gap-6 rounded"
      overlayClassName="fixed w-full h-full inset-0 bg-gray-900 bg-opacity-70 flex justify-center items-center z-50 "
    >
      <h1 className="font-bold text-green-400">Password Reset</h1>
      <div className="flex flex-col gap-8 w-full">
      <span className="font-bold w-full flex flex-col items-center">
          <h2>Please provide the registered email for proceeding password reset</h2>
        </span>
       <div className="w-full flex flex-col items-center">
       
       <FloatingLabel
          variant="outlined"
          value={formik.email}
          onChange={formik.handleChange}
          onFocus={()=>{
            formik.setFieldTouched('email',false)
          }}
          onBlur={formik.handleBlur}
          helperText={
            (formik.touched.email) && (formik.errors.email)
              ? formik.errors.email
              : ""
          }
          color={
            formik.touched.email && formik.errors.email ? "error" : "success"
          }
          label="email"
          name="email"
          className="w-[70vh]"
        />
       </div>
       <div className="flex flex-col gap-4 w-full items-center">
       <button type="button" className="p-4 bg-red-500 rounded w-[20%] text-white ">Proceed</button>
       </div>
      </div>
    </Modal>
  );
}

export default Login;

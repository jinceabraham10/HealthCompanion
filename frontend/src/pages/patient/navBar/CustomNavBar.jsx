import React, { useState } from "react";
import styles from "./CustomNavBarCss.module.css";
import { useNavigate } from "react-router-dom";

function CustomNavBar(props) {
  const { setOpened ,patientData} = props;
  const [doctorOptionsOpened,setDoctorOptionsOpened]=useState(false)
  const [userOptionsOpened,setUserOptionsOpened]=useState(false)
  const navigate = useNavigate();


  return (
    <div className="w-full flex flex-row  items-center p-2 ">
      <div className="relative flex flex-row w-full items-center justify-between mr-5">
        <div className="w-52">
          <img src="logo/LogoPlain.png" alt="logo" className="w-52 h-40" />
        </div>
        <div className="flex">
          <nav
            className={`${styles.navBar} navBar flex flex-row gap-8 font-bold text-emerald-700`}
          >
            <button className={` text-center ${styles.navItem} text-pretty `} 
            onClick={async (e)=>{
              await setDoctorOptionsOpened(!doctorOptionsOpened)
              
            }}>
              Doctors     
            </button>
            <nav
            id="id_doctorOptions "
            className={`${styles.userOptions} ${(doctorOptionsOpened?'visible':'invisible')} absolute h-34 top-24  border z-50 w-42 p-4 bg-slate-300 rounded-lg  flex flex-col gap-4`}
          >
            <button className={`${styles.userOptionsItem}`} onClick={()=>{
              setOpened({Doctors:true})
              setDoctorOptionsOpened(!doctorOptionsOpened)
              props.setOpenBookingSlot(false)
            }}>find Doctors</button>
            <button
              className={`${styles.userOptionsItem}`}
              onClick={() => {
                setOpened({bookedSlots:true})
              setDoctorOptionsOpened(!doctorOptionsOpened)
                
              }}
            >
              Show Booked Slots
            </button>
          </nav>
            <button className={` text-center ${styles.navItem} text-pretty`}>
              Pharmacy
            </button>
            <button className={` text-center ${styles.navItem} text-pretty`}>
              Laboratory
            </button>
          </nav>
        </div>

        <div className="rounded-full">
          <img
            src={`data:image/jpeg;base64,${patientData.realProfileImage}`}
            alt="logo"
            className="relative border shadow-md  bottom-5 rounded-full w-24 h-24"
            onClick={() => {
              setUserOptionsOpened(!userOptionsOpened)

            }}
          />
          <nav
            id="id_userOptions "
            className={`${styles.userOptions} ${(userOptionsOpened?'visible':'invisible')} absolute h-34 right-5 border z-50 w-36 p-4 bg-slate-300 rounded-lg right-20 bottom-0 flex flex-col gap-4`}
          >
            <button className={`${styles.userOptionsItem}`} onClick={()=>{
              setOpened({profile:true})
              setUserOptionsOpened(!userOptionsOpened)
            }}>profile</button>
            <button
              className={`${styles.userOptionsItem}`}
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/home");
              }}
            >
              Log out
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default CustomNavBar;

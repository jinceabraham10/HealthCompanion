import React, { useEffect, useState } from "react";
import styles from "./CustomNavBarCss.module.css";
import { useNavigate } from "react-router-dom";
import CompletedSlots from "../completedSlots/CompletedSlots";

function CustomNavBar(props) {
  const { setOpened, patientData,setConsultationIn30 ,consultationIn30,checkConsultationIn30,Opened} = props;
  const [doctorOptionsOpened, setDoctorOptionsOpened] = useState(false);
  const [userOptionsOpened, setUserOptionsOpened] = useState(false);
 
  const navigate = useNavigate();

  // const checkConsultationIn30 = async () => {
  //   const ws = new WebSocket("https://healthcompanion.onrender.com");
  //   ws.onopen = () => {
  //     console.log("Started connecting to the backend");
  //     ws.send(JSON.stringify({ type: "register", _id: props.patientData._id }));
  //   };

  //   ws.onmessage = async (event) => {
  //     const dataReceived = JSON.parse(event.data);
  //     await console.log(`data receieved ${JSON.stringify(dataReceived)}`);
  //     await setConsultationIn30(dataReceived.slots);
  //   };
  // };

  // useEffect(() => {
  //   checkConsultationIn30();
  // }, []);

  useEffect(()=>{
    console.log(`consultationIn30 ${JSON.stringify(consultationIn30)}`)

  },[consultationIn30])

  return (
    <div className="w-full flex flex-row  items-center p-2 h-[15vh] border">
      <div className="relative flex flex-row w-full items-center justify-between mr-5">
        <div className="w-52">
          <img
            src="logo/LogoPlain.png"
            alt="logo"
            className="w-[17vw] h-[18vh]"
          />
        </div>
        <div className="flex">
          <nav
            className={`${styles.navBar} navBar flex flex-row gap-8 font-bold text-emerald-700`}
          >
            <button
            id={`id_btnNavDoctors`}
              className={` text-center ${styles.navItem} text-pretty px-4 py-2 ${(Opened.Doctors) && "bg-red-500 rounded text-white"} `}
              onClick={async (e) => {
                // await setDoctorOptionsOpened(!doctorOptionsOpened);
                setOpened({ Doctors: true });
                // setDoctorOptionsOpened(!doctorOptionsOpened);
                props.setOpenBookingSlot(false);
              }}
            >
              Doctors
            </button>
            {/* <nav
              id="id_doctorOptions "
              className={`${styles.userOptions} ${
                doctorOptionsOpened ? "visible" : "invisible"
              } absolute h-34 top-24  border z-50 w-42 p-4 bg-slate-300 rounded-lg  flex flex-col gap-4`}
            >
              <button
                className={`${styles.userOptionsItem}`}
                onClick={() => {
                  setOpened({ Doctors: true });
                  setDoctorOptionsOpened(!doctorOptionsOpened);
                  props.setOpenBookingSlot(false);
                }}
              >
                find Doctors
              </button>
              <button
                className={`${styles.userOptionsItem}`}
                onClick={() => {
                  setOpened({ bookedSlots: true });
                  setDoctorOptionsOpened(!doctorOptionsOpened);
                }}
              >
                Show Booked Slots
              </button>
            </nav> */}
            {/* <button className={` text-center ${styles.navItem} text-pretty`}>
              Booked Slots
            </button> */}
            <button
              className={` text-center ${styles.navItem} text-pretty px-4 py-2 ${(Opened.bookedSlots) && "bg-red-500 rounded text-white"} `}
              onClick={() => {
                setOpened({ bookedSlots: true });
                setDoctorOptionsOpened(!doctorOptionsOpened);
              }}
            >
              Booked
            </button>
            <button className={` px-4 py-2 text-center ${styles.navItem} text-pretty ${(Opened.CompletedSlot) && "bg-red-500 rounded text-white"}`} onClick={()=>{
              setOpened({CompletedSlot:true}) 
            }}>
              Completed
            </button>
            <button className={` text-center ${styles.navItem} text-pretty`}>
              Prescriptions
            </button>

              <button
                className={` text-center ${styles.navItem} text-pretty border bg-blue-600 text-white rounded-lg p-2 } `}
                onClick={() => {
                  setOpened({ consultationToday: true });
                }}
              >
                Consultations For Today
              </button>
          

            <button
              className={`${styles.navItem}`}
              onClick={() => {
                setOpened({ profile: true });
                // setUserOptionsOpened(!userOptionsOpened);
              }}
            >
              Profile
            </button>
          </nav>
        </div>

        <div className="relative flex flex-row gap-4 ">
          <div className="flex flex-col gap-4 relative  justify-center items-center font-bold ">
            <pre className="font-bold">
              {`Hi, ${patientData.firstName} ${patientData.lastName}`}
            </pre>
            <button
              className={`${styles.userOptionsItem} border px-5 py-1 rounded-lg bg-red-500 font-bold`}
              onClick={() => {
                sessionStorage.removeItem("token");
                navigate("/home");
              }}
            >
              Log out
            </button>
          </div>
          <img
            src={`data:image/jpeg;base64,${patientData.realProfileImage}`}
            alt="logo"
            className="relative border shadow-md  bottom-5 rounded-full -top-1 w-24 h-24"
            onClick={() => {
              setUserOptionsOpened(!userOptionsOpened);
            }}
          />

          {/* <nav
            id="id_userOptions "
            className={`${styles.userOptions} ${
              userOptionsOpened ? "visible" : "invisible"
            } absolute h-34 right-5 border z-50 w-36 p-4 bg-slate-300 rounded-lg right-20 bottom-0 flex flex-col gap-4`}
          >
            <button
              className={`${styles.userOptionsItem}`}
              onClick={() => {
                setOpened({ profile: true });
                setUserOptionsOpened(!userOptionsOpened);
              }}
            >
              profile
            </button>
            <button
              className={`${styles.userOptionsItem}`}
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/home");
              }}
            >
              Log out
            </button>
          </nav> */}
        </div>
      </div>
    </div>
  );
}

export default CustomNavBar;

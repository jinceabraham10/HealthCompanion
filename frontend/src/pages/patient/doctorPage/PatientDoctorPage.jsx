import React, { useEffect, useState } from "react";
import DoctorCardView from "../../../components/doctor/doctorCardView";
import { getAllDoctors } from "../../../services/doctorService";
import styles from "./PatientDoctorPage.module.css";
import BookingPage from "../bookingPage/BookingPage";
import ReactModal from "react-modal";
import DoctorCard from "../doctorCard/DoctorCard";
import DoctorReviews from "../doctorReview/DoctorReviews";

function PatientDoctorPage(props) {
  const [doctors, setDoctors] = useState([]);
  const [showSlotPage, setShowSlotPage] = useState(false);
  const [openBookingSlot, setOpenBookingSlot] = useState(false);
  const [openReview, setOpenReview] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  useEffect(() => {
    const onLoad = async () => {
      const allDoctors = await getAllDoctors();
      await setDoctors(allDoctors);
      // await console.log(`doctors ${JSON.stringify(doctors)}`)
    };
    onLoad();
  }, []);

  useEffect(() => {
    // console.log(`doctors ${JSON.stringify(doctors)}`)
  }, [doctors]);

  // console.log(`patient ${JSON.stringify(props.patient)}`)

  return (
    <div className="w-full h-[100vh] flex flex-row flex-1">
      <div
        className={` w-[50%] flex flex-col gap-4 mr-[10vh] ${
          selectedDoctor ? "invisible" : ""
        }`}
      >
        {doctors
          ? doctors.map((doctor,index) => (
              <DoctorCard
                key={doctor._id}
                doctor={doctor}
                patient={props.patient}
                setSelectedDoctor={props.setSelectedDoctor}
                setOpenBookingSlot={props.setOpenBookingSlot}
                setOpenReview={setOpenReview}
                openReview={openReview}
                index={index}
              />
            ))
          : "no doctors"}
      </div>
      {/* {
            (openBookingSlot) &&
            <div className=' grow w-[90%] flex flex-col gap-4 border p-4 '>
              <span className='w-full'>
                <button className='p-2 bg-red-600 rounded-lg' onClick={()=>{
                  setOpenBookingSlot(false)
                }}>
                  close
                </button>

              </span>

              <div className='overflow-y-auto w-full  '>
                {
                  (selectedDoctor) && 
                  <BookingPage doctor={selectedDoctor} patient={props.patientData}/>
                }
              </div>
          
            </div>
          } */}

      {openReview && (props.selectedDoctor)  && (
        <div className=" fixed w-[50%] top-[18vh] right-10 flex flex-col gap-4 border p-4 h-[75vh] shadow-lg overflow-y-auto">
          <DoctorReviews selectedDoctor={props.selectedDoctor}/>
        </div>
      )}
    </div>
  );
}

export default PatientDoctorPage;

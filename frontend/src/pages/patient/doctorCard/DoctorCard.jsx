import { Rating, RatingStar } from "flowbite-react";
import React from "react";

function DoctorCard(props) {
  const { doctor, patient, setSelectedDoctor, setOpenBookingSlot,index } = props;
  return (
    <div className="h-[10vh] flex flex-col gap-4 w-full">
      <div className="border w-full p-4 rounded shadow-lg flex flex-row gap-4">
        <div className="w-[40%]">
          <img
            src={`data:image/jpeg;base64,${doctor.realProfileImage}`}
            className="m-1 rounded-lg h-[30vh]"
            alt=""
          />
        </div>
        <div className="w-[60%] flex flex-col gap-5 items-start justify-center font-bold text-lg">
          <div className="flex flex-row gap-4 h-[5vh] ">
            <Rating className="">
              <RatingStar />
              <RatingStar />
              <RatingStar />
              <RatingStar />
            </Rating>
            <button className="p-2 bg-red-500 text-white rounded text-sm text-center" onClick={async ()=>{
              await setSelectedDoctor(doctor)
              await props.setOpenReview(!props.openReview)
              
            }}>
              View Review
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-x-6 gap-y-2">
            <span>Name : </span>{" "}
            <span className="text-teal-500">{`${doctor.firstName} ${doctor.lastName}`}</span>
            <span>Specialization : </span>
            <span className="text-teal-500">{`${doctor.specialization}`}</span>
            <span>Years of Experience : </span>{" "}
            <span className="text-teal-500">{`${doctor.experience} years`}</span>
          </div>
        </div>
      </div>
      <button
        className="px-4 py-2 bg-green-400 font-bold"
        id={`id_btnProceedToBook${index}`}
        onClick={() => {
          setSelectedDoctor(doctor);
          setOpenBookingSlot(true);
        }}
      >
        Proceed to Book
      </button>
    </div>
  );
}

export default DoctorCard;

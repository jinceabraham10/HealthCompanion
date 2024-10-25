import React, { useEffect, useState } from "react";
import { getBookedSlotsForToday } from "../../../services/userService";
import { convertTo12Hour } from "../../doctor/slot/BookingSlots";

function ConsultationSoon(props) {
  const { consultationIn30, patient, patientData } = props;
  const [todaySlots, setTodaySlots] = useState([]);

  const onLoad = async () => {
    const fetchedTodaySlots = await getBookedSlotsForToday({patientId:patientData._id});
    await setTodaySlots(fetchedTodaySlots);
  };

  useEffect(() => {
    if(todaySlots.length>0){
      console.log(todaySlots);
    }
  }, [todaySlots]);

  useEffect(() => {
    onLoad();
  }, []);

  return (
    <div className="w-full h-full ">
      <div className="flex flex-col gap-4 flex-1 h-full   ">
              {(todaySlots.length>0)&& todaySlots.map((slot, index) =>
                 (
                  <div
                    key={index}
                    className={`w-[50%]  border p-4 flex flex-col gap-8 rounded shadow-xl ${((consultationIn30) && (consultationIn30._id==slot._id)) ? `bg-gray-400 ` : `bg-rose-300`}`}
                    
                  >
                    {slot.confirmStatus && <h3 className="font-bold text-white">{((consultationIn30) && (consultationIn30._id==slot._id))?"Meeting Soon":"Planned for Today"}</h3>}
                    
                    <div className="flex flex-row justify-between">
                      <span className="font-bold">{convertTo12Hour(slot.startTime)}</span>
                      <span className="font-bold text-black-800">to</span>
                      <span className="font-bold">{convertTo12Hour(slot.endTime)}</span>
                    </div>

                    <div className="flex flex-row gap-4 items-center">
                      {slot.doctorId.profileImage && (
                        <img
                          src={`data:image/jpeg;base64,${slot.doctorId.realProfileImage}`}
                          alt={`${slot.doctorId.firstName}'s profile`}
                          className="w-20 h-20 rounded-full object-cover"
                        />
                      )}
                      <div>
                        <div className="ml-10 grid grid-cols-2 gap-[20vh]">
                          <span className="font-bold text-blue-600">Doctor:</span>
                          <span className="font-bold">{slot.doctorId.firstName} {slot.doctorId.lastName}</span>
                        </div>
                        <div className="flex flex-row justify-between gap-5">
                          <span className="font-bold text-blue-600">Specialization:</span>
                          <span className="font-bold">{slot.doctorId.specialization}</span>
                        </div>
                      </div>
                    </div>

                    {
                      (consultationIn30) && (consultationIn30._id==slot._id) && <div className="flex flex-row gap-4">
                      <a
                        href={slot.meetingLink}
                        className="w-full flex flex-col items-center justify-center bg-green-400 font-bold"
                      >
                        Meeting Link
                      </a>
                    </div>
                    }

                    
                  </div>
                )
              )}
            </div>
    </div>
  );
}

export default ConsultationSoon;

import React, { useEffect, useState } from "react";
import { getAllDoctors } from "../../../services/doctorService";
import { getAllCompletedSlot } from "../../../services/userService";
import { convertTo12Hour } from "../../doctor/slot/BookingSlots";
import { convertTo12HourFormat } from "../../../utils/dateUtilFrontEnd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import AddReview from "../addReview/AddReview";
dayjs.extend(customParseFormat);

function CompletedSlots(props) {
  const [completedConsulations, setCompletedConsulations] = useState([]);
  const [addReview, setAddReview] = useState(false);
  const { patient, patientData } = props;
  const [selectedSlot,setSelectedSlot]=useState(null)

  const onLoad = async () => {
    const tempSlots = await getAllCompletedSlot({ patientId: patientData._id });
    if(tempSlots){
      await setCompletedConsulations(tempSlots);
    }
    
    
  };

  useEffect(() => {
    onLoad();
  }, []);

  return (
    <div className="h-[100vh] w-full flex flex-row flex-1">
      <div className={`${(addReview)?"w-[40%]":"grow"} min-h-screen mr-[5%] flex flex-col gap-4`}>
        {completedConsulations.length > 0 &&
          completedConsulations.map((slot, index) => (
            <div key={index}>
              <SlotCard slot={slot} setSelectedSlot={setSelectedSlot} selectedSlot={selectedSlot} setAddReview={setAddReview} addReview={addReview}/>
            </div>
          ))}
      </div>

      {(addReview) && (
        <div className="fixed right-5 w-[50%] h-[70vh] bg-blue-300 border p-4">
          <AddReview selectedSlot={selectedSlot} setAddReview={setAddReview}/>
        </div>
      )}
    </div>
  );
}

function SlotCard(props) {
  const { slot,selectedSlot }=props
  return (
    <div className="border  flex flex-col gap-4 w-full ">
      <div className={`border w-full p-4 rounded shadow-lg flex flex-row gap-4 ${(selectedSlot && (selectedSlot._id==slot._id) ? "bg-yellow-300":"bg-white")} `}>
        <div className="w-[40%]">
          <img
            src={slot.doctorId.realProfileImage}
            className="m-1 rounded-lg h-[30vh]"
            alt=""
          />
        </div>
        <div className="w-[60%] flex flex-col gap-5 items-start justify-center font-bold text-lg">
          <div className="flex flex-row gap-4 h-[5vh] ">
            {/* <Rating >
              <RatingStar />
              <RatingStar />
              <RatingStar />
              <RatingStar />
            </Rating> */}
            <button
              className="p-2 bg-red-500 text-white rounded text-sm text-center"
              onClick={() => { props. setAddReview(!props.addReview)
                props.setSelectedSlot(slot)
              }}
            >
              {(props.addReview)?"Close Review":"Add Review"}
            </button>
            <span className="p-4 border bg-green-400 font-bold  flex items-center rounded text-white">Completed</span>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-2">
            <span>Name : </span>{" "}
            <span className="text-teal-500">{`${slot.doctorId.firstName} ${slot.doctorId.lastName}`}</span>
            <span>Specialization : </span>
            <span className="text-teal-500">{`${slot.doctorId.specialization}`}</span>
            <span>Years of Experience : </span>{" "}
            <span className="text-teal-500">{`${slot.doctorId.experience} years`}</span>
            <span>Consulted Date :</span>
            <span className="text-teal-500">
              {dayjs(slot.date).format("MMMM DD,YYYY")}
            </span>
            <span>Slot Start Time :</span>
            <span className="text-teal-500">
              {convertTo12HourFormat(slot.startTime)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompletedSlots;

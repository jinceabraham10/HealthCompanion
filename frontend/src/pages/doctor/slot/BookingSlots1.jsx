import React, { useEffect, useState } from "react";
import { nextWeekDays } from "../../../utils/dateUtilFrontEnd";
import dayjs from "dayjs";
import { useFormik } from "formik";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {
  AddSlot,
  deleteSlot,
  getSetSlots,
} from "../../../services/doctorService";
dayjs.extend(customParseFormat);

function BookingSlots1(props) {
  const [slotsSetAtDate, setSlotsSetAtDate] = useState([]);
  const [nextWeekDay, setNextWeekDay] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const tempTimeSlots = [
    
    "10:00 AM",
    "12:00 PM",
    "1:00 PM",
    "3:00 PM",
    "5:00 PM",
    "6:00 PM",
    "8:00 PM",
  
  ];

  const formik = useFormik({
    initialValues: {
      _id: props.fetchedDoctorDetails._id,
      startTime: "",
      endTime: "",
      date: "",
    },
    onSubmit: async (values, action) => {
      await AddSlot(values);
      await loadSetSlotsAtDate(selectedDate);
    },
  });

  const loadSetSlotsAtDate = async () => {
    if (selectedDate) {
      const tempSetSlots = await getSetSlots({
        _id: props.fetchedDoctorDetails._id,
        date: selectedDate.format("YYYY-MM-DD"),
      });
      console.log(tempSetSlots);
      setSlotsSetAtDate(tempSetSlots);
    }
  };

  useEffect(() => {
    const tempDays = nextWeekDays();
    setNextWeekDay(tempDays);
  }, []);

  useEffect(() => {
    loadSetSlotsAtDate();
  }, [selectedDate]);

  const endTime = (startTime) => {
    const endTime = dayjs(startTime, "h:mm A");
  };

  return (
    <div className="h-[100vh] flex flex-col gap-10 overflow-y-auto">
      <div className="flex flex-row gap-4 h-[20vh] overflow-x-auto">
        {nextWeekDay.length > 0 &&
          nextWeekDay.map((date, index) => (
            <button
              className={`border border-black w-[10%] h-[100%] p-2 flex flex-col gap-2 flex-wrap items-center justify-center rounded-lg shadow-lg hover:bg-green-400 text-sm font-bold ${
                selectedDate && selectedDate == date
                  ? "bg-blue-500"
                  : "bg-white"
              }`}
              key={index}
              onClick={() => {
                formik.setFieldValue("date", date.format("YYYY-MM-DD"));
                setSelectedDate(date);
              }}
            >
              <span>{date.format("MMMM")}</span>
              <span>{date.format("ddd")}</span>
              <span>{date.date()}</span>
            </button>
          ))}
      </div>

      <div className="flex justify-between mr-10 space-x-10  ">
        {selectedDate && (
          <div
            className={`border grow flex flex-col flex-wrap w-[30%] fit-content items-center justify-center shadow-lg overflow-y-auto `}
          >
            <h1 className="font-bold mt-10">Consultation Slots</h1>
            <div className=" grid grid-cols-2 gap-4 p-4  ">
              {tempTimeSlots.map((time, index) => (
                <button
                  className={`p-4 border border-black rounded font-bold ${
                    selectedTime && selectedTime == time && "bg-red-600"
                  }

                  ${
                    slotsSetAtDate.length > 0 &&
                    slotsSetAtDate.some(
                      (slot) =>
                        slot.startTime ==
                          dayjs(time, "H:mm A").format("H:mm") &&
                        slot.date == selectedDate.format("YYYY-MM-DD")
                    ) &&
                    "bg-slate-400"
                  }
                `}
                  key={index}
                  onClick={() => {
                    setSelectedTime(time);
                    const startTime = dayjs(time, "H:mm A");
                    const endTime = startTime.add(1, "hour");
                    formik.setFieldValue("startTime", startTime.format("H:mm"));
                    formik.setFieldValue("endTime", endTime.format("H:mm"));
                  }}
                >
                  {time}
                  {}
                </button>
              ))}
            </div>
          </div>
        )}

        {selectedTime && (
          <div className="border grow-0 w-[60%] flex flex-col gap-10 items-center justify-center shadow-lg z-50 ">
            <div className="flex flex-row gap-10 items-center justify-center font-bold ">
              <h1 className="text-red-600">
                {selectedDate.format("dddd, MMMM D, YYYY")}
              </h1>
            </div>
            <div className="flex flex-row gap-10 items-center justify-center font-bold">
              <span className="font-bold text-black">Time Slot</span>
              <span className="text-emerald-900">{`${selectedTime}`}</span>
            </div>
            <div>
              {slotsSetAtDate.some(
                (slot) =>
                  slot.date == selectedDate.format("YYYY-MM-DD") &&
                  slot.startTime == dayjs(selectedTime, "H:mm A").format("H:mm")
                  // slot.confirmedStatus == false
                  // slot.completedStatus != "1";
              ) ? (
                <button
                  className="px-2 py-4 border text-center bg-red-400 rounded font-bold"
                  onClick={async () => {
                    await deleteSlot({
                      date: selectedDate.format("YYYY-MM-DD"),
                      startTime: dayjs(selectedTime, "H:mm A").format("H:mm"),
                      doctorId: props.fetchedDoctorDetails._id,
                    });
                    await loadSetSlotsAtDate();
                  }}
                >
                  Delete Slot
                </button>
              ) : (
                <button
                  className="px-2 py-4 border text-center bg-green-400 rounded font-bold"
                  onClick={formik.handleSubmit}
                >
                  Set as Available
                </button>
              )}
            </div>
            {/* <div>
              <button className="px-4 py-6 border text-center bg-green-400 rounded font-bold">
                Set as Available
              </button>
            </div> */}
          </div>
        )}
      </div>
    </div>
  );
}

export default BookingSlots1;

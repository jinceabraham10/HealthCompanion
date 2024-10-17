import React, { useEffect, useState } from "react";
import { Datepicker } from "flowbite-react";
import { CFormInput } from "@coreui/react";
import { Formik, useFormik } from "formik";
import { json } from "react-router-dom";
import { AddSlot, getSetSlots } from "../../../services/doctorService";
import { SlotSettingVerification } from "../../../validations/yupValidations/DoctorVerificationValidation";

function BookingSlots(props) {
  const [slots, setSlots] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const dateSet = new Set();
  let tempSlots = [];

  useEffect(() => {
    const onLoad = async () => {
      const tempSetSlots = await getSetSlots({
        _id: props.fetchedDoctorDetails._id,
      });
      await setAvailableSlots(tempSetSlots);
    };
    onLoad();
  }, []);

  useEffect(() => {
    if (availableSlots && availableSlots.length != 0) {
      for (let data of availableSlots) {
        dateSet.add(data.date);
      }
      console.log(dateSet);
    }
    console.log("available slots", availableSlots);
  }, [availableSlots]);

  return (
    <div className="min-h-full ml-4 mb-7 flex flex-col gap-5">
      <h1 className="font-bold "> Already set Slots</h1>
      {
        (availableSlots && availableSlots.length>0)?
        <div className="grid grid-cols-5 gap-5">
          {
            availableSlots.map((tempslot,index)=>(
              <ExistingSlot key={index} slot={tempslot}/>
            ))
          }

        </div>:""
      }

      <h1 className="font-bold "> Set Book Slots</h1>
      <div className="flex flex-row gap-7 w-full ml-10 mt-10 items-center">
        <h2 className="font-bold text-blue-500">Add Slot</h2>
        <button
          onClick={() => {
            setSlots((prevSlots) => [
              ...prevSlots,
              <Slot1
                key={prevSlots.length}
                fetchedDoctorDetails={props.fetchedDoctorDetails}
                setSlots={setSlots}
                index={prevSlots.length}
              />,
            ]);
          }}
          className="text-red-800 font-bold text-xl"
        >
          +
        </button>
      </div>
      {slots && (
        <div className="flex flex-col gap-10">
          {slots.length > 0 && (
            <div className="flex flex-col gap-10">{slots}</div>
          )}
        </div>
      )}
    </div>
  );
}

function Slot1(props) {
  const d = new Date();

  const formik = useFormik({
    initialValues: {
      date: "",
      startTime: "",
      endTime: "",
      _id: props.fetchedDoctorDetails._id,
      key: props.index,
    },
    validationSchema: SlotSettingVerification,
    onSubmit: async (values, actions) => {
      await AddSlot(formik.values);
    },
  });

  console.log(`formik values ${JSON.stringify(formik.values)}`);
  console.log(`formik errors ${JSON.stringify(formik.errors)}`);

  const [clickedAddSlot, setClickedAddSlot] = useState(true);
  const [showDateSettingOptions, setShowDateSettingOptions] = useState(false);
  const [startTime, setStartTime] = useState(undefined);
  const [endTime, setEndTime] = useState(undefined);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-col gap-4 border rounded-lg p-8 mr-10 shadow-lg z-100">
        {clickedAddSlot == true && (
          <div className="flex flex-row gap-4">
            <h2 className="font-bold text-blue-500">Choose Day</h2>
            <Datepicker
              title="Choose the day"
              onBlur={formik.handleBlur}
              onChange={formik.handleSubmit}
              minDate={new Date(d.getFullYear(), d.getMonth(), d.getDate())}
              id="id_day"
              name="day"
              onSelectedDateChanged={(selectedDate) => {
                const formattedDate = `${selectedDate.getFullYear()}-${
                  selectedDate.getMonth() + 1
                }-${selectedDate.getDate()}`;
                formik.setFieldValue("date", formattedDate);
                setShowDateSettingOptions(true);
              }}
            />
          </div>
        )}
        {showDateSettingOptions && (
          <div className="w-full grid grid-cols-3 gap-5 justify-items-start mt-10">
            <div className="flex flex-col gap-2">
              <div className="flex flex-row gap-4">
                <label className="font-bold text-blue-500" htmlFor="startTime">
                  Start Time
                </label>
                <input
                  type="time"
                  id="id_startTime"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="startTime"
                  value={formik.values.startTime}
                  className="rounded text-center"
                />
              </div>
              <span className="w-full flex flex-col justify-center items-center gap-4 text-red-500">
                {formik.touched.startTime && formik.errors.startTime
                  ? formik.errors.startTime
                  : ""}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-row gap-4">
                <label className="font-bold text-blue-500" htmlFor="startTime">
                  End Time
                </label>
                <input
                  type="time"
                  id="id_endTime"
                  name="endTime"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.endTime}
                  className="rounded text-center"
                />
              </div>
              <span className="w-full flex flex-col justify-center items-center gap-4 text-red-500">
                {formik.touched.endTime && formik.errors.endTime
                  ? formik.errors.endTime
                  : ""}
              </span>
            </div>

            <div className="flex flex-row h-10 gap-4 ml-10">
              <input
                type="submit"
                value="Add"
                className="border rounded pl-4 pr-4 pt-2 pr-4 pb-2 bg-emerald-400"
              />
            </div>
          </div>
        )}
      </div>
    </form>
  );
}

function ExistingSlot(props) {
  return (
    <div className="flex flex-col gap-4 border p-4 rounded-lg shadow-lg">
      <span className="font-bold text-red-500">{props.slot.date}</span>
       <div className="flex flex-row gap-8 ">
        <span className="font-bold text-emerald-500">{convertTo12Hour(props.slot.startTime)}</span>
        <span className="font-bold text-emerald-500">{convertTo12Hour(props.slot.endTime)}</span>
      </div>
      <div className="flex flex-row gap-2">
        <button className="border rounded-lg p-2 bg-red-500">delete</button>
      </div>
    </div>
  );
}

export function convertTo12Hour(dateIn24){
  const [hour,minute]=dateIn24.split(':')
  let rhour;
  if(hour>12){
    rhour=hour-12
    return `${rhour}:${minute} PM `
  }
  else if(hour==12){
    return `${hour}:${minute} PM`
  }
  return `${hour}:${minute} AM`

}

export default BookingSlots;

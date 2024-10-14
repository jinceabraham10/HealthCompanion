import React, { useEffect, useState } from "react";
import { Datepicker } from "flowbite-react";
import { CFormInput } from "@coreui/react";
import { Formik, useFormik } from "formik";
import { json } from "react-router-dom";
import { AddSlot } from "../../../services/doctorService";

function BookingSlots(props) {

  const [slots,setSlots]=useState([])
  let tempSlots=[]

  return (
    <div className="min-h-full ml-4 mb-7 flex flex-col gap-5">
      <h1 className="font-bold "> Set Book Slots</h1>
      <div className="flex flex-row gap-7 w-full ml-10 mt-10 items-center">
          <h2 className="font-bold text-blue-500">Add Slot</h2>
          <button onClick={()=>{
            setSlots((prevSlots) => [...prevSlots, <Slot1 key={prevSlots.length} fetchedDoctorDetails={props.fetchedDoctorDetails} />]);
          }} className="text-red-800 font-bold text-xl">+</button>
        </div>
        {
          (slots)&&
          <div className="flex flex-col gap-10">
            {
              slots.length > 0 &&<div className="flex flex-col gap-10">
                <h2 className="font-bold text-blue-500">New Slot</h2>

                {slots}

              </div>  
            }



          </div>
        }
      {/* <Slot1 fetchedDoctorDetails={props.fetchedDoctorDetails}/> */}
    </div>
  );
}

function Slot(props) {

  const formik = useFormik({
    initialValues: {},
  });

  let formattedDate



  const handleSave=(e)=>{

    console.log(formattedDate)
    formik.setFieldValue(formattedDate, {});
    

  }



  const d = new Date();
  const selectedSlotData = {};
  let slotTimeArray = [],
    slotNumber = 1;

  for (let i = 0; i < 12; i++) {
    slotTimeArray.push(i);
    selectedSlotData[i] = false;
  }
  const [selectedSlot, setSelectedSlots] = useState(selectedSlotData);

  const slotSchema = {};

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-4">
        <label className="font-bold text-blue-800" htmlFor="day">
          Choose Day
        </label>

        <Datepicker
          id="id_day"
          name="day"
          onSelectedDateChanged={(selectedDate) => {
            formattedDate = `${selectedDate.getFullYear()}-${
              selectedDate.getMonth() + 1
            }-${selectedDate.getDate()}`;
          }}
          minDate={new Date(d.getFullYear(), d.getMonth(), d.getDate())}
          title="choose the date"
        />
      </div>

      <div className="grid grid-cols-8 gap-4 justify-items-start mt-5">
        {slotTimeArray.map((t, index) => (
          <div className="flex flex-col gap-4" key={index}>
            <label
              htmlFor="slot"
              className="font-bold text-yellow-500"
            >{`slot ${index + 1}`}</label>
            <button
              onClick={() => {
                console.log(selectedSlot[index]);

                setSelectedSlots({
                  ...selectedSlot,
                  [index]: !selectedSlot[index],
                });
              }}
              className={`p-4 border rounded-lg bg-slate-300 hover:bg-red-500 text-center 
           ${selectedSlot[index] == true ? "bg-teal-400" : " "} `}
            >{`${t}.00 - ${t + 1}.00`}</button>
          </div>
        ))}
      </div>

      <div m>
        <button onClick={(e)=>handleSave(e)} className="border p-5 rounded-lg bg-green-400">Save</button>
      </div>
    </div>
  );
}

function Slot1(props){

    const d=new Date()

    const formik=useFormik(
      {
        initialValues:{
        date:"",
        startTime:"1",
        startTimeAmPm:"AM",
        endTime:"12",
        endTimeAmPm:"PM",
        _id:props.fetchedDoctorDetails._id
        },
        onSubmit:async (e)=>{
          await AddSlot(formik.values)
        }
      }
    )

    console.log(formik.values)

    const [clickedAddSlot,setClickedAddSlot]=useState(true)
    const [showDateSettingOptions,setShowDateSettingOptions]=useState(false)
    const [startTime,setStartTime]=useState(undefined)
    const [endTime,setEndTime]=useState(undefined)



    
    return(
      <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-col min-h-full min-w-full gap-4">
        {(clickedAddSlot==true) &&
          <div className="flex flex-row gap-4">
            <h2 className="font-bold text-blue-500">Choose Day</h2>
            <Datepicker title="Choose the day"  onChange={formik.handleSubmit} minDate={new Date(d.getFullYear(),d.getMonth(),d.getDate())} id="id_day" name="day" onSelectedDateChanged={(selectedDate)=>{
              const formattedDate=`${selectedDate.getFullYear()}-${
                selectedDate.getMonth() + 1
              }-${selectedDate.getDate()}`;
              formik.setFieldValue("date",formattedDate)
              setShowDateSettingOptions(true)
              
            }}/>
          </div>
        }
        {
          (showDateSettingOptions)&&


          <div className="w-full grid grid-cols-3 gap-5 justify-items-start mt-10">
            <div className="flex flex-row gap-4">
              <label className="font-bold text-blue-500" htmlFor="startTime">Start Time</label>
              <input max={12} min={1} id="id_startTime" onChange={formik.handleChange} name="startTime" value={formik.values.startTime} className="rounded text-center" type="number"/>
              <select  id="id_start_am/pm"  name="start_am/pm" onChange={(e)=>{
                formik.setFieldValue("startTimeAmPm",e.target.value)
              }} className="rounded bg-red-300" >
                <option >AM</option>
                <option>PM</option>
              </select>

            </div>
            <div className="flex flex-row gap-4">
              <label className="font-bold text-blue-500" htmlFor="startTime">End Time</label>
              <input max={12} min={1} id="id_endTime" name="endTime" onChange={formik.handleChange} value={formik.values.endTime} className="rounded text-center" type="number"/>
              <select  id="id_end_am/pm" name="end_am/pm" onChange={(e)=>{
                formik.setFieldValue("endTimeAmPm",e.target.value)
              }} className="rounded bg-red-300" >
                <option >PM</option>
                <option >AM</option>
              </select>
            </div>

            <div className="flex flex-row gap-4 ml-20">
              <input type="submit" value="Add" className="border rounded pl-4 pt-2 pr-4 pb-2 bg-emerald-400"/>
            </div>

          </div>
        }
        
      </div>
      </form>
    
  )
}

export default BookingSlots;

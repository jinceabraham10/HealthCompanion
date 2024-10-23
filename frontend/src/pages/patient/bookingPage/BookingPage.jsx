import React, { useEffect, useState } from "react";
import styles from "./bookingPageCss.module.css";
import { json, useLocation } from "react-router-dom";
import { Checkbox, Dropdown, FloatingLabel,Datepicker } from "flowbite-react";
import { getSetSlots } from "../../../services/doctorService";
import { bookSlot } from "../../../services/userService";
import { convertTo12Hour } from "../../doctor/slot/BookingSlots";
import Swal from "sweetalert2";


function BookingPage(props) {
  const { doctor,patient } = props;
  const [slotsAvailable,setSlotsAvailable]=useState([])
  const [slotsDisplayed,setSlotsDisplayed]=useState([])
  const [dates,setDates]=useState(new Set())
  const [datesDisplayed,setDatesDisplayed]=useState(new Set())
  
  
  const todayDate=new Date()
  console.log(`patient ${JSON.stringify(doctor)}`);


  const onLoad=async ()=>{
    const slots=await getSetSlots({_id:doctor._id})
      await setSlotsAvailable(slots)
      await setSlotsDisplayed(slots)
      
    }

  useEffect(()=>{
    onLoad()
    document.getElementById(`id_allDates`).checked=true

  },[])
  
  useEffect(()=>{
    console.log(slotsAvailable)
    if(slotsAvailable.length>0){
      const unique=new Set([...dates])
      for(let data of slotsAvailable){
        unique.add(data.date)
      }
      setDates(unique)
      setDatesDisplayed(unique)
    }

  },[slotsAvailable])



  useEffect(()=>{
    console.log(dates)


  },[dates])


  return (
    <div className=" h-full flex flex-col gap-4 m-10">
      <div className="ml-10 mt-10 flex flex-row gap-20 w-full items-center">
        <div className="flex flex-col items-center shadow-xl p-4 z-1000 border rounded">
          <img
            className="rounded-full border flex flex-wrap h-40 w-40"
            src={`data:image/jpeg;base64,${doctor.realProfileImage}`}
            alt=""
          />
          <h2 className="font-bold">{`${doctor.firstName} ${doctor.lastName}`}</h2>
        </div>

        <h1 className="font-bold text-red-500 text-2xl w-1/2 text-center">
          {doctor.specialization.toUpperCase()}
        </h1>
      </div>

      <div className="flex flex-row gap-40 justify-center items-center">
        <div className="flex flex-row gap-4">
          <label className="font-bold" htmlFor="searchDate">Search</label>
          {/* <select className="w-40 rounded-md text-slate-800 bg-yellow-300">
            {Array.from(dates).map((date)=>(

              <option>{date}</option>

            ))}
          </select> */}
          <Datepicker  name="filterDate" id="id_filterDate"  minDate={new Date(todayDate.getFullYear(),todayDate.getMonth(),todayDate.getDate())} className="rounded text-slate-800"
          onSelectedDateChanged={async (selectedDate)=>{
            const formattedDate = `${selectedDate.getFullYear()}-${
              selectedDate.getMonth() + 1
            }-${selectedDate.getDate()}`;
            const filteredSlots=slotsAvailable.filter((slot)=>slot.date==formattedDate)
            document.getElementById(`id_allDates`).checked=false
            await setSlotsDisplayed(filteredSlots)
            await setDatesDisplayed([formattedDate])
          }}
          />
        </div>

        <div className="flex flex-row gap-2">
          <input type="checkbox" name="allDates"  id="id_allDates" 
          onChange={async (e)=>{
            if(e.target.checked==true){
              await onLoad()
            }

          }} />
          <label htmlFor="allDates">ALL</label>
        </div>
      </div>

      <div className="flex flex-col gap-8 mt-10 ">
        <h2 className="font-bold">Slots Available for Booking</h2>
        {
          Array.from(datesDisplayed).map((date,index)=>(
            (new Date(date)>= new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate())) &&
            <div key={index} className="flex flex-col gap-8 border rounded-lg shadow-lg p-4">
              <h2 className="font-bold text-emerald-500">{date}</h2>
              <div className="grid grid-cols-3 gap-2">
                {
                  slotsDisplayed.map((slot,index)=>(
                    (slot.date==date) && (new Date(slot.date)>= new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate()))  ?
                     <div key={index} className={`border p-4 flex flex-col gap-4 rounded shadow-xl ${ (slot.confirmStatus) ? `bg-red-300`:`bg-white`}`}>
                     {(slot.confirmStatus) && <h3 className="font-bold text-white">slot has been booked</h3>} 
                      <div className="flex flex-row justify-between ">
                        <span className="font-bold">{convertTo12Hour(slot.startTime)}</span>
                        <span className="font-bold text-black-800">to</span>
                        <span className="font-bold">{convertTo12Hour(slot.endTime)}</span>
                      </div>

                      <div className="flex flex-row gap-4">
                        <button disabled={ (slot.confirmStatus) ? true:false}  className={`p-4 text-center rounded font-bold bg-green-400` }
                        
                        onClick={async (e)=>{

                          Swal.fire({
                            icon:"question",
                            showCancelButton:true,
                            confirmButtonText:"Confirm",
                            title:"Confirmation",
                            text:"Can we proceed to confirm the slot"
                          }).then(async (result)=>{
                            if(result.isConfirmed){
                              await bookSlot({patientId:patient._id,
                                slotId:slot._id
                              })

                              await onLoad()

                            }
                          })


                        }}
                        >Book</button>
                      </div>
                      
                    </div>:""
                  ))
                }

              </div>

            </div>

          ))
        }
        {/* <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={closeModal}
          >
            Close 
          </button> */}
      </div>
    </div>
  );
}

export function formattedDate(date){
  const CreatedDate = {
      year: date.getFullYear() + 1,
      month: date.getMonth() + 1,
      day: date.getDay() + 1,
      hour: date.getHours() % 12 ? date.getHours() % 12 : 12,
      minute:
        date.getMinutes() % 60
          ? date.getMinutes() % 60 < 10
            ? "0" + (date.getMinutes() % 60)
            : date.getMinutes() % 60
          : "00",
      second:
        date.getSeconds() % 60
          ? date.getSeconds() % 60 < 10
            ? "0" + (date.getSeconds() % 60)
            : date.getSeconds() % 60
          : "00",
      milliseconds: date.getMilliseconds(),
      ampm: date.getHours() > 12 ? "pm" : "am",
    };
    const accountCreatedat = `${CreatedDate.year}/${CreatedDate.month}/${CreatedDate.day} ${CreatedDate.hour}:${CreatedDate.minute}:${CreatedDate.second} ${CreatedDate.ampm}`;
    return accountCreatedat
}




export default BookingPage;

import React, { useEffect, useState } from 'react'
import { getBookedPatients, getSetSlots } from '../../../services/doctorService'
import { convertTo12Hour } from '../slot/BookingSlots'

function BookedPatients(props) {
    
    const [displayedPatients,setDisplayedPatients]=useState([])

    const onLoad=async ()=>{
        const slots=await getBookedPatients({doctorId:props.fetchedDoctorDetails._id})
        console.log(slots)
        setDisplayedPatients(slots)
    }
    useEffect(()=>{
        onLoad()

    },[])

    const consultationBookingStatus=(completionStatus)=>{
        switch(completionStatus){
            case '0':
                return "Meeting Pending"
                break;
            case "1":
                return "Consulted"
                break;
            case "2":
                return "Canceled by the user"
                break
        }
    }
    
  return (
    <div className='flex flex-col gap-4 w-auto'>
        {
          (displayedPatients.length>0) &&  displayedPatients.map((slot,index)=>(
                <div className='border rounded-lg shadow-lg  p-4 flex flex-row gap-10 mr-10 w-[90%]  ' key={index}>
                    <span className=' w-[40%]  flex flex-col gap-4 justify-center items-center '>
                    <img src={(slot.patientId.realProfileImage)?`data:image/jpeg;base64,${slot.patientId.realProfileImage}`:""} className="border h-[50%] w-[60%] rounded-full" alt="img" />
                    <span className='flex flex-row gap-2 font-bold'>
                        <h2>{slot.patientId.firstName}</h2>
                        <h2>{slot.patientId.lastName}</h2>
                        </span>
                    </span>
                    
                    <div className='flex flex-col gap-10 w-[70%] h-[50%] bg-gray-100 p-4 '>
                        <div className='grid grid-cols-2 gap-0 font-bold text-emerald-500'>
                            <span className='flex flex-row gap-2 w-[100%]'>
                                <span className='font-bold text-black'>Date :</span>
                                {slot.date}
                            </span>
                            <div className='flex flex-row gap-6 w-[100%]'>
                                    <span className='font-bold text-black'>Time :</span>
                                    <span>
                                        {convertTo12Hour(slot.startTime)}
                                    </span>
                                    <span className='font-bold text-black'>-</span>
                                    <span>
                                        {convertTo12Hour(slot.endTime)}
                                    </span>
                            </div>
                           
                        </div>
                        
                        <div className='grid grid-cols-2 gap-10 font-bold'>
                            <span className='flex flex-row gap-5'>
                                <h2 className='text-red-500'>height :</h2>
                                <h2>{slot.patientId.height}</h2>
                            </span>
                            <span className='flex flex-row gap-5'>
                                <h2 className='text-red-500'>weight :</h2>
                                <h2>{slot.patientId.weight}</h2>
                            </span>
                            <span className='flex flex-row gap-5'>
                                <h2 className='text-red-500'>Blood Group :</h2>
                                <h2>{slot.patientId.bloodGroup}</h2>
                            </span>              
                            
                        </div>

                        <div className='border'>
                            <textarea name="" id="" className='w-[100%]' disabled >
                                {slot.patientDescription}
                            </textarea>

                        </div>

                        <span className={`font-bold w-[100%] border px-4 py-4 flex items-center justify-center ${(slot.completedStatus==0)&& "bg-green-400"}
                        ${(slot.completedStatus==1)&& "bg-blue-400"}
                        ${(slot.completedStatus==2)&& "bg-red-400"}`}>{consultationBookingStatus(slot.completedStatus)}</span>

                    </div>


                </div>
            ))
        }
      
    </div>
  )
}

export default BookedPatients

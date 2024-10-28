import React, { useEffect, useState } from 'react'
import { getAllReviewsForADoctor } from '../../../services/doctorService'
import Rating from '@mui/material/Rating';

function DoctorReviews(props) {

    const [allReviews,setAllReviews]=useState([])
    const onLoad=async ()=>{
       const tempReviews=await getAllReviewsForADoctor({doctorId:props.selectedDoctor._id})
       setAllReviews(tempReviews)
    }

    useEffect(()=>{
        onLoad()
    },[])

    console.log(props.selectedDoctor)

  return (
    <div className='flex flex-col gap-4 '>
    {
      (allReviews.length>0) &&
      allReviews.map((review,index)=>(
        <Review doctor={props.doctor}  review={review} key={index}/>
      ))
    }
    </div>
  )
}

function Review(props){
  return(
    <div className='border h-[40vh] flex flex-col gap-4 p-4 bg-emerald-300 rounded-lg'>
      <div className='feed h-[20%] flex flex-row gap-6 items-center'>
        <span>
          <img src={props.review.slotId.patientId.realProfileImage} alt="" className='h-[7vh] w-[7vh] rounded-full' />
        </span>
        <span >
          {`${props.review.slotId.patientId.firstName} ${props.review.slotId.patientId.lastName}  `}
        </span>

      </div>
      <div className='w-full h-[60%]'>
        <textarea name="patientComment" value={props.review.patientComment} id="id_patientComment" className='w-full rounded text-lg h-full '></textarea>
      </div>

      <div className='grid grid-cols-2 gap-1 mt-5 font-bold '>
        <span>
          Rating
        </span>
        <span>
                <Rating
                  name="simple-controlled"
                  value={props.review.rating}
                  
               />
        </span>
      </div>

    </div>
  )
}

export default DoctorReviews

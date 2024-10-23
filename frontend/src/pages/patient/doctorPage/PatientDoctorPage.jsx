    import React, { useEffect, useState } from 'react'
    import DoctorCardView from '../../../components/doctor/doctorCardView'
    import { getAllDoctors } from '../../../services/doctorService'
    import styles from './PatientDoctorPage.module.css'
    import BookingPage from '../bookingPage/BookingPage'
    import ReactModal from 'react-modal'
    
    function PatientDoctorPage(props) {
      
      const [doctors,setDoctors]=useState([])
      const [showSlotPage,setShowSlotPage]=useState(false)
      useEffect(()=>{
        const onLoad=async ()=>{
          const allDoctors=await getAllDoctors()
          await setDoctors(allDoctors)
          // await console.log(`doctors ${JSON.stringify(doctors)}`) 
        }
        onLoad()
        
        
      },[])

      useEffect(()=>{
        // console.log(`doctors ${JSON.stringify(doctors)}`) 
        
        
      },[doctors])

      // console.log(`patient ${JSON.stringify(props.patient)}`)

      return (
       <div className="grid grid-cols-2 gap-4">
          {
            (doctors) ? doctors.map(doctor=>(
              <DoctorCardView key={doctor._id} doctor={doctor} patient={props.patient} setSelectedDoctor={props.setSelectedDoctor} setOpenBookingSlot={props.setOpenBookingSlot}/>
            )): "no doctors"
          }
                   
       </div>
      )
    }
    
    export default PatientDoctorPage
    
    import React, { useEffect, useState } from 'react'
    import DoctorCardView from '../../../components/doctor/doctorCardView'
    import { getAllDoctors } from '../../../services/doctorService'
    import styles from './PatientDoctorPage.module.css'
    
    function PatientDoctorPage() {
      
      const [doctors,setDoctors]=useState([])

      useEffect(()=>{
        const onLoad=async ()=>{
          await setDoctors(await getAllDoctors())
          await console.log(doctors) 
        }
        onLoad()
        
        
      },[])

      

      return (
       <div className={styles.doctorCardListParent}>
          {
            doctors.map(doctor=>(
              <DoctorCardView key={doctor._id} doctor={doctor}/>
            ))
          }

       </div>
      )
    }
    
    export default PatientDoctorPage
    
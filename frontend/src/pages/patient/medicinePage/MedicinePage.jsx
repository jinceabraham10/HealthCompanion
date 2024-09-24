import React, { useEffect, useState } from 'react'
import MedicineCardView from '../../../components/medicine/medicineCardView/MedicineCardView'
import {getAllMedicines} from '../../../services/medicineService'
import styles from './MedicinePageCss.module.css'

function MedicinePage() {

    const [medicines,setMedicines]=useState([])

    useEffect(()=>{
       const onload=async ()=>{
        const resp= await getAllMedicines()
        console.log(resp)
        if(resp.length!=0){
            await setMedicines(resp)
        }
       }
       onload()
    },[])

  return (
    <div className={styles.medicineCardListParent}>
        {medicines.map(medicine=>(
            <MedicineCardView key={medicine._id} medicine={medicine}/>
        ))} 
    </div>
  )
}

export default MedicinePage

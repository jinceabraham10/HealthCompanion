import React from 'react'
import styles from './bookingPageCss.module.css'
import AvailableSlots from '../../../components/doctor/availableSlot/AvailableSlots' 

function BookingPage() {
  
    
  return (
    <div className={styles.bookingPageParent}>
      <AvailableSlots/>


    </div>
  )
}

export default BookingPage

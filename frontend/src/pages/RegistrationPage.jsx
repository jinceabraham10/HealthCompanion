import React from 'react'

function RegistrationPage() {
  return (
    <div>
      <form action="">
        <CommonUserDetails/>
      </form>
      
    </div>
  )
}

function CommonUserDetails(){

    return(
        <div className='register-role-select'>
          <img src="" alt="user" />
          <select name="role" id="id_role">
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
            <option value="pharmacy">Patient</option>
            <option value="laboratory">Laboratory</option>
          </select>
          
        </div>
    )
}


export default RegistrationPage

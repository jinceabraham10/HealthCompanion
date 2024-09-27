import React from 'react'
import { Button, TextField } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

function DoctorVerificationForm1() {
  return (
    <div className="flex flex-col h-screen  justify-center space-y-10 m-10">
      <div className='flex flex-row space-x-10'>
      <TextField id="id_firstName" varient="outlined" label="First Name" required/>
      <TextField id="id_firstName" varient="outlined" label="Last Name" required/>
      </div>
      <div className='flex flex-col space-y-10 w-1/2 '>
      <TextField id="id_height" variant='outlined' label="height"/>
      <TextField id="id_weight" varient="outlined" label="Weight" />
      <TextField id="id_bloodGroup" varient="outlined" label="Blood Group" />
      <TextField id="id_specialization" varient="outlined" label="specialization" required/>
      </div>
      <div className='flex w-full flex-row items-center gap-10'>
        <label htmlFor="license " className='text-red-700'>License</label>
        <Button 
        startIcon={<CloudUploadIcon/>}
        variant='contained'
        required>
          Upload License (PDF)
        </Button>
      </div>



    </div>
  )
}

export default DoctorVerificationForm1

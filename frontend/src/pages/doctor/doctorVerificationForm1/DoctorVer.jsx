import React from 'react'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

function DoctorVer() {
  return (
    <Box
    component="form"
    sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
    noValidate
    autoComplete="off"
  >
    <TextField id="outlined-basic" label="Outlined" variant="outlined" />
    <TextField id="filled-basic" label="Filled" variant="filled" />
    <TextField id="standard-basic" label="Standard" variant="standard" />
  </Box>
  )
}

export default DoctorVer

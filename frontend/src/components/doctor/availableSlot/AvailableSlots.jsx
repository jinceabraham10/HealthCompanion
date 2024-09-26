import React from 'react'
import styles from './AvailableSlot.module.css'
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material'
import { yellow } from '@mui/material/colors'

function AvailableSlots({slot={
  startTime:"5 am",
  endTime:"6 am"
}}) {


  return (
   <Card sx={{
    height:200,
    width:300,
    padding:5,
    backgroundColor:"yellow",
    boxShadow:"0px 0px 5px black"
   }}>
    <CardContent sx={{
      display:"flex",
      gap: 5
    }}>
    <Typography variant='h4'>
        {slot.startTime} 
      </Typography>
      <Typography variant='h4'>
        -
      </Typography>
      <Typography variant='h4'>
        {slot.endTime}
      </Typography>

    </CardContent>
    <CardContent>
      <Typography>
        24 th August 2024
      </Typography>
    </CardContent>

    <CardActions>
      <Button variant='contained' sx={{
        padding: 2,
        paddingLeft:4,
        paddingRight:4
      }}>
        book
      </Button>
    </CardActions>

   </Card>
  )
}

export default AvailableSlots

import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import { useNavigate } from 'react-router-dom';


function DoctorCardView({doctor}) {

  const navigate=useNavigate()

  return (
    <Card sx={{ maxWidth: 240, margin: "20px", borderRadius: 3, boxShadow:"4px 3px 10px black"}}>
    <CardActionArea sx={{height:"fit"}}>
      <CardMedia
        component="img"
        height="fit"
        image="logo/doctor.png"
        alt="green iguana"
        sx={{
            borderRadius: 3
        }}
      />
      <CardContent sx={{padding:1}}>
        <Typography gutterBottom variant="h6" component="div">
          {`${doctor.firstName} ${doctor.lastName}`}
        </Typography>
        <Typography variant="h7" >
          {`Specialization : ${doctor.specialization}`}
        </Typography>
      </CardContent>
    </CardActionArea>
    <CardActions>
      <Button variant="contained" sx={{ margin:1}} size="small" onClick={()=>{
        navigate('/patientDoctorSlot')
      }} >
        Proceed to Book Slots
      </Button>
    </CardActions>
  </Card>
  )
}

export default DoctorCardView

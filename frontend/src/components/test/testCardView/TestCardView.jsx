import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';

function TestCardView({test}) {
  return (
    <Card sx={{ maxWidth: 240, margin: "20px", borderRadius: 3, padding: 5 , boxShadow:"4px 3px 10px black"}}>
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
      <CardContent sx={{padding:5}}>
        <Typography gutterBottom variant="h6" component="div">
          {`${test.testName}`}
        </Typography>
        <Typography variant="h6" >
          {`description  : ${test.description}`}
        </Typography>
      </CardContent>
    </CardActionArea>
    <CardActions>
      <Button variant="contained" sx={{ padding:2}} size="small" >
        {`Proceed to Book  ${test.price}` }
      </Button>
    </CardActions>
  </Card>
  )
}

export default MedicineCardView

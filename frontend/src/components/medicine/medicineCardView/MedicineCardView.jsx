import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';

function MedicineCardView({medicine}) {
  return (
    <Card sx={{ maxWidth:500, flexGrow:1,margin: "20px", borderRadius: 3 , boxShadow:"4px 3px 10px black"}}>
    <CardActionArea sx={{height:"fit"}}>
      <CardMedia
        component="img"
        height="fit"
        image="logo/medicine1.png"
        alt="green iguana"
        sx={{
            borderRadius: 3
        }}
      />
      <CardContent sx={{padding:5}}>
        <Typography gutterBottom variant="h6" component="div">
          {`${medicine.medicineName}`}
        </Typography>
        <Typography variant="h6" >
          {`description  : ${medicine.description}`}
        </Typography>
      </CardContent>
    </CardActionArea>
    <CardActions  sx={{padding:5}}>
      <Button variant="contained" sx={{ padding:2}} size="small" >
        {`Proceed to Book  PRICE: rs  ${medicine.price}` }
      </Button>
    </CardActions>
  </Card>
  )
}

export default MedicineCardView

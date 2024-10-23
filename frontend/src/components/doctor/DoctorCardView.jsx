import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Modal from "react-modal";
import BookingPage from "../../pages/patient/bookingPage/BookingPage";

function DoctorCardView(props) {
  const { doctor, patient }=props
  const navigate = useNavigate();
  const [openModal,setOpenModal]=useState(false)
  const closeModal = () => setOpenModal(false);
  if (doctor) {
    console.log(doctor.realProfileImage);
  }

  return (
    <>
    <ModalBox openModal={openModal} closeModal={closeModal} doctor={doctor} patient={patient}/>
    <Card
      sx={{
        maxWidth: 280,
        margin: "20px",
        borderRadius: 3,
        boxShadow: "4px 3px 10px black",
      }}
    >
      <CardActionArea sx={{ height: "fit" }}>
        <CardMedia
          component="img"
          height="fit"
          image={`data:image/jpeg;base64,${doctor.realProfileImage}`}
          alt="green iguana"
          sx={{
            borderRadius: 3,
          }}
        />
        <CardContent sx={{ padding: 1 }}>
          <Typography gutterBottom variant="h6" component="div">
            {`${doctor.firstName} ${doctor.lastName}`}
          </Typography>
          <Typography variant="h7">
            {`Specialization : ${doctor.specialization}`}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          variant="contained"
          sx={{ margin: 1 }}
          size="small"
          onClick={() => {
            // navigate("/patientSlotBooking", {
            //   state: {
            //     doctor: doctor,
            //     patient: patient,
            //   },
            // });

            props.setOpenBookingSlot(true)
            props.setSelectedDoctor(doctor)
          }}
        >
          Proceed to Book Slots
        </Button>
      </CardActions>
    </Card>
    </>
    
  );
  
}

function ModalBox(props) {
  return (
    <Modal
      isOpen={props.openModal}
      onRequestClose={props.closeModal}
      className="flex flex-col jsutify-center w-full h-full ml-10 mr-10 z-50 bg-white mt-5 overflow-auto pb-4 "
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center "
      contentLabel="Example Modal"
    >
      <div className="relative bottom-5n p-4">
      <BookingPage doctor={props.doctor} patient={props.patient} closeModal={props.closeModal}/>
      </div>
    </Modal>
  );
}

export default DoctorCardView;

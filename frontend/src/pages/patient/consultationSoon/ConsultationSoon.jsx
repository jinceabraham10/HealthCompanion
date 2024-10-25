import React, { useEffect, useState } from "react";

function ConsultationSoon(props) {

  const[consultationIn30,setConsultationIn30]=useState(null)
  useEffect(() => {
    const ws = new WebSocket("http://localhost:5000");
    ws.onopen = () => {
      console.log("Started connecting to the backend");
      ws.send(JSON.stringify({ type: "register", _id: props.patientData._id }));
    };

    ws.onmessage = async (event) => {
      const dataReceived = JSON.parse(event.data);
      await console.log(`data receieved ${JSON.stringify(dataReceived)}`);
      await setConsultationIn30(dataReceived.slots)
    };

    // return ()=>{
    //     ws.close()
    // }
  }, []);


  useEffect(()=>{
    console.log(`consultationIn30 ${JSON.stringify(consultationIn30)}`)

  },[consultationIn30])

  return (
    <div className="w-full h-full ">
        {
            (consultationIn30)
            && <h1>{consultationIn30.startTime}</h1>
        }
      
    </div>
  );
}

export default ConsultationSoon;

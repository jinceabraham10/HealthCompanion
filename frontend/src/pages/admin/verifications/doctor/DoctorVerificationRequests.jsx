import React, { useEffect, useState } from "react";
import { ApproveDoctor, getAllToBeApprovedDoctorsList } from "../../../../services/adminService";

function DoctorVerificationRequests() {
  const [doctors, setDoctors] = useState(undefined);
  const [refresh,setRefresh]=useState(true)
  const load = async () => {
    const temp = await getAllToBeApprovedDoctorsList();
    console.log(temp);
    await setDoctors(temp.doctors);
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(()=>{
    console.log(`refresh ${refresh}`)

  },[refresh])
  

  return (
    <div>
      {(doctors) &&
        doctors.details.map((doctor) => 
        <li key={doctor._id}><RequestListCard doctor={doctor} profileImage={doctors.profileImage[doctor._id]} load={load}/></li>) }
      
    </div>
  );
}

function RequestListCard(props) {

    const handleApprove=async (e)=>{
        await ApproveDoctor({doctorId:props.doctor._id})
        props.load()  
        
    }

  return (
    <div className="flex flex-row h-30 w-1/2 ml-10 gap-10 border rounded-lg p-5 shadow-lg">
      <div className="border outline rounded-lg flex flex-row">
        <img
          src="logo/doctor.png"
          className="grow"
          width="250"
          alt="doctorImage"
        />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="font-bold">{`${props.doctor.firstName} ${props.doctor.lastName} `}</h1>
        <h2 className="font-bold">{props.doctor.specialization}</h2>
        <div className="flex flex-row gap-4">
          <button className="p-4 border bg-red-700 rounded hover:bg-yellow-300 text-white">
            Reject
          </button>
          <button name="btnapprove" className="p-4 border bg-green-400 rounded hover:bg-red-300 text-white" onClick={handleApprove}>
            Approve
          </button>
        </div>
      </div>
    </div>
  );
}

export default DoctorVerificationRequests;

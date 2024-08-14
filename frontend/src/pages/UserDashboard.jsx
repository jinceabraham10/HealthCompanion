import React, { useEffect, useState } from "react";
import axios from 'axios'
function UserDashboard(){
    const [datas,setdata]=useState([])
    const fetchData=async ()=>{
        try {
            const resp=await axios.get('http://localhost:5000/api/user')
            setdata(resp.data)
            console.log(resp.data)
            if(Array.isArray(datas)){
                console.log("its an array")
            }
            else{
                console.log("Not an array",datas.at)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        fetchData()
        
    },[])

    return(
        <>
       
       {datas.map(data=>(
        <h1>{data._id}</h1>
       ))}
       
        </>
    )
}

export default UserDashboard;
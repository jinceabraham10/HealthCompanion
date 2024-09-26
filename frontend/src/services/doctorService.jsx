import axios from "axios";

export async function getAllDoctors(){
    try {
        const resp=await axios.get('http://localhost:5000/api/doctor/getAllDoctors')
        // console.log(resp.data.allDoctors)
        return resp.data.allDoctors
        
    } catch (error) {
        
    }
}
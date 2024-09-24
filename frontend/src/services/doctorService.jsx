import axios from "axios";

export async function getAllDoctors(){
    try {
        const resp=await axios.get('http://localhost:5000/api/doctor/getAllDoctors')
        return resp.data.allDoctors
        
    } catch (error) {
        
    }
}
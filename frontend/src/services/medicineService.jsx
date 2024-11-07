import axios from "axios";

export async function getAllMedicines(){
    try {
        const resp=await axios.get("https://healthcompanion.onrender.com:5000/api/medicine/getAllMedicines")
        // console.log(resp.data.allMedicines)
        return resp.data.allMedicines
        
    } catch (error) {

        console.log(error.response.data.message)
        
    }
}


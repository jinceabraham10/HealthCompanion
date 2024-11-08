import axios from "axios";
import swal from "sweetalert2";

export async function getAdminDetails(adminData){

    try {
        const resp= await axios.post('https://healthcompanion.onrender.com/api/admin/checkAdmin',userData)
        console.log(resp.data)

        
    } catch (error) {
        console.log(`error ${error}`)
    }
}


export async function ApproveDoctor(toBeApprovedData) {
    try {
        const resp=await axios.post('https://healthcompanion.onrender.com/api/admin/approveDoctor',toBeApprovedData)
        console.log(resp.data)
        
    } catch (error) {
        console.log(`error ${error}`)
    }
    
}

export async function rejectDoctor(toBeApprovedData) {
    try {
        const resp=await axios.post('https://healthcompanion.onrender.com/api/admin/rejectDoctor',toBeApprovedData)
        console.log(resp.data)
        
    } catch (error) {
        console.log(`error ${error}`)
    }
    
}

export  async function getAllToBeApprovedDoctorsList() {
    try {

        const resp=await axios.get('https://healthcompanion.onrender.com/api/admin/getAllToBeApprovedDoctors')
        // console.log(resp.data)
        return resp.data
        
    } catch (error) {
        console.log(`error ${error}`)
    }
    
}
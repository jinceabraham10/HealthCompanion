import axios from "axios";
import swal from "sweetalert2";

export async function getAdminDetails(adminData){

    try {
        const resp= await axios.post('http://localhost:5000/api/admin/checkAdmin',userData)
        console.log(resp.data)

        
    } catch (error) {
        console.log(`error ${error}`)
    }
}


export async function ApproveDoctor(toBeApprovedData) {
    try {
        const resp=await axios.post('http://localhost:5000/api/admin/approveDoctor',toBeApprovedData)
        console.log(resp.data)
        
    } catch (error) {
        console.log(`error ${error}`)
    }
    
}

export async function rejectDoctor(toBeApprovedData) {
    try {
        const resp=axios.post('http://localhost:5000/api/admin/approveDoctor',toBeApprovedData)
        console.log(resp.data)
        
    } catch (error) {
        console.log(`error ${error}`)
    }
    
}

export  async function getAllToBeApprovedDoctorsList() {
    try {

        const resp=await axios.get('http://localhost:5000/api/admin/getAllToBeApprovedDoctors')
        // console.log(resp.data)
        return resp.data
        
    } catch (error) {
        console.log(`error ${error}`)
    }
    
}
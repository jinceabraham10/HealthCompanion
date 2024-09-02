import axios from 'axios'
import swal from 'sweetalert2'

const message={
    "icon":"success",
    "title":"Sign UP",
    "text":"Account Created Successfully"
}
const alert=(message)=>{
    swal.fire(message)

}

export async function createUser(userData){
    try {
        // console.log("recieved from RegisterationPage",userData)
        const response=await axios.post("http://localhost:5000/api/user/register",userData)
        console.log(response)
        alert(message)
    } catch (error) {
        console.log(error)
        message.icon="error"
        message.title="Sign Up Failed"
        message.text="Error during creation"
        alert(message)
    }

}
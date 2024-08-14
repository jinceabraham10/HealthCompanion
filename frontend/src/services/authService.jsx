import axios from "axios"

async function Register(regData){
    try {
        console.log(regData)
        const resp=await axios.post('http://localhost:5000/api/register',regData)
        console.log(resp.data)

        
    } catch (error) {
        console.log(error)
    }

}

export {Register}
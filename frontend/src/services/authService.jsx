import axios from "axios";
import swal from "sweetalert2";

async function LoginUser(loginData) {
  try {
    const resp=await axios.post('http://localhost:5000/api/auth/login',loginData)
    console.log(resp)
    swal.fire({
      icon:"success",
      title:"Login Successfull",
      text:"Credentials have been verified and welcoming you to HealthCompanion"
    })

    localStorage.setItem('token',resp.data.token)

    return resp.data.userData

  } catch (error) {
    
    const resp=error.response.data
    if(resp.errorStatus== "1"){
      swal.fire({
        icon:"error",
        title:"Login Unsuccessfull",
        text:"Invalid password"
      })
      return false
    }
    else if(resp.errorStatus== "0"){
      swal.fire({
        icon:"error",
        title:"Login Unsuccessfull",
        text:"User doesn't exist"
      })
      return false
    }
    else{
      console.log("response is supper",error);
    }
    return false
  }
}


async function DataOnPageLoad(token) {
  try {
    const resp=await axios.get("http://localhost:5000/api/auth/loadData",{
      headers:{
        'authorization':`${token}`
      }
    })
    return resp.data.fetchedData 
    
  } catch (error) {
    if(error.response.data.message="invalid token"){
      swal.fire({
        icon:"warning",
        title:"Login Again",
        text:"Session has been out"
      })

    }
    
  }
  
}


async function CheckUserPresent(data) {
  try {
    console.log(data)
    const resp=await axios.post('http://localhost:5000/api/auth/checkUserPresent',data)
    console.log(resp)
    if(resp.data.isPresent){
      swal.fire({
        icon:"warning",
        title:"User Exist",
        text:"User with below username or email is already present"
      })
    return true
    }else{
      return false
    }

  } catch (error) {
    
    const resp=error.response.data
    return false
  }
}


export { LoginUser,DataOnPageLoad, CheckUserPresent };

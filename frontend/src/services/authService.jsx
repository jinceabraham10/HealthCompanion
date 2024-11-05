import axios from "axios";
import swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


async function LoginUser(loginData) {
  try {
    const resp=await axios.post('https://healthcompanion.onrender.com/api/auth/login',loginData)
    console.log(resp)
    await  swal.fire({
      icon:"success",
      title:"Login Successfull",
      text:"Credentials have been verified and welcoming you to HealthCompanion"
    })

    sessionStorage.setItem('token',resp.data.token)

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


async function DataOnPageLoad(token,role) {
  try {
    let resp=''
    if(role==0){
      resp=await axios.get("http://localhost:5000/api/auth/loadData/patient",{
        headers:{
          'authorization':`${token}`
        }
      })
    }
    else if(role==1){
      resp=await axios.get("http://localhost:5000/api/auth/loadData/doctor",{
        headers:{
          'authorization':`${token}`
        }
      })
    }
    else if(role==4){
      resp=await axios.get("http://localhost:5000/api/auth/loadData/admin",{
        headers:{
          'authorization':`${token}`
        }
      })
      
    }

    console.log(`doctor resp ${resp.data}`)
   
    return resp.data.fetchedData 
    
  } catch (error) {

    console.log(`${error}`)
    if(error.response.data.message="invalid token"){
      swal.fire({
        icon:"warning",
        title:"Login Again",
        text:"Session has been out"
      })
      return false

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

export async function GoogleSignIN(token) {
  try {
    console.log(token)
    // const resp=null
    const resp=await axios.post('http://localhost:5000/api/auth/google/checkUserPresent',{token: token})
    if(!resp.data.userData){
      await console.log("Reached Google Sign in")
      const role=await swal.fire(
        {
          title:"Role",
          input:"select",
          inputOptions:{
            0:"patient",
            1:"doctor",
            2:"pharmacy",
            3:"laboratory",
  
          },
          inputPlaceholder:"Select a role to proceed",
          showCancelButton:true,
        }
      )
      // console.log(`role ${JSON.stringify(role.value)}`)
      const resp2=await axios.post("http://localhost:5000/api/user/google/createUser",{token:token,role:role.value})
      console.log(`response after creating the user ${resp2}`)
      if(resp2.data.userData){
        swal.fire({
          icon:"success",
          title:"Successfully Signed in",
          text:"Succesfully Siged in using Google Account"
        })
      }
      await sessionStorage.setItem('token',resp2.data.token)
      await console.log(`recieved jwt toke ${resp2.data.token}`)
      return resp2.data.userData  
        }
    await sessionStorage.setItem('token',resp.data.token)
    await console.log(resp.data.userData)
    return resp.data.userData
    
  } catch (error) {
    console.log(error)
    swal.fire({
      title:"Error",
      icon:"error",
      text:"Something went wrong"
    })
    return false
  }
}


export { LoginUser,DataOnPageLoad, CheckUserPresent };

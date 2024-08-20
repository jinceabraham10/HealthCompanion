import axios from "axios";
import swal from "sweetalert2";

async function LoginUser(loginData) {
  try {
    
    const resp = await axios.post("http://localhost:5000/api/login", loginData)
    const User = resp.data;
    console.log("response is great ",resp)
    if (User.length==0) {
      swal.fire({
        icon: "error",
        text: "Username / Password is Wrong",
      });
    } else {
      return false;
    }
  } catch (error) {
    console.log("response is supper",error);
  }
}

export { LoginUser };

import axios from "axios";
import swal from "sweetalert2";

const message = {
  icon: "success",
  title: "Sign UP",
  text: "OTp has been verified and Account has been Created Successfully",
};
const alert = (message) => {
  swal.fire(message);
};

export async function createUser(userData) {
  try {
    // console.log("recieved from RegisterationPage",userData)
    const response = await axios.post(
      "http://localhost:5000/api/user/verifyOtp",
      userData,
      {
        withCredentials: true,
      }
    );
    console.log(response);
    message.icon = "success";
    message.title = "Sign UP";
    message.text =
      "OTp has been verified and Account has been Created Successfully";
    alert(message);
    return true;
  } catch (error) {
    console.log("Error during OTP submission:", error);

    // Handle 400 error for invalid OTP
    if (
      error.response &&
      error.response.status === 400 &&
      error.response.data.invalidOtp
    ) {
      message.icon = "error";
      message.title = "Invalid OTP";
      message.text = "Please try again";
      alert(message);
      return false; // Return failure status
    }

    // Generic error handling for other errors
    message.icon = "error";
    message.title = "Sign Up Failed";
    message.text = "Error during creation. Please try again.";
    alert(message);

    return false; // Return failure status
  }
}

export async function generateOtp(email) {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/user/generateOtp",
      { email },
      {
        withCredentials: true,
      }
    );
    console.log(response.data);
    return response.data.otpStatus;
  } catch (error) {
    console.log(`error on the front end while clicking Otp ${error}`);
  }
}

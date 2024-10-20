import * as yup from "yup";

export const patientProfileValidationSchema = yup.object().shape({
  firstName: yup.string().required("Required"),
  lastName: yup.string().required("Required"),
  city: yup.string().matches(/^[A-Za-z]+$/, "Last name should not contain numbers or special characters"),
  state:yup.string().matches(/^[A-Za-z]+$/, "Last name should not contain numbers or special characters"),
  street: yup.string(),
  pincode: yup.number("shoul be a number"),
  profileImage: "",
  height: "",
  weight: "",
  gender: "",
  bloodGroup: "",
  phone: yup.number("shoul be a number"),
  email:yup.string().email()
});

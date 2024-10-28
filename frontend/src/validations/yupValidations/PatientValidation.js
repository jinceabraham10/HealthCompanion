import * as yup from "yup";

export const patientProfileValidationSchema = yup.object().shape({
  firstName: yup.string().required("Required").matches(/^[A-Za-z]+$/, "Last name should not contain numbers or special characters"),
  lastName: yup.string().required("Required").matches(/^[A-Za-z]+$/, "Last name should not contain numbers or special characters"),
  city: yup.string("should be a string").matches(/^[A-Za-z]+$/, "City should not contain numbers or special characters"),
  state:yup.string("should be a string").matches(/^[A-Za-z]+$/, "State should not contain numbers or special characters"),
  street: yup.string("should be a string"),
  pincode: yup.number("shoul be a number"),
  profileImage: "",
  height: yup.number("should be a number"),
  weight: yup.number("should be a number"),
  gender: "",
  bloodGroup: yup.string("should be a string"),
  phone: yup.number("shoul be a number"),
  email:yup.string().email()
});

export const reviewValidationSchema=yup.object().shape({
  patientComment:yup.string().required(),
  rating:yup.number().required()
})

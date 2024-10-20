import React, { useState } from "react";
import { Avatar, FileInput, FloatingLabel } from "flowbite-react";
import { useFormik } from "formik";
import { patientProfileValidationSchema } from "../../../validations/yupValidations/PatientValidation";

function PatientProfile() {
  const [iseditable, setIseditable] = useState(false);
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      city: "",
      state: "",
      street: "",
      pincode: "",
      profileImage: "",
      height: "",
      weight: "",
      gender: "",
      bloodGroup: "",
      phone: "",
      email:""
    },
    validationSchema: patientProfileValidationSchema,
    onSubmit: async (values, action) => {
        console.log(formik.values.profileImage)
    },
  });
  console.log(`values ${JSON.stringify(formik.values.profileImage)}`);
  console.log(`error ${JSON.stringify(formik.errors)}`);

  return (
    <div className="w-full p-10 mb-10  h-inherit ">
      <div className={`fixed w-full ml-40  flex flex-row justify-start `}>
        <button
          className={`border p-2 w-24 rounded-lg ${
            iseditable ? "bg-green-400" : "bg-red-600"
          }`}
          onClick={(e) => {
            setIseditable(true);
          }}
        >
          Edit
        </button>
      </div>
      <form
        className="flex flex-col items-center w-full gap-6 "
        onSubmit={formik.handleSubmit}
      >
        <div>
          <h1 className="font-bold text-emerald-500 text-lg">
            Profile Details
          </h1>
        </div>
        <div className="flex flex-row gap-8 items-center ">
          <Avatar rounded size={`lg`} />
          <FileInput
            id="id_fileProfile"
            accept=".png"
            className=""
            required
            onChange={async (e) => {
              await formik.setFieldValue("profileImage", e.target.files[0]);
            }}
          />
        </div>
        <div className="flex flex-row gap-4">
          <FloatingLabel
            variant="outlined"
            value={formik.values.firstName}
            name="firstName"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            color={
              formik.touched.firstName && formik.errors.firstName
                ? "error"
                : "success"
            }
            helperText={
              formik.touched.firstName && formik.errors.firstName
                ? formik.errors.firstName
                : " "
            }
            label="First Name"
          />
          <FloatingLabel
            variant="outlined"
            label="Last Name"
            name="lastName"
            value={formik.values.lastName}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            color={
              formik.touched.lastName && formik.errors.lastName
                ? "error"
                : "success"
            }
            helperText={
              formik.touched.lastName && formik.errors.lastName
                ? formik.errors.lastName
                : " "
            }
          />
        </div>
        <div className="flex justify-between w-72">
          <label htmlFor="gender">gender</label>
          <div className="flex flex-row gap-2 items-center">
            <input type="radio" name="gender" value="male" id="id_male" onChange={(e)=>{
                formik.setFieldValue('gender',e.target.value)
            }} />
            <label htmlFor="male">male</label>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <input type="radio" name="gender" value="female" id="id_male"
            onChange={(e)=>{
                formik.setFieldValue('gender',e.target.value)
            }} />
            <label htmlFor="female">Female</label>
          </div>
          <span>{formik.errors.gender ? "Choose a gender" : ""}</span>
        </div>
        <h2 className="font-bold text-lg ">Address</h2>
        <div className="grid grid-cols-2 gap-4">
          <FloatingLabel
            variant="outlined"
            label="City"
            name="city"
            value={formik.values.city}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            color={
              formik.touched.city && formik.errors.city ? "error" : "success"
            }
            helperText={
              formik.touched.city && formik.errors.city
                ? formik.errors.lastName
                : " "
            }
          />
          <FloatingLabel
            variant="outlined"
            label="State"
            value={formik.values.state}
            name="state"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            color={
              formik.touched.state && formik.errors.state ? "error" : "success"
            }
            helperText={
              formik.touched.state && formik.errors.state
                ? formik.errors.state
                : " "
            }
          />
          <FloatingLabel
            variant="outlined"
            label="Country"
            value={formik.values.country}
            name="country"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            color={
              formik.touched.country && formik.errors.country
                ? "error"
                : "success"
            }
            helperText={
              formik.touched.country && formik.errors.country
                ? formik.errors.country
                : " "
            }
          />
          <FloatingLabel
            variant="outlined"
            label="Pincode"
            value={formik.values.pincode}
            name="pincode"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            color={
              formik.touched.pincode && formik.errors.pincode
                ? "error"
                : "success"
            }
            helperText={
              formik.touched.pincode && formik.errors.pincode
                ? formik.errors.pincode
                : " "
            }
          />
        </div>
        <FloatingLabel
          variant="outlined"
          label="Phone"
          value={formik.values.phone}
          name="phone"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          color={
            formik.touched.phone && formik.errors.phone ? "error" : "success"
          }
          helperText={
            formik.touched.phone && formik.errors.phone
              ? formik.errors.phone
              : " "
          }
        />
        <FloatingLabel
          type="email"
          variant="outlined"
          label="Email"
          value={formik.values.email}
          name="email"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          color={
            formik.touched.email && formik.errors.email ? "error" : "success"
          }
          helperText={
            formik.touched.email && formik.errors.email
              ? formik.errors.email
              : " "
          }
        />
        <FloatingLabel
          variant="outlined"
          label="Height"
          value={formik.values.height}
          name="height"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          color={
            formik.touched.height && formik.errors.height ? "error" : "success"
          }
          helperText={
            formik.touched.height && formik.errors.height
              ? formik.errors.height
              : " "
          }
        />
        <FloatingLabel
          variant="outlined"
          label="Weight"
          value={formik.values.state}
          name="weight"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          color={
            formik.touched.weight && formik.errors.weight ? "error" : "success"
          }
          helperText={
            formik.touched.state && formik.errors.state
              ? formik.errors.weight
              : " "
          }
        />
        <FloatingLabel
          variant="outlined"
          label="Blood Group"
          value={formik.values.state}
          name="bloodGroup"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          color={
            formik.touched.bloodGroup && formik.errors.bloodGroup ? "error" : "success"
          }
          helperText={
            formik.touched.bloodGroup && formik.errors.bloodGroup
              ? formik.errors.bloodGroup
              : " "
          }
        />
        <input
          type="submit"
          className="border text-center font-bold w-24 p-4 bg-green-400 rounded"
          value="save"
        />
      </form>
    </div>
  );
}

export default PatientProfile;

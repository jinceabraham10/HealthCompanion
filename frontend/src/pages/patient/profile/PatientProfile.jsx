import React, { useEffect, useState } from "react";
import { Avatar, FileInput, FloatingLabel } from "flowbite-react";
import { useFormik } from "formik";
import { patientProfileValidationSchema } from "../../../validations/yupValidations/PatientValidation";
import axios from "axios";
import { updatePatientProfile, updatePatientProfileImage } from "../../../services/userService";

function PatientProfile(props) {
  const { patient } = props;
  const [iseditable, setIseditable] = useState(false);
  const [isProfileEditable, setIsProfileEditable] = useState(false);
  const [realProfileImage,setRealProfileImage]=useState(undefined)
  const formik = useFormik({
    initialValues: {
      _id: patient._id,
      firstName: "",
      lastName: "",
      city: "",
      state: "",
      street: "",
      pincode: "",
      country: "",
      profileImage: "",
      height: "",
      weight: "",
      gender: "",
      bloodGroup: "",
      phone: "",
      email: "",
      
    },
    validationSchema: patientProfileValidationSchema,
    onSubmit: async (values, action) => {
      const formData = new FormData();
      Object.keys(values).forEach(async (key) => {
        await formData.append(key, values[key]);
      });
      const patientData = await updatePatientProfile(values);
      if (patientData) {
        await onLoad();
      }
    },
  });
  // console.log(`values ${JSON.stringify(formik.values.gender)}`);
  console.log(`error ${JSON.stringify(formik.errors)}`);

  const onLoad = async () => {
    try {
      const resp = await axios.post(
        "https://healthcompanion.onrender.com:5000/api/user/loadData/profile/patient",
        { userId: patient._id }
      );
      const fetchedPatientData = resp.data.fetchedPatientData;
      if (fetchedPatientData) {
        formik.setFieldValue("firstName", fetchedPatientData.firstName);
        formik.setFieldValue("lastName", fetchedPatientData.lastName);
        formik.setFieldValue("email", patient.email);
        formik.setFieldValue("height", fetchedPatientData.height);
        formik.setFieldValue("weight", fetchedPatientData.weight);
        formik.setFieldValue("bloodGroup", fetchedPatientData.bloodGroup);
        formik.setFieldValue("city", fetchedPatientData.userId.address.city);
        formik.setFieldValue("state", fetchedPatientData.userId.address.state);
        formik.setFieldValue("gender", fetchedPatientData.gender);
        formik.setFieldValue(
          "country",
          fetchedPatientData.userId.address.country
        );
        formik.setFieldValue(
          "pincode",
          fetchedPatientData.userId.address.pincode
        );
        formik.setFieldValue("profileImage", fetchedPatientData.profileImage);
        await setRealProfileImage(fetchedPatientData.realProfileImage)
        formik.setFieldValue("phone", fetchedPatientData.userId.phone[0]);
        // await console.log(`gender ${JSON.stringify(fetchedPatientData)}`);
        document.getElementById(`id_${fetchedPatientData.gender}`).checked =
          "true";
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    onLoad();
  }, []);


  const handleProfileSave=async ()=>{
    if(formik.values.profileImage){
      const fetchedData=await updatePatientProfileImage({
        _id:formik.values._id,
        profileImage:formik.values.profileImage
      })
      if(fetchedData){
        onLoad()
      }
    }

  }

  return (
    <div className="w-full scroll-smooth overflow-y p-10 mb-10 flex flex-row items-center justify-center border rounded-lg border-blue-700  ">
      {/* <div className={`fixed w-full ml-40 top-40 flex flex-row justify-start `}>
        <button
          className={`border  p-2 w-32 rounded-lg ${
            iseditable ? "bg-green-400" : "bg-red-600"
          }`}
          onClick={(e) => {
            setIseditable(!iseditable);
          }}
        >
          {iseditable ? "No Changes" : "Edit"}
        </button>
      </div> */}
      <form
        className="flex flex-col w-1/2 gap-6 "
        onSubmit={formik.handleSubmit}
      >
        <div>
          <h1 className="font-bold text-emerald-500 text-lg">
            Profile Details
          </h1>
        </div>
        <div className="flex flex-row gap-8 items-center ">
          <Avatar
            img={
              realProfileImage &&
              `data:image/jpeg;base64,${realProfileImage}`
            }
            rounded
            size={`lg`}
          />
          <FileInput
            id="id_fileProfile"
            accept=".png"
            className=""
            onChange={async (e) => {
              await formik.setFieldValue("profileImage", e.target.files[0]);
              await setIsProfileEditable(true)
            }}
          />

          <button
            id="id_profileSave"
            className={`border  p-2 w-50 rounded-lg bg-green-400`}
            disabled={!isProfileEditable}
            onClick={async (e) => {
              await setIsProfileEditable(false)
              await handleProfileSave()
              
            }}
          >
            Save Profile Image
          </button>
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
            <input
              type="radio"
              name="gender"
              value="male"
              id="id_male"
              onChange={(e) => {
                formik.setFieldValue("gender", e.target.value);
              }}
            />
            <label htmlFor="male">male</label>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <input
              type="radio"
              name="gender"
              value="female"
              id="id_female"
              onChange={(e) => {
                formik.setFieldValue("gender", e.target.value);
              }}
            />
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
          disabled
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
          value={formik.values.weight}
          name="weight"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          color={
            formik.touched.weight && formik.errors.weight ? "error" : "success"
          }
          helperText={
            formik.touched.weight && formik.errors.weight
              ? formik.errors.weight
              : " "
          }
        />
        <FloatingLabel
          variant="outlined"
          label="Blood Group"
          value={formik.values.bloodGroup}
          name="bloodGroup"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          color={
            formik.touched.bloodGroup && formik.errors.bloodGroup
              ? "error"
              : "success"
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

import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Accordion, FloatingLabel, FileInput, TextInput } from "flowbite-react";
import { Button as CustomButton } from "flowbite-react";
import { useFormik } from "formik";
import { DoctorVerificationFormValidationSchema } from "../../../validations/yupValidations/DoctorVerificationValidation";
import { verificationFormSubmit } from "../../../services/doctorService";

function DoctorVerificationForm1(props) {
  const formik = useFormik({
    initialValues: {
      _id:(props.fetchedData)? props.fetchedData._id:"",
      firstName: "",
      lastName: "",
      bloodGroup: "",
      height: "",
      weight: "",
      gender: "",
      specialization: "",
      license: "",
      profileImage: "",
      schoolTen: "",
      marksTen: "",
      certificateTen: "",
      schoolTwelth: "",
      marksTwelth: "",
      certificateTwelth: "",
      schoolMbbs: "",
      marksMbbs: "",
      certificateMbbs: ""
    },
    validationSchema: DoctorVerificationFormValidationSchema,
    onSubmit: async (values, actions) => {
      const formData =new FormData()
      Object.keys(values).forEach(key => {
        formData.append(key,values[key])
      });
      formData.append("_id",props.fetchedData._id)
      await verificationFormSubmit(formik.values)
      actions.resetForm()
      

    },
  });

  const handleFileChange = (e, filename) => {
    try {
      const file = e.target.files[0];
      formik.setFieldValue(filename, file);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(formik.errors)

  const [isSpinner, setisSpinner] = useState(false);

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col min-h-screen  justify-center space-y-10 m-10 "
    >
      <div className="flex flex-row space-x-10">
        <TextField
          id="id_firstName"
          variant="outlined"
          label="First Name"
          name="firstName"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          required
        />
        <TextField
          id="id_lastName"
          name="lastName"
          variant="outlined"
          value={formik.lastName}
          onChange={formik.handleChange}
          label="Last Name"
          required
        />
      </div>
      <div className="flex flex-col gap-10 w-1/2 ">
        <TextField
          id="id_height"
          variant="filled"
          label="height"
          name="height"
          value={formik.values.height}
          error={formik.errors.height && formik.touched.height ? true: false}
          helperText={formik.errors.height && formik.touched.height ? formik.errors.height:"in Feet"}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <TextField
          id="id_weight"
          variant="filled"
          label="Weight"
          name="weight"
          value={formik.values.weight}
          error={formik.errors.weight && formik.touched.weight ? true: false}
          helperText={formik.errors.weight && formik.touched.weight ? formik.errors.weight:"in Kg"}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        <TextField
          id="id_bloodGroup"
          variant="filled"
          label="Blood Group"
          name="bloodGroup"
          value={formik.values.bloodGroup}
          error={formik.errors.bloodGroup && formik.touched.bloodGroup ? true: false}
          helperText={formik.errors.bloodGroup && formik.touched.bloodGroup ? formik.errors.bloodGroup:""}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        <TextField
          id="id_specialization"
          variant="outlined"
          label="specialization"
          name="specialization"
          value={formik.values.specialization}
          onChange={formik.handleChange}
          error={formik.errors.specialization && formik.touched.specialization ? true: false}
          helperText={formik.errors.specialization && formik.touched.specialization ? formik.errors.specialization:""}
          required
        />
      </div>
      <div className="flex w-full flex-row items-center gap-10">
        <label htmlFor="license " className="text-red-700">
          License
        </label>
        <FileInput
          name="license"
          onChange={(e) => handleFileChange(e, "license")}
          required
        />
      </div>

      <div className="flex w-full flex-row items-center gap-10 ">
        <label htmlFor="license " className="text-red-700">
          Profile image
        </label>
        <FileInput
          name="profileImage"
          onChange={(e) => handleFileChange(e, "profileImage")}
          accept=".jpg, .png"
          required
        />
      </div>

      <h1 className="text-2xl text-zinc-500">Educational Details</h1>
      <EducationDetails level={"Ten"} formik={formik} />
      <EducationDetails level={"Twelth"} formik={formik} />
      <EducationDetails level={"Mbbs"} formik={formik} />
      <CustomButton
        type="submit"
        gradientDuoTone="greenToBlue"
        isProcessing={isSpinner}
        disabled={formik.is}
        className="w-1/4 relative left-1/2 -translate-x-1/2 active:bg-violet-700"
      >
        Submit
      </CustomButton>
    </form>
  );
}

function EducationDetails(props) {
  return (
    <Accordion>
      <Accordion.Panel>
        <Accordion.Title>{props.level} Results</Accordion.Title>
        <Accordion.Content>
          <div className="flex flex-col space-y-10 w-1/2">
            <FloatingLabel
              variant="outlined"
              id={`id_school${props.level}`}
              name={`school${props.level}`}
              label="School"
              required
              value={props.formik.values[`school${props.level}`]}
              onChange={props.formik.handleChange}
              
            />
            <FloatingLabel
              variant="outlined"
              id={`id_marks${props.level}`}
              name={`marks${props.level}`}
              label="Marks"
              value={props.formik.values[`marks${props.level}`]}
              onChange={props.formik.handleChange}
              color={props.formik.errors[`marks${props.level}`] && props.formik.touched[`marks${props.level}`] ? "error":"success"}
              helperText={props.formik.errors[`marks${props.level}`] && props.formik.touched[`marks${props.level}`] ? props.formik.errors[`marks${props.level}`] :""  }
              onBlur={props.formik.handleBlur}
              required
            />
            <div className="flex flex-row gap-10">
              <label htmlFor="certificate" className="text-red-700">
                Certificate
              </label>
              <FileInput
                id={`certificate${props.level}`}
                name={`certificate${props.level}`}
                accept=".pdf"
                onChange={(e) =>
                  props.formik.setFieldValue(
                    `certificate${props.level}`,
                    e.target.files[0]
                  )
                }
                required
              />
            </div>
          </div>
        </Accordion.Content>
      </Accordion.Panel>
    </Accordion>
  );
}

export default DoctorVerificationForm1;

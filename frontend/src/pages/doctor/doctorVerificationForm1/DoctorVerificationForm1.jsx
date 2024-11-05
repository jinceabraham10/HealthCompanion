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
      _id: props.fetchedData ? props.fetchedData._id : "",
      firstName: JSON.stringify(props.fetchedDoctorDetails.firstName).replace(/"/g, ''),
      lastName: JSON.stringify(props.fetchedDoctorDetails.lastName).replace(/"/g, ''),
      bloodGroup: JSON.stringify(props.fetchedDoctorDetails.bloodGroup).replace(/"/g, ''),
      height: JSON.stringify(props.fetchedDoctorDetails.height).replace(/"/g, ''),
      weight: JSON.stringify(props.fetchedDoctorDetails.weight).replace(/"/g, ''),
      gender: JSON.stringify(props.fetchedDoctorDetails.gender).replace(/"/g, ''),
      specialization: JSON.stringify(props.fetchedDoctorDetails.specialization).replace(/"/g, ''),
      license: "",
      profileImage: "",
      schoolTen: JSON.stringify(props.fetchedDoctorDetails.educationalDetails.ten.school).replace(/"/g, ''),
      marksTen: JSON.stringify(props.fetchedDoctorDetails.educationalDetails.ten.marks).replace(/"/g, ''),
      certificateTen: "",
      schoolTwelth: JSON.stringify(props.fetchedDoctorDetails.educationalDetails.twelth.school).replace(/"/g, ''),
      marksTwelth: JSON.stringify(props.fetchedDoctorDetails.educationalDetails.twelth.marks).replace(/"/g, ''),
      certificateTwelth: "",
      schoolMbbs: JSON.stringify(props.fetchedDoctorDetails.educationalDetails.mbbs.school).replace(/"/g, ''),
      marksMbbs: JSON.stringify(props.fetchedDoctorDetails.educationalDetails.mbbs.marks).replace(/"/g, ''),
      certificateMbbs: "",
    },
    validationSchema: DoctorVerificationFormValidationSchema,
    onSubmit: async (values, actions) => {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });
      formData.append("_id", props.fetchedData._id);
      await verificationFormSubmit(formik.values);
      actions.resetForm();
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

  const [isSpinner, setisSpinner] = useState(false);

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col h-full justify-center space-y-10 m-10 "
    >
      <div className="flex flex-row space-x-10">
        <TextField
          id="id_firstName"
          variant="outlined"
          label="First Name"
          name="firstName"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName ? "Please enter your first name" : ""}
          disabled={props.fetchedDoctorDetails.verificationStatus === "1"}
          required
        />
        <TextField
          id="id_lastName"
          name="lastName"
          variant="outlined"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName ? "Please enter your last name" : ""}
          disabled={props.fetchedDoctorDetails.verificationStatus === "1"}
          required
        />
      </div>
      <div className="flex flex-col gap-10 w-1/2 ">
        <TextField
          id="id_height"
          variant="filled"
          label="Height"
          name="height"
          value={formik.values.height}
          error={formik.touched.height && Boolean(formik.errors.height)}
          helperText={formik.touched.height && formik.errors.height ? "Please enter height (in Feet)" : "in Feet"}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={props.fetchedDoctorDetails.verificationStatus === "1"}
        />
        <TextField
          id="id_weight"
          variant="filled"
          label="Weight"
          name="weight"
          value={formik.values.weight}
          error={formik.touched.weight && Boolean(formik.errors.weight)}
          helperText={formik.touched.weight && formik.errors.weight ? "Please enter weight (in Kg)" : "in Kg"}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={props.fetchedDoctorDetails.verificationStatus === "1"}
        />
        <TextField
          id="id_bloodGroup"
          variant="filled"
          label="Blood Group"
          name="bloodGroup"
          value={formik.values.bloodGroup}
          error={formik.touched.bloodGroup && Boolean(formik.errors.bloodGroup)}
          helperText={formik.touched.bloodGroup && formik.errors.bloodGroup ? "Please enter your blood group" : ""}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={props.fetchedDoctorDetails.verificationStatus === "1"}
        />
        <TextField
          id="id_specialization"
          variant="outlined"
          label="Specialization"
          name="specialization"
          value={formik.values.specialization}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.specialization && Boolean(formik.errors.specialization)}
          helperText={formik.touched.specialization && formik.errors.specialization ? "Please enter your specialization" : ""}
          disabled={props.fetchedDoctorDetails.verificationStatus === "1"}
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
          disabled={props.fetchedDoctorDetails.verificationStatus === "1"}
          required
        />
      </div>

      <div className="flex w-full flex-row items-center gap-10 ">
        <label htmlFor="profileImage" className="text-red-700">
          Profile image
        </label>
        <FileInput
          name="profileImage"
          onChange={(e) => handleFileChange(e, "profileImage")}
          accept=".jpg, .png"
          disabled={props.fetchedDoctorDetails.verificationStatus === "1"}
          required
        />
      </div>

      <h1 className="text-2xl text-zinc-500">Educational Details</h1>
      <EducationDetails level={"Ten"} formik={formik} handleFileChange={handleFileChange} />
      <EducationDetails level={"Twelth"} formik={formik} handleFileChange={handleFileChange}/>
      <EducationDetails level={"Mbbs"} formik={formik} handleFileChange={handleFileChange}/>

      <CustomButton
        type="submit"
        gradientDuoTone="greenToBlue"
        isProcessing={isSpinner}
        disabled={formik.isSubmitting || props.fetchedDoctorDetails.verificationStatus === "1"}
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
              onBlur={props.formik.handleBlur}
            />
            <FloatingLabel
              variant="outlined"
              id={`id_marks${props.level}`}
              name={`marks${props.level}`}
              label="Marks"
              value={props.formik.values[`marks${props.level}`]}
              onChange={props.formik.handleChange}
              onBlur={props.formik.handleBlur}
              color={props.formik.errors[`marks${props.level}`] && props.formik.touched[`marks${props.level}`] ? "error" : "success"}
              helperText={props.formik.errors[`marks${props.level}`] && props.formik.touched[`marks${props.level}`] ? "Please enter your marks" : ""}
            />
            <div className="flex flex-row gap-10">
              <label htmlFor="certificate" className="text-red-700">
                Certificate
              </label>
              <FileInput
                name={`certificate${props.level}`}
                onChange={(e) => props.handleFileChange(e, `certificate${props.level}`)}
                disabled={props.formik.values.verificationStatus === "1"}
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

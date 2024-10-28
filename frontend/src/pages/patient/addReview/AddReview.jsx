import React, { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import { useFormik } from "formik";
import { reviewValidationSchema } from "../../../validations/yupValidations/PatientValidation";
import { addReview, editReview, getReview } from "../../../services/userService";

function AddReview(props) {
  const [starValue, setStarValue] = useState(2);
  const [isReviewPresent,setIsReviewPresent]=useState(undefined)

const formik=useFormik({
  initialValues:{
    slotId:props.selectedSlot._id,
    patientComment:"",
    rating:2
  },
  validationSchema:reviewValidationSchema,
  onSubmit:async (values,actions)=>{
    console.log("guessss")
    await addReview(values)
    actions.resetForm()
    props.setAddReview(false)
  }
})


// console.log(formik.values)
// console.log(formik.errors)

const onLoad=async ()=>{
  try {
    const review=await getReview({slotId:props.selectedSlot._id})
    if(review){
      formik.setFieldValue('patientComment',review.patientComment)
      formik.setFieldValue('rating',review.rating)
      setIsReviewPresent(review)
    }
    
  } catch (error) {
    console.log(error)
  }
}

useEffect(()=>{
  onLoad()
},[])

  useEffect(() => {
    console.log(starValue);
  }, [starValue]);

const handleEdit=async ()=>{
  console.log("kkkkk")
  await editReview(formik.values)
  props.setAddReview(false)

}

  return (
    <form onSubmit={formik.handleSubmit} className="w-full h-[70vh] flex flex-col gap-8">
      <div className="h-[50%] flex flex-col gap-4">
        <span className="font-bold">Add Comment</span>
        <div className="w-full  h-full">
          <textarea
            name="patientComment"
            id="id_patientComment"
            className="rounded w-full h-full"
            value={formik.values.patientComment}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          ></textarea>
        </div>
        <span className="font-bold text-md text-red-500">{(formik.touched.patientComment) && (formik.errors.patientComment) ? formik.errors.patientComment:""}</span>
      </div>
      <div className="h-[20%] w-full flex flex-row gap-4 font-bold">
        <span>Give a Rating</span>
        <div>
          <Rating
            name="simple-controlled"
            value={formik.values.rating}
            onChange={(event, newValue) => {
              setStarValue(newValue);
              formik.setFieldValue("rating",newValue)
            }}
          />
        </div>
        <span className="font-bold text-md text-red-500">{(formik.touched.rating) && (formik.errors.rating) && formik.errors.rating}</span>
      </div>
      {
        (isReviewPresent)?
        <button type="button" className="p-4 w-full bg-red-500 font-bold" onClick={handleEdit}>
        Edit
      </button>:
      <input type="submit"  value="save" className="p-4 w-full bg-red-500 font-bold"/>
      }
    </form>
  );
}



export default AddReview;

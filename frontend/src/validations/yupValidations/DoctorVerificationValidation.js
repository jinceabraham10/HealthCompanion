import * as yup from 'yup'

export const DoctorVerificationFormValidationSchema=yup.object().shape(
    {
        firstName:yup.string().required("Enter firstName"),
        lastName:yup.string().required("Enter lastname"),
        gender:yup.string().required("Enter gender"),
        height:yup.number().positive("Height must be greater than 0").typeError("Enter right Number"),
        weight:yup.number().positive().integer().typeError("Enter right Number"),
        bloodGroup:yup.string().oneOf(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],"Enter Valid Blood group"),
        specialization:yup.mixed().required("Required"),
        profileImage:yup.mixed().required("Please upload your Image"),
        gender:yup.string().oneOf(['male','female'],"Enter a valid entry"),
        schoolTen:yup.string().min(4).required("Enter valid School"),
        marksTen:yup.number().positive("Must be a Positive Number").required("Enter marks").typeError("Enter right Number"),
        certificateTen: yup.mixed().required("upload Certificate"),
        schoolTwelth:yup.string().min(4).required("Enter valid School"),
        marksTwelth:yup.number().positive("Must be a Positive Number").required("Enter marks").typeError("Enter right Number"),
        certificateTwelth: yup.mixed().required("upload Certificate"),
        schoolMbbs:yup.string().min(4).required("Enter valid School"),
        marksMbbs:yup.number().positive("Must be a Positive Number").required("Enter marks").typeError("Enter right Number"),
        certificateMbbs: yup.mixed().required("upload Certificate")


    }
)

export const SlotSettingVerification=yup.object().shape({
    date:yup.string().required("Date must be chosen"),
    startTime:yup.string().required("Time must be chosen").notOneOf([yup.ref('endTime')],"Choose Timing validly"),
    endTime:yup.string().required("End Time must be chosen").notOneOf([yup.ref('startTime')],"Choose Timing validly").test("end time should be less than start time",function(value){

        const {startTime}=this.parent
        if(startTime && value){
            return value>startTime
        }
        return true
    })

})
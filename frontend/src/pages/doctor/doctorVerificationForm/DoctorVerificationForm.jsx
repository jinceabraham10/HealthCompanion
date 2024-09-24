import React, { useEffect, useRef,useState } from 'react'
import styles from "./DoctorVerificationForm.module.css"
function DoctorVerificationForm() {

  const formRef=useRef(null)
 
  const verificationData={
    firstName:"",
    lastName:"",
    bloodGroup:"",
    height:"",
    weight:"",
    gender:"",
    specialization:"",
    license:"",
    school10:"",
    yearCompletion10:"",
    marks10:"",
    certificate10:"",
    school12:"",
    yearCompletion12:"",
    marks12:"",
    certificate12:"",
    schoolmbbs:"",
    yearCompletionmbbs:"",
    marksmbbs:"",
    certificatembbs:""
  }

  

  const [formData,setFormData]=useState(verificationData)
  const [isFormValid,setIsFormValid]=useState(false)
  const [formError,setFormError]=useState({})


  const onChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const handleOnSubmit=(e)=>{
    try {

      e.preventDefault()
      validate()
      console.log(formError)
      console.log(isFormValid)
      if(isFormValid){
        console.log("submitted")
      }
      
    } catch (error) {
      
    }
  }

  const validate=async ()=>{
    const error={}
    for(const key in formData){
      if(!formData[key]){
        error[key]="* empty field"
      }
    }
    await setFormError(error)
    if(Object.keys(error)==0){
      await setIsFormValid(true)
    }
    else{
      await setIsFormValid(false)

    }
  }


  useEffect(()=>{
    console.log(formData)

  },[formData])

  


  return (
    
    <div className={styles.verificationFormParent}>
      <h1 className={styles.heading}>Verification Details</h1>
    <form ref={formRef}>
        <input type="text" onChange={onChange} placeholder="First Name" name="firstName" id="firstName" />
        <span className={styles.error}>{formError.firstName}</span>
        <input type="text" onChange={onChange} placeholder="Last Name" name="lastName" id="lastName" />
        <span className={styles.error}>{formError.lastName}</span>
        <input type="text" onChange={onChange} placeholder="Blood Group" name="bloodGroup" id="bloodGroup" />
        <span className={styles.error}>{formError.bloodGroup}</span>
        <input type="text" onChange={onChange} placeholder="Height" name="height" id="height" />
        <span className={styles.error}>{formError.height}</span>
        <input type="text" onChange={onChange} placeholder="Weight" name="weight" id="weight" />
        <span className={styles.error}>{formError.weight}</span>
        <div className={styles.genderBlock}>
        <div className={styles.genderBlockOptions}>
            <input type="radio" onChange={onChange} name="gender" id="male" value="male" />
            <label htmlFor="male">Male</label>
        </div>
        <div className={styles.genderBlockOptions}>
            <input type="radio" onChange={onChange} name="gender" id="female" value="female" />
            <label htmlFor="female">Female</label>
        </div>
        <span className={styles.error}>{(formError[`gender`]) && "Please Select the gender"}</span>
        </div>
        <input type="text" onChange={onChange} placeholder="Specialization" name="specialization" id="specialization" />
        <span className={styles.error}>{formError.specialization}</span>
        <div className={styles.fileUpload}>
            <label htmlFor="license">License</label>
            <input type="file" onChange={onChange} accept="application/pdf" placeholder="License" name="license" id="license" /> 
            <span className={styles.error}>{(formError.license) && "* Please upload file"}</span>
        </div>
        
        <h2>10 th Details</h2>
        <EducationDetails level={10} onChange={onChange} formError={formError}/>
        <h2>12 th Details</h2>
        <EducationDetails level={12} onChange={onChange} formError={formError}/>
        <h2>MBBS Details</h2>
        <EducationDetails level={"mbbs"} onChange={onChange} formError={formError}/>

        <input type="submit" onClick={handleOnSubmit} value="Submit for verification" name="submit" id="submit"/>
        
    </form>
    </div>
  )
}

function EducationDetails({level,onChange,formError}){

  return(
    <div className={styles.educationalDetailsParent}>
        <input type="text" onChange={onChange} placeholder="school" name={`school${level}`} id={`school${level}`} required/>
        <span className={styles.error}>{formError[`school${level}`]}</span>
        <input type="text" onChange={onChange} placeholder="year of completion" name={`yearCompletion${level}`} id={`yearCompletion${level}`} required />
        <span className={styles.error}>{formError[`yearCompletion${level}`]}</span>
        <input type="text" onChange={onChange} placeholder="marks" name={`marks${level}`} id={`marks${level}`} required={true}/>
        <span className={styles.error}>{formError[`marks${level}`]}</span>
        <div className={styles.fileUpload}>
            <label htmlFor="license">Certificate</label>
            <input type="file" onChange={onChange} accept="application/pdf" name={`certificate${level}`} id={`certificate${level}`} required/>
            <span className={styles.error}>{(formError[`certificate${level}`]) && "* Please upload certificate"}</span> 
        </div>
    </div>
  )

}

export default DoctorVerificationForm

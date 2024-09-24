const emailCheck=(email)=>{
    const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailPattern.test(email)

}
export default emailCheck
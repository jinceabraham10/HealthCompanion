const bcryptjs=require('bcryptjs')

const handlehashedPassword= ()=>{
    try {

        return {
            setPassword:async (password)=>{
                return await bcryptjs.hash(password,10)
                
            },
            comparePassword:async (password,hashedPassword)=>{
               return await bcryptjs.compare(password,hashedPassword)?true:false
            }
        }
        
    } catch (error) {
        console.log(error)
    }
}

module.exports={handlehashedPassword}
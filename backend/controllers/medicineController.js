const Medicines=require('../models/medicineModel')

exports.getAllMedicines=async (req,res)=>{

    try {
        const allMedicines=await Medicines.find({})
        if(allMedicines.length==0)
            return res.status(404).json({message:`No Medicines Available `})
        res.status(200).json({message:`Medicines fetched Successfully`,allMedicines:allMedicines})
        
    } catch (error) {
        res.status(200).json({message:`error ${error}`})
        
    }

}
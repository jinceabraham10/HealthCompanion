const Tests=require('../models/testModel')

exports.getAllTests=async (req,res)=>{

    try {
        const getAllTests=await Tests.find({})
        if(allTests.length==0)
            return res.status(404).json({message:`No Medicines Available `})
        res.status(200).json({message:`Medicines fetched Successfully`,allTests:allTests})
        
    } catch (error) {
        res.status(200).json({message:`error ${error}`})
        
    }

}
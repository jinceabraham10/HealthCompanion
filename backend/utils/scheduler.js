const dayjs =require('dayjs')
const Slot=require('../models/slotModel.js')
const customParseFormat =require("dayjs/plugin/customParseFormat")
dayjs.extend(customParseFormat)
exports.notifyClient=async (clients)=>{
    const todayDate=dayjs()
    try {
        
        const fetchedSlots=await Slot.find({date:todayDate.format("YYYY-MM-DD"),startTime:{
            $gt:todayDate.format("HH:mm")
        }})
        console.log(fetchedSlots)
        // console.log(todayDate.add(0.5,'hour').format('H:mm'))
        fetchedSlots.forEach(slot => {
            const checkTime=todayDate.add(1,'hour').format("HH:mm")
            if(slot.startTime>=checkTime){
                const client=clients.filter(client=>(client.id==slot.doctorId) || (client.id==slot.patientId))
                console.log(client)
                if(client.length>0){
                    client[0].socket.send(JSON.stringify({slots:slot}))

                }
                
            }
      
        });

        
    } catch (error) {
        console.log(error)
    }

}
const nodemailer = require("nodemailer");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const from = process.env.MAIL_FROM;
const pass = process.env.MAIL_PASS;
const cron = require("node-cron");
const dayjs = require("dayjs");
const customParseFormat = require("dayjs/plugin/customParseFormat");
const Slot = require("../models/slotModel");
const { populate } = require("../models/userModel");
const { formattedDate } = require("./dateUtil");
dayjs.extend(customParseFormat);
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: from,
    pass: pass,
  },
});

exports.startEmailOn30Min=()=>{
    try {
        cron.schedule("*/10 * * * *", async () => {
            try {
              const todayDate = dayjs();
              const checktime = todayDate.add(3, "hour").format("HH:mm");
                const fetchedSlots = await Slot.find({
                    date: todayDate.format("YYYY-MM-DD"),startTime: {
                        $gt: todayDate.format("HH:mm")
                    },
                    confirmStatus:true
                    ,
                }).populate({
                    path: "doctorId",  
                    populate: {
                        path: "userId",  
                    },
                })
                .populate({
                    path: "patientId",  
                    populate: {
                        path: "userId",  
                    },
                });

              
              console.log(JSON.stringify(fetchedSlots));
              
              fetchedSlots.forEach(slot => {
                const startTime=dayjs(slot.startTime,"HH:mm").format("HH:mm")
                // console.log((todayDate.format("H?H:mm")<slot.startTime))
                // console.log((startTime<=checktime))
                  if((startTime<=checktime) && (todayDate.format("HH:mm")<startTime)){
                      sentNotification(slot.patientId.userId.email,slot)
                      sentNotification(slot.doctorId.userId.email,slot)

                  }
                  
              });
            } catch (error) {
              console.log(error);
            }
          });
          
    } catch (error) {
        console.log(error)
    }
}


const sentNotification=async (email,slot)=>{

    try {

        const sent=await transporter.sendMail({
            to:email,
            from:from,
            subject:"Meeting Will start in 30 min",
            text:`Hi,\n Consultation planned at ${dayjs(slot.startTime,"H:mm").format("h:mm A")} will be in 30 min`
        })
        await console.log(sent)
        
    } catch (error) {
        console.log(error)
    }

}
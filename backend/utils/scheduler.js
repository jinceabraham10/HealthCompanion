const dayjs = require("dayjs");
const Slot = require("../models/slotModel.js");
const customParseFormat = require("dayjs/plugin/customParseFormat");
const { populate } = require("../models/userModel.js");
dayjs.extend(customParseFormat);
exports.notifyClient = async (clients) => {
  const todayDate = dayjs();
  try {
    const fetchedSlots = await Slot.find({
      date: todayDate.format("YYYY-MM-DD"),
      startTime: {
        $gt: todayDate.format("HH:mm"),
      },
    }).populate({path:"doctorId",populate:{
        path:"userId"
    }}).populate({path:"patientId",populate:{
        path:"userId"
    }});
    console.log(fetchedSlots);
    // console.log(todayDate.add(0.5,'hour').format('H:mm'))
    fetchedSlots.forEach((slot) => {
      const startTime=dayjs(slot.startTime,"HH:mm").format("HH:mm")
      const checkTime = todayDate.add(4, "hour").format("HH:mm");
      
      if (startTime <= checkTime && startTime>todayDate.format("HH:mm")) {
        const client = clients.filter(
          (client) => client.id == slot.doctorId._id || client.id == slot.patientId._id
        );
        console.log(client);
        if (client.length > 0) {
          client[0].socket.send(JSON.stringify({ slots: slot }));
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
};

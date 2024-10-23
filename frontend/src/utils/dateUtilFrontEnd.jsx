import dayjs from 'dayjs';
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);


export const nextWeekDays = () => {
    
    const today = dayjs();
    const nextWeekDays=[]
    for(let i=0;i<=7;i++){
        let nextDay=today.add(i,'day')
        nextWeekDays.push(nextDay)
    }
    console.log(nextWeekDays)
    const tempDate=dayjs('9:00 PM','H:mm A')
    console.log(`tempDate ${tempDate.format('H:mm')}`);
    return nextWeekDays
};

export const returnDayName=(date)=>{

    const tempDate=dayjs(date)
    return tempDate.format('ddd')

}

export function convertTo12HourFormat(dateIn24){
    const [hour,minute]=dateIn24.split(':')
    let rhour;
    if(hour>12){
      rhour=hour-12
      return `${rhour}:${minute} PM `
    }
    else if(hour==12){
      return `${hour}:${minute} PM`
    }
    return `${hour}:${minute} AM`
  
  }



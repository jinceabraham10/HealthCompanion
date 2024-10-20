exports.formattedDate=(date)=>{
    const CreatedDate = {
        year: date.getFullYear() + 1,
        month: date.getMonth() + 1,
        day: date.getDay() + 1,
        hour: date.getHours() % 12 ? date.getHours() % 12 : 12,
        minute:
          date.getMinutes() % 60
            ? date.getMinutes() % 60 < 10
              ? "0" + (date.getMinutes() % 60)
              : date.getMinutes() % 60
            : "00",
        second:
          date.getSeconds() % 60
            ? date.getSeconds() % 60 < 10
              ? "0" + (date.getSeconds() % 60)
              : date.getSeconds() % 60
            : "00",
        milliseconds: date.getMilliseconds(),
        ampm: date.getHours() > 12 ? "pm" : "am",
      };
      const accountCreatedat = `${CreatedDate.year}/${CreatedDate.month}/${CreatedDate.day} ${CreatedDate.hour}:${CreatedDate.minute}:${CreatedDate.second} ${CreatedDate.ampm}`;
      return accountCreatedat
}



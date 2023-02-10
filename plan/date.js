const germanDateOutput = date => {
    const thisDate = new Date(date);
    const day = thisDate.getDate();
    const month = (thisDate.getMonth() + 1);
    const year = thisDate.getFullYear();

    return `${day}.${month}.${year}`;
}

const addDays = (date, days) => {
    let getNewDate = new Date(date);
    const newDate = getNewDate.setDate(getNewDate.getDate() + days);
    germanDateOutput(newDate)
}

function DatesOfOneWeek ()  {
}
export const getNextSevenDates = (tennisFacility) => {
    const currentDate = new Date();
    let allDates = new DatesOfOneWeek(germanDateOutput(currentDate))
    for (let days = 0; days <= 6; days++) {
        addDays(currentDate, days);
        allDates[`date-${days + 1}`] = fullDate;
    }
    tennisFacility.oneWeek = allDates;
}
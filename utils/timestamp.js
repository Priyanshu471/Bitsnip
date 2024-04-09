const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export function getTimeStamp(epoch) {
  const timestamps = epoch.map((item) => {
    const date = new Date(item);
    const monthNumber = date.getMonth();
    const monthName = monthNames[monthNumber];
    const day = `${monthName} ${date.getDate()}, ${date.getFullYear()}`;
    const time = date.toLocaleTimeString();
    return { day, time };
  });
  return timestamps;
}

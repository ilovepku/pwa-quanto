// custom fuction to convert duration time (in minutes) to HHMM format
export const duration2HHMM = date => {
  return Math.floor(date / 60) + ":" + ("0" + (date % 60)).slice(-2);
};

import I18n from "i18n-js";

export const formatNumber = (num) => {
  const anum = Math.abs(num);
  if (anum > 999 && anum < 1000000) {
    return `${(num / 1000).toFixed(1)}K`; // convert to K for number from > 1000 < 1 million
  }
  if (anum > 1000000) {
    return `${(num / 1000000).toFixed(1)}M`; // convert to M for number from > 1 million
  }
  return num; // if value < 1000, nothing to do
};

const daysOfWeek = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
export const formatDate = (date) => {
  const dif = new Date() - date;
  const minutes = 60000;
  const hours = minutes * 60;
  const days = 24*hours;
  if (dif < 1*minutes ) {
    return I18n.t('Time/just now'); // If time since the date is less than a minute (60000 ms)
  }
  if (dif < 60*minutes) {
    return `${(dif/minutes).toFixed(0)}m`; // convert to m if between 1 minute and an hour
  }
  if (dif < 24*hours) {
    return `${(dif/hours).toFixed(0)}h`; // convert to h if between 1 hour and a day
  }
  if (dif < 7*days) {
    return `${daysOfWeek[date.getDay()]}`; // convert to days if between 1 day and a week
  }
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`; // return date if more than a week
};

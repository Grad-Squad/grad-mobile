import I18n from "i18n-js";

const oneDecimalPlaceRegex = /^-?\d+(?:\.\d{0,1})?/;

const oneDecimalPlace = (num) => num.toString().match(oneDecimalPlaceRegex)[0];

export const formatNumber = (num) => {
  const numAbs = Math.abs(num);
  if (numAbs > 999 && numAbs < 1000000) {
    return `${parseFloat(oneDecimalPlace(num / 1000))}K`; // convert to K for number from > 1000 < 1 million
  }
  if (numAbs >= 1000000) {
    return `${parseFloat(oneDecimalPlace(num / 1000000))}M`; // convert to M for number from > 1 million
  }
  return num; // if value < 1000, nothing to do
};

const daysOfWeek = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
export const formatDate = (givenDate) => {
  const date = new Date(givenDate)
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

export const formatString = (str2Format, ...args) => str2Format.replace(/({\d+})/g, a => args[+(a.substr(1, a.length - 2)) || 0]);

export const deepCopy = (objectToCopy) =>
  JSON.parse(JSON.stringify(objectToCopy));

/**
 * Deeply compares two objects. !!Only Works with JSON-style objects!!.
 * @param {object} obj1
 * @param {object} obj2
 * @returns {boolean} true if the objects are deeply equal, false otherwise.
 */
export const deepCompare = (obj1, obj2) =>
  JSON.stringify(obj1) === JSON.stringify(obj2);
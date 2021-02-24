// see https://www.robinwieruch.de/react-folder-structure
// import { formatMonth } from '../../services/format/date';
// const month = formatMonth(new Date());
////////// or //////////
// import * as dateService from '@format/date';
// const month = dateService.formatMonth(new Date());

export const formatDateTime = (date) =>
  new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  }).format(date);

export const formatMonth = (date) =>
  new Intl.DateTimeFormat("en-US", {
    month: "long",
  }).format(date);

export const convertUTCDateToLocalDate = (date) => {
  var newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

  var offset = date.getTimezoneOffset() / 60;
  var hours = date.getHours();

  newDate.setHours(hours - offset);

  return newDate.toLocaleString();
};

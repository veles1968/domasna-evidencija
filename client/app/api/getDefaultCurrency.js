import client from "./client";
// import http from "../http-common";

const endpoint = "/getdefaultcurrency";

const getDefaultCurrency = () => client.get(endpoint);

export default {
  getDefaultCurrency,
};

import axios from "axios";

export default axios.create({
  // baseURL: "http://localhost:8080/api",
//  baseURL: "http://192.168.178.30:9000/api",
  baseURL: "http://192.168.178.29:9000/api",
  headers: {
    "Content-type": "application/json",
  },
});

// baseURL: "http://192.168.178.30:9000/api",

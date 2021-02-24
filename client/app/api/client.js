import { create } from "apisauce";
// import cache from "../utility/cache";
import settings from "../config/settings";

const apiClient = create({
  //To Do DomaEvid
  baseURL: settings.apiUrl,
});

export default apiClient;

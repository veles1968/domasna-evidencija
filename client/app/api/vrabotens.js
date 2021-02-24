import client from "./client";
// import http from "../http-common";

const endpoint = "/vrabotens";
const vrabotenbyime = "/vrabotens";

const getVrabotens = () => client.get(endpoint);

const getVrabotenByIme = (imeVraboten) =>
  client.get(vrabotenbyime + "?ime_vraboten" + imeVraboten);
// client.get(vrabotenbyime + "?ime_vid=benzin");

export const addVraboten = (vraboten, onUploadProgress) => {
  console.log("START addVraboten");

  console.log("vraboten.ime_vraboten = " + vraboten.ime_vraboten);
  console.log("vraboten.vraboten_id = " + vraboten.vraboten_id.value);

  var data = {
    ime_vraboten: vraboten.ime_vraboten,
    vraboten_id: vraboten.vraboten_id.value,
  };

  console.log("data = " + JSON.stringify(data));

  console.log("END-2 addVraboten");
  // localhost:9000/api/vrabotens
  // return http.post("/vrabotens", data);

  return client.post(endpoint, JSON.stringify(data), {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

export default {
  addVraboten,
  getVrabotens,
  getVrabotenByIme,
};

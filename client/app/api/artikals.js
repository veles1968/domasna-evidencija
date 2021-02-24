import client from "./client";
// import http from "../http-common";

const endpoint = "/artikalsvids";
const saveendpoint = "/artikals";

const getArtikals = () => client.get(endpoint);

const getArtikalsByIme = (imeArtikal) =>
  client.get(endpoint + "?ime_artikal=" + imeArtikal);
// client.get(artikalbyime + "?ime_artikal=benzin");

export const addArtikal = (artikal, onUploadProgress) => {
  console.log("START addArtikal");

  console.log("artikal.ime_artikal = " + artikal.ime_artikal);
  console.log("artikal.vid_id = " + artikal.vid.value);
  console.log("artikal.cena = " + artikal.cena);
  console.log("artikal.steuerrelevant = " + artikal.steuerrelevant);

  // const data = new FormData();
  // data.append("vid_id", artikal.vid_id);
  // data.append("ime_artikal", artikal.ime_artikal);
  // data.append("cena", artikal.cena);
  // data.append("steuerrelevant", artikal.steuerrelevant);
  var data = {
    ime_artikal: artikal.ime_artikal,
    vid_id: artikal.vid.value,
    cena: artikal.cena,
    steuerrelevant: artikal.steuerrelevant,
  };

  console.log("data = " + JSON.stringify(data));

  console.log("END addArtikal");
  // localhost:9000/api/artikals
  // return http.post("/artikals", data);

  return client.post(saveendpoint, JSON.stringify(data), {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
  return "";
};

export const updateArtikal = (artikal, onUploadProgress) => {
  console.log("START updateArtikal");

  console.log("artikal.artikal_id = " + artikal.artikal_id);
  console.log("artikal.ime_artikal = " + artikal.ime_artikal);
  console.log("artikal.vid_id = " + artikal.vid.value);
  console.log("artikal.cena = " + artikal.cena);
  console.log("artikal.steuerrelevant = " + artikal.steuerrelevant);

  var data = {
    artikal_id: artikal.artikal_id,
    ime_artikal: artikal.ime_artikal,
    vid_id: artikal.vid.value,
    cena: artikal.cena,
    steuerrelevant: artikal.steuerrelevant,
  };

  console.log("data = " + JSON.stringify(data));

  console.log("END updateArtikal");
  // localhost:9000/api/artikals
  // return http.post("/artikals", data);
  // client.get(artikalbyime + "?ime_artikal=" + imeArtikal);

  return client.put(
    saveendpoint + "/" + artikal.artikal_id,
    JSON.stringify(data),
    {
      onUploadProgress: (progress) =>
        onUploadProgress(progress.loaded / progress.total),
    }
  );
};

export default {
  addArtikal,
  getArtikals,
  getArtikalsByIme,
  updateArtikal,
};

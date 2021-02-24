import client from "./client";

const endpoint = "/valutas";
const valutabyime = "/valutas";

const getValutas = () => client.get(endpoint);

const getValutasByIme = (imeValuta) =>
  client.get(valutabyime + "?ime_valuta=" + imeValuta);

export const addValuta = (valuta, onUploadProgress) => {
  console.log("START addValuta");

  console.log("valuta.ime_valuta = " + valuta.ime_valuta);
  console.log("valuta.valuta_id = " + valuta.valuta_id.value);

  var data = {
    ime_valuta: valuta.ime_valuta,
    valuta_id: valuta.valuta_id.value,
  };

  console.log("data = " + JSON.stringify(data));

  console.log("END-2 addValuta");
  // localhost:9000/api/valutas
  // return http.post("/valutas", data);

  return client.post(endpoint, JSON.stringify(data), {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

export default {
  addValuta,
  getValutas,
  getValutasByIme,
};

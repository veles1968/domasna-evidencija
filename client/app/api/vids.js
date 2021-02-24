import client from "./client";
// import http from "../http-common";

const endpoint = "/vids";
const vidbyime = "/vids";

const getVids = () => client.get(endpoint);

const getVidsByIme = (imeVid) => client.get(vidbyime + "?ime_vid=" + imeVid);
// client.get(vidbyime + "?ime_vid=benzin");

export const addVid = (artikal, onUploadProgress) => {
  console.log("START addVid");

  console.log("artikal.ime_vid = " + artikal.ime_vid);
  console.log("artikal.vid_id = " + artikal.vid_id.value);

  // const data = new FormData();
  // data.append("vid_id", artikal.vid_id);
  // data.append("ime_vid", artikal.ime_vid);
  // data.append("cena", artikal.cena);
  // data.append("steuerrelevant", artikal.steuerrelevant);
  var data = {
    ime_vid: artikal.ime_vid,
    vid_id: artikal.vid_id.value,
  };

  console.log("data = " + JSON.stringify(data));
  // console.log("ime_vid = " + JSON.stringify(data._parts[1][1]));

  // artikal.images.forEach((image, index) =>
  //   data.append("images", {
  //     name: "image" + index,
  //     type: "image/jpeg",
  //     uri: image,
  //   })
  // );

  // if (artikal.location)
  //   data.append("location", JSON.stringify(artikal.location));

  console.log("END-2 addVid");
  // localhost:9000/api/vids
  // return http.post("/vids", data);

  return client.post(endpoint, JSON.stringify(data), {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

export default {
  addVid,
  getVids,
  getVidsByIme,
};

const oracledb = require("oracledb");
const database = require("../services/database.js");

const baseQuery = `select artikli.artikal_id "artikal_id",
artikli.ime_artikal "ime_artikal",
artikli.vid_id "vid_id",
artikli.cena "cena",
artikli.steuerrelevant "steuerrelevant",
artikli.insdate "insdate",
artikli.insuser "insuser",
artikli.upddate "upddate",
artikli.upduser "upduser",
vid.ime_vid "ime_vid"
  from artikli, vid
  where artikli.vid_id = vid.vid_id(+)`;

async function find(context) {
  console.log("START find");
  console.log("context.ime_artikal = <" + context.ime_artikal + ">");

  let query = baseQuery;
  var binds = {};

  if (context.id) {
    binds.artikal_id = context.id;

    query += `\nwhere artikal_id = :artikal_id`;
  } else if (context.ime_artikal) {
    console.log("SELECT after IME_ARTIKAL");

    query += `\nAND UPPER(ime_artikal) LIKE UPPER(:ime_artikal) ORDER BY UPPER(ime_artikal)`;
    binds = { ime_artikal: `%${context.ime_artikal}%` };
  } else {
    // query += `\nwhere artikal_id in ( 599, 600 )`;
    query += `\nAND artikal_id > 3850`;
  }

  console.log("query = " + query);
  console.log("binds = " + JSON.stringify(binds));

  const result = await database.simpleExecute(query, binds);

  console.log("END find");

  return result.rows;
}

module.exports.find = find;

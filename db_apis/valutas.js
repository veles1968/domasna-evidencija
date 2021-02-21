const oracledb = require("oracledb");
const database = require("../services/database.js");

const baseQuery = `select 'backgroundColor' "backgroundColor",
'icon' "icon",
ime_valuta "label",
valuta.valuta_id "value", 
valuta.insdate "insdate",
valuta.insuser "insuser",
valuta.upddate "upddate",
valuta.upduser "upduser"
  from valuta`;

async function find(context) {
  console.log("START find");
  console.log("context.ime_valuta = <" + context.ime_valuta + ">");

  let query = baseQuery;
  var binds = {};

  if (context.id) {
    binds.valuta_id = context.id;

    query += `\nwhere valuta_id = :valuta_id`;
  } else if (context.ime_valuta) {
    console.log("SELECT after IME_VALUTA");

    query += `\nAND UPPER(ime_valuta) LIKE UPPER(:ime_valuta) ORDER BY UPPER(ime_valuta)`;
    binds = { ime_valuta: `%${context.ime_valuta}%` };
  } else {
    // query += `\nwhere valuta_id in ( 599, 600 )`;
    // query += `\nAND valuta_id > 4500`;
    // query += `\nAND valuta_id < 100`;
  }

  query += `\nORDER BY valuta.ime_valuta ASC`;

  console.log("query = " + query);
  console.log("binds = " + JSON.stringify(binds));

  const result = await database.simpleExecute(query, binds);

  console.log("END find");

  return result.rows;
}

module.exports.find = find;

const oracledb = require("oracledb");
const database = require("../services/database.js");

const baseQuery = `select 'backgroundColor' "backgroundColor",
'icon' "icon",
ime_vraboten "label",
vraboten.vraboten_id "value", 
vraboten.vraboten_password "vraboten_password", 
vraboten.insdate "insdate",
vraboten.insuser "insuser",
vraboten.upddate "upddate",
vraboten.upduser "upduser"
  from vraboten`;

async function find(context) {
  console.log("START find");
  console.log("context.ime_vraboten = <" + context.ime_vraboten + ">");

  let query = baseQuery;
  var binds = {};

  if (context.id) {
    binds.vraboten_id = context.id;

    query += `\nwhere vraboten_id = :vraboten_id`;
  } else if (context.ime_vraboten) {
    console.log("SELECT after TIP_PRIMANJE");

    query += `\nAND UPPER(ime_vraboten) LIKE UPPER(:ime_vraboten) ORDER BY UPPER(ime_vraboten)`;
    binds = { ime_vraboten: `%${context.ime_vraboten}%` };
  } else {
    // query += `\nwhere vraboten_id in ( 599, 600 )`;
    // query += `\nAND vraboten_id > 4500`;
    // query += `\nAND vraboten_id < 100`;
  }

  query += `\nORDER BY vraboten.ime_vraboten ASC`;

  console.log("query = " + query);
  console.log("binds = " + JSON.stringify(binds));

  const result = await database.simpleExecute(query, binds);

  console.log("END find");

  return result.rows;
}

module.exports.find = find;

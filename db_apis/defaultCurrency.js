const oracledb = require("oracledb");
const database = require("../services/database.js");

const baseQuery = `begin

SYSTEMPARAMETER_PCK.GET_DEFAULT_CURRENCY(
  p_description => 'DEFAULT_CURRENCY', 
	p_systemparameter_id => :systemparameter_id_out, 
	p_pnumber => :pnumber_out
    );
  
  end;`;

async function find(context) {
  console.log("START find");
  console.log("context.tip_primanje = <" + context.tip_primanje + ">");

  let query = baseQuery;
  var binds = {
    systemparameter_id_out: {
      dir: oracledb.BIND_OUT,
      type: oracledb.NUMBER,
    },
    pnumber_out: {
      dir: oracledb.BIND_OUT,
      type: oracledb.NUMBER,
    },
  };

  // if (context.id) {
  //   binds.primanja_id = context.id;

  //   query += `\nwhere primanja_id = :primanja_id`;
  // } else if (context.tip_primanje) {
  //   console.log("SELECT after TIP_PRIMANJE");

  //   query += `\nAND UPPER(tip_primanje) LIKE UPPER(:tip_primanje) ORDER BY UPPER(tip_primanje)`;
  //   binds = { tip_primanje: `%${context.tip_primanje}%` };
  // } else {
  //   query += `\nAND primanja_id > 4500`;
  // }

  console.log("query = " + query);
  console.log("binds = " + JSON.stringify(binds));

  const result = await database.simpleExecute(query, binds);

  console.log("END find");

  console.log("(result.outBinds =" + result.outBinds);
  if (result.outBinds) {
    return result.outBinds.pnumber_out;
  } else {
    return null;
  }
}

module.exports.find = find;

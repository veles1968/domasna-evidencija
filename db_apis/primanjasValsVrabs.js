const oracledb = require("oracledb");
const database = require("../services/database.js");

const baseQuery = `select 
primanja.primanja_id "primanja_id", 
primanja.valuta_id "valuta_id", 
primanja.vraboten_id "vraboten_id", 
primanja.iznos "iznos", 
primanja.mesec "mesec", 
primanja.tip_primanje "tip_primanje", 
primanja.datum "datum", 
primanja.odnossodem "odnossodem",
primanja.vobanka "vobanka",
primanja.trans_id "trans_id",
primanja.insdate "insdate",
primanja.insuser "insuser",
primanja.upddate "upddate",
primanja.upduser "upduser",
vraboten.ime_vraboten "ime_vraboten",
valuta.ime_valuta "ime_valuta"
  from primanja, vraboten, valuta
  where primanja.vraboten_id = vraboten.vraboten_id(+)
  and primanja.valuta_id = valuta.valuta_id`;

async function find(context) {
  console.log("START find");
  console.log("context.tip_primanje = <" + context.tip_primanje + ">");

  let query = baseQuery;
  var binds = {};

  if (context.id) {
    binds.primanja_id = context.id;

    query += `\nwhere primanja_id = :primanja_id`;
  } else if (context.tip_primanje) {
    console.log("SELECT after TIP_PRIMANJE");

    query += `\nAND UPPER(tip_primanje) LIKE UPPER(:tip_primanje) ORDER BY UPPER(tip_primanje)`;
    binds = { tip_primanje: `%${context.tip_primanje}%` };
  } else {
    // query += `\nwhere primanja_id in ( 599, 600 )`;
    query += `\nAND primanja_id > 4500`;
    // query += `\nAND primanja_id < 100`;
  }

  // query += `\nORDER BY primanja.datum DESC`;

  console.log("query = " + query);
  console.log("binds = " + JSON.stringify(binds));

  const result = await database.simpleExecute(query, binds);

  console.log("END find");

  return result.rows;
}

const updateSql = `begin

PRIMANJA_PCK.INS_UPD_PRIMANJA(
  p_primanja_id => :primanja_id,
  /* p_primanja_id => :pid, */
  p_valuta_id => :valuta_id,
  p_vraboten_id => :vraboten_id,
  p_mesec => TO_DATE(:mesec, 'dd.mm.rr'),
  p_iznos => :iznos,
  p_tip_primanje => :tip_primanje,
  p_datum => TO_DATE(:datum, 'dd.mm.rr'),
  p_odnossodem => :odnossodem,
  p_vobanka => :vobanka,
  p_trans_id => :trans_id,
  /*p_primanja_id_out => :pidout*/
  p_primanja_id_out => :p_primanja_id_out
  );

end;`;

const createSql = `begin
PRIMANJA_PCK.INS_UPD_PRIMANJA(
  p_valuta_id => :valuta_id,
  p_vraboten_id => :vraboten_id,
/*  p_mesec => TO_DATE(:mesec, 'dd.mm.rr'), */
  p_iznos => :iznos,
  p_tip_primanje => :tip_primanje,
  p_datum => TO_DATE(:datum, 'dd.mm.rr'),
  p_odnossodem => :odnossodem,
  p_vobanka => :vobanka,
  /* p_trans_id => :trans_id, */
  p_primanja_id_out => :p_primanja_id_out
  );
end;`;

// p_primanja_id => :primanja_id,
// p_valuta_id => :valuta_id,
//   p_vraboten_id => :vraboten_id,
//   p_iznos => :iznos,
//   p_tip_primanje => ':tip_primanje',
//   p_datum => ':datum',
//   p_odnossodem => :odnossodem,
//   p_vobanka => 0,
// (p_trans_id) => NULL,
// p_mesec => :mesec,
// p_mesec => TO_CHAR(:mesec, 'dd.mm.yyyy'),
// p_vobanka => :vobanka,
// p_trans_id => :trans_id,
// p_primanja_id_out => :primanja_id_out

async function update(pri) {
  const primanja = Object.assign({}, pri);

  console.log("primanja.primanja_id = " + primanja.primanja_id);
  console.log("primanja.valuta_id = " + primanja.valuta_id);
  console.log("primanja.vraboten_id = " + primanja.vraboten_id);
  console.log("primanja.iznos = " + primanja.iznos);
  console.log("primanja.mesec = " + primanja.mesec);
  console.log("primanja.tip_primanje = " + primanja.tip_primanje);
  console.log("primanja.datum = " + primanja.datum);
  console.log("primanja.odnossodem = " + primanja.odnossodem);
  console.log("primanja.vobanka = " + primanja.vobanka);
  console.log("primanja.trans_id = " + primanja.trans_id);

  // const binds = {
  // primanja_id: primanja.primanja_id,
  // valuta_id: primanja.valuta_id,
  // vraboten_id: primanja.vraboten_id,
  // iznos: primanja.iznos,
  // mesec: primanja.mesec,
  // tip_primanje: primanja.tip_primanje,
  // datum: primanja.datum,
  // odnossodem: primanja.odnossodem,
  // vobanka: primanja.vobanka,
  // trans_id: primanja.trans_id,
  //   p_primanja_id_out: {
  //     type: oracledb.NUMBER,
  //     dir: oracledb.BIND_OUT,
  //   },
  // };

  const binds = {
    primanja_id: primanja.primanja_id,
    valuta_id: primanja.valuta_id,
    vraboten_id: primanja.vraboten_id,
    iznos: primanja.iznos,
    mesec: primanja.mesec,
    tip_primanje: primanja.tip_primanje,
    datum: primanja.datum,
    odnossodem: primanja.odnossodem,
    vobanka: primanja.vobanka,
    trans_id: primanja.trans_id,
    // pidout: {
    p_primanja_id_out: {
      dir: oracledb.BIND_OUT,
      type: oracledb.NUMBER,
    },
  };

  // const result = await database.simpleExecute(updateSql);
  const result = await database.simpleExecute(updateSql, binds);
  // const result = await database.simpleExecute(updateSql, primanja);

  console.log("(result.outBinds =" + result.outBinds);
  if (result.outBinds) {
    return primanja;
  } else {
    return null;
  }
}

async function create(pri) {
  const primanja = Object.assign({}, pri);

  const binds = {
    valuta_id: primanja.valuta_id,
    vraboten_id: primanja.vraboten_id,
    iznos: primanja.iznos,
    tip_primanje: primanja.tip_primanje,
    datum: primanja.datum,
    odnossodem: primanja.odnossodem,
    vobanka: primanja.vobanka,
    p_primanja_id_out: {
      dir: oracledb.BIND_OUT,
      type: oracledb.NUMBER,
    },
  };

  // const result = await database.simpleExecute(updateSql);
  const result = await database.simpleExecute(createSql, binds);
  // const result = await database.simpleExecute(updateSql, primanja);

  console.log("(result.outBinds =" + result.outBinds);
  if (result.outBinds) {
    return primanja;
  } else {
    return null;
  }
}

module.exports.create = create;
module.exports.find = find;
module.exports.update = update;

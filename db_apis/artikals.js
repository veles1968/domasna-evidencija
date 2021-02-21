const oracledb = require("oracledb");
const database = require("../services/database.js");

const baseQuery = `select artikal_id "artikal_id",
ime_artikal "ime_artikal",
vid_id "vid_id",
cena "cena",
steuerrelevant "steuerrelevant",
insdate "insdate",
insuser "insuser",
upddate "upddate",
upduser "upduser"
  from artikli`;

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

    query += `\nwhere UPPER(ime_artikal) LIKE UPPER(:ime_artikal) ORDER BY UPPER(ime_artikal)`;
    binds = { ime_artikal: `%${context.ime_artikal}%` };
  } else {
    // query += `\nwhere artikal_id in ( 599, 600 )`;
    query += `\nwhere artikal_id < 5`;
  }

  console.log("query = " + query);
  console.log("binds = " + JSON.stringify(binds));

  const result = await database.simpleExecute(query, binds);

  console.log("END find");

  return result.rows;
}

const createSql = `insert into artikli (
ime_artikal,
vid_id,
cena,
steuerrelevant
  ) values (
    :ime_artikal,
    :vid_id,
    :cena,
    :steuerrelevant
  ) returning artikal_id
  into :artikal_id`;

async function create(art) {
  const artikal = Object.assign({}, art);

  artikal.artikal_id = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER,
  };

  const result = await database.simpleExecute(createSql, artikal);

  artikal.artikal_id = result.outBinds.artikal_id[0];
  console.log("ARTIKAL.ARTIKAL_ID: " + artikal.artikal_id);

  return artikal;
}

const updateSql = `update artikli
  set ime_artikal = :ime_artikal,
  vid_id = :vid_id,
  cena = :cena,
  steuerrelevant = :steuerrelevant
  where artikal_id = :artikal_id`;

async function update(art) {
  const artikal = Object.assign({}, art);
  const result = await database.simpleExecute(updateSql, artikal);

  if (result.rowsAffected && result.rowsAffected === 1) {
    return artikal;
  } else {
    return null;
  }
}

const deleteSql = `begin

    delete from artikli
    where artikal_id = :artikal_id;

    :rowcount := sql%rowcount;

  end;`;

async function del(id) {
  const binds = {
    artikal_id: id,
    rowcount: {
      dir: oracledb.BIND_OUT,
      type: oracledb.NUMBER,
    },
  };
  const result = await database.simpleExecute(deleteSql, binds);

  return result.outBinds.rowcount === 1;
}

module.exports.delete = del;
module.exports.update = update;
module.exports.create = create;
module.exports.find = find;

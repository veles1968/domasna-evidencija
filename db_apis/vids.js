const oracledb = require("oracledb");
const database = require("../services/database.js");

const baseQuery = `select 'backgroundColor' "backgroundColor",
'icon' "icon",
ime_vid "label",
vid_id "value",
insdate "insdate",
insuser "insuser",
upddate "upddate",
upduser "upduser"
  from vid`;

async function find(context) {
  console.log("START find");
  console.log("context.ime_vid = <" + context.ime_vid + ">");

  let query = baseQuery;
  var binds = {};

  if (context.id) {
    binds.vid_id = context.id;

    query += `\nwhere vid_id = :vid_id`;
  } else if (context.ime_vid) {
    console.log("SELECT after IME_VID");

    query += `\nwhere UPPER(ime_vid) LIKE UPPER(:ime_vid)`;
    binds = { ime_vid: `%${context.ime_vid}%` };
  } else {
    // query += `\nwhere vid_id in ( 599, 600 )`;
    // query += `\nwhere vid_id < 20`;
  }

  query += `\n ORDER BY UPPER(ime_vid)`;

  console.log("query = " + query);
  console.log("binds = " + JSON.stringify(binds));

  const result = await database.simpleExecute(query, binds);

  console.log("END find");

  return result.rows;
}

const createSql = `insert into vid (
ime_vid,
vid_id,
  ) values (
    :ime_vid,
    :vid_id
  ) returning vid_id
  into :vid_id`;

async function create(vid) {
  const vidObject = Object.assign({}, vid);

  vidObject.vid_id = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER,
  };

  const result = await database.simpleExecute(createSql, vidObject);

  vidObject.vid_id = result.outBinds.vid_id[0];
  console.log("VID.VID_ID: " + vidObject.vid_id);

  return vid;
}

const updateSql = `update vid
  set ime_vid = :ime_vid
  where vid_id = :vid_id`;

async function update(vid) {
  const vidObject = Object.assign({}, vid);
  const result = await database.simpleExecute(updateSql, vidObject);

  if (result.rowsAffected && result.rowsAffected === 1) {
    return vidObject;
  } else {
    return null;
  }
}

const deleteSql = `begin

    delete from vid
    where vid_id = :vid_id;

    :rowcount := sql%rowcount;

  end;`;

async function del(id) {
  const binds = {
    vid_id: id,
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

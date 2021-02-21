const oracledb = require("oracledb");
const dbConfig = require("../config/database.js");

async function initialize() {
  try {
    console.log("libDir = " + dbConfig.dePool.libraryDir);

    oracledb.initOracleClient({
      //   libDir: "C:\\PRIVAT_DATA\\TOOLS\\ORACLE_instantclient_19_9",
      libDir: dbConfig.dePool.libraryDir,
    });
  } catch (err) {
    console.error(
      "Greshka pri INIT na Oracle Client!, libDir:" + dbConfig.libraryDir
    );
    console.error(err);
    process.exit(1);
  }

  const pool = await oracledb.createPool(dbConfig.dePool);
}
// *** previous code above this line ***

async function close() {
  await oracledb.getPool().close();
}

// *** previous code above this line ***

function simpleExecute(statement, binds = [], opts = {}) {
  return new Promise(async (resolve, reject) => {
    let conn;

    opts.outFormat = oracledb.OBJECT;
    opts.autoCommit = true;

    try {
      conn = await oracledb.getConnection();

      const result = await conn.execute(statement, binds, opts);

      resolve(result);
    } catch (err) {
      reject(err);
    } finally {
      if (conn) {
        // conn assignment worked, need to close
        try {
          await conn.close();
        } catch (err) {
          console.log(err);
        }
      }
    }
  });
}

module.exports.simpleExecute = simpleExecute;
module.exports.close = close;
module.exports.initialize = initialize;

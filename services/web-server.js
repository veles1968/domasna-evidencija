const http = require("http");
const express = require("express");
const morgan = require("morgan");
const webServerConfig = require("../config/web-server.js");
// const database = require("./database.js");
const bodyParser = require("body-parser");
const router = require("./router.js");

let httpServer;

function initialize() {
  return new Promise((resolve, reject) => {
    const app = express();
    httpServer = http.createServer(app);

    // Combines logging info from request and response
    app.use(morgan("combined"));
    // *** app.get call below this line ***

    // app.get("/", (req, res) => {
    //   res.end("Hello World!");
    // });
    // *** line that adds morgan to app here ***

    // app.get("/", async (req, res) => {
    //   const result = await database.simpleExecute(
    //     "select user, systimestamp from dual"
    //   );
    //   const user = result.rows[0].USER;
    //   const date = result.rows[0].SYSTIMESTAMP;

    //   res.end(`DB user: ${user}\nDate: ${date}`);
    // });

    // *** line that adds morgan to app here ***

    // app.use(bodyParser.json());

    // Parse incoming JSON requests and revive JSON.
    app.use(
      express.json({
        reviver: reviveJson,
      })
    );

    // Mount the router at /api so all its routes start with /api
    // http://server:port/api/employees/:id.
    app.use("/api", router);

    httpServer
      .listen(webServerConfig.port)
      .on("listening", () => {
        console.log(
          `Web server listening on localhost:${webServerConfig.port}`
        );

        resolve();
      })
      .on("error", (err) => {
        reject(err);
      });
  });
}

// *** previous code above this line ***

function close() {
  return new Promise((resolve, reject) => {
    httpServer.close((err) => {
      if (err) {
        reject(err);
        return;
      }

      resolve();
    });
  });
}

const iso8601RegExp = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;

function reviveJson(key, value) {
  // revive ISO 8601 date strings to instances of Date
  if (typeof value === "string" && iso8601RegExp.test(value)) {
    return new Date(value);
  } else {
    console.log(`key=${key}, value=${value} `);

    return value;
  }
}

module.exports.close = close;
module.exports.initialize = initialize;

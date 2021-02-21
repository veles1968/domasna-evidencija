const vrabotens = require("../db_apis/vrabotens.js");

async function get(req, res, next) {
  console.log("START GET");

  try {
    const context = {};

    // *************** TEST ********************** //
    // res.status(404).end();
    // *************** TEST ********************** //

    console.log("1. req.params: " + JSON.stringify(req.params));
    console.log("2. req.params.id: " + req.params.id);
    console.log("3. req.body.id: " + req.body.id);
    console.log("4. req.query: " + JSON.stringify(req.query));

    context.id = parseInt(req.params.id, 10);
    context.ime_vraboten = req.query.ime_vraboten;

    console.log("5. context: " + JSON.stringify(context));

    const rows = await vrabotens.find(context);
    // console.log("rows=" + JSON.stringify(rows));

    if (req.params.id) {
      if (rows.length === 1) {
        console.log("END GET");
        res.status(200).json(rows[0]);
        // res.status(200).rows[0];
      } else {
        console.log("END GET");
        res.status(404).end();
      }
    } else {
      console.log("END GET");
      res.status(200).json(rows);
      // res.send(rows);

      // res.status(200).rows;
      // res.status(200).send(rows);
      // res.send(rows.rows);
    }
  } catch (err) {
    next(err);
  }
}

module.exports.get = get;

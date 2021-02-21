const primanjasValsVrabs = require("../db_apis/primanjasValsVrabs.js");

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
    context.tip_primanje = req.query.tip_primanje;

    console.log("5. context: " + JSON.stringify(context));

    const rows = await primanjasValsVrabs.find(context);
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

function getPrimanjaFromRec(req) {
  const primanja = {
    valuta_id: req.body.valuta_id,
    vraboten_id: req.body.vraboten_id,
    iznos: req.body.iznos,
    mesec: req.body.mesec,
    tip_primanje: req.body.tip_primanje,
    datum: req.body.datum,
    odnossodem: req.body.odnossodem,
    vobanka: req.body.vobanka,
    trans_id: req.body.trans_id,
  };

  return primanja;
}

async function put(req, res, next) {
  try {
    let primanja = getPrimanjaFromRec(req);

    primanja.primanja_id = parseInt(req.params.id, 10);

    primanja = await primanjasValsVrabs.update(primanja);

    if (primanja !== null) {
      res.status(200).json(primanja);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    next(err);
  }
}
async function post(req, res, next) {
  try {
    let primanja = getPrimanjaFromRec(req);

    primanja = await primanjasValsVrabs.create(primanja);

    res.status(201).json(primanja);
  } catch (err) {
    next(err);
  }
}

module.exports.get = get;
module.exports.post = post;
module.exports.put = put;

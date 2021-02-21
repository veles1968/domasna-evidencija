const artikals = require("../db_apis/artikals.js");

async function get(req, res, next) {
  console.log("START GET");

  try {
    const context = {};

    console.log("1. req.params: " + JSON.stringify(req.params));
    console.log("2. req.params.id: " + req.params.id);
    console.log("3. req.body.id: " + req.body.id);
    console.log("4. req.query: " + JSON.stringify(req.query));

    context.id = parseInt(req.params.id, 10);
    context.ime_artikal = req.query.ime_artikal;

    console.log("5. context: " + JSON.stringify(context));

    const rows = await artikals.find(context);
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

async function getByName(req, res, next) {
  console.log("START getByName");

  try {
    const context = {};

    console.log("1. req.params: " + JSON.stringify(req.params));
    console.log("2. req.params.id: " + req.params.id);
    console.log("3. req.body: " + req.body);
    console.log("4. req.body.id: " + req.body.id);
    console.log("5. req.query: " + req.query);
    console.log("6. req.query: " + JSON.stringify(req.query));
    console.log("7. req.body: " + JSON.stringify(req.body));
    console.log("8. req.body.id: " + JSON.stringify(req.body).id);

    // context.id = parseInt(req.params.id, 10);
    context.id = parseInt(req.query.id, 10);

    const rows = await artikals.find(context);
    // console.log("rows=" + JSON.stringify(rows));

    // if (req.params.id) {
    if (req.query.id) {
      if (rows.length === 1) {
        console.log("END getByName");
        res.status(200).json(rows[0]);
        // res.status(200).rows[0];
      } else {
        console.log("END getByName");
        res.status(404).end();
      }
    } else {
      console.log("END getByName");
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

function getArtikalFromRec(req) {
  const artikal = {
    ime_artikal: req.body.ime_artikal,
    vid_id: req.body.vid_id,
    cena: req.body.cena,
    steuerrelevant: req.body.steuerrelevant,
  };

  return artikal;
}

async function post(req, res, next) {
  try {
    console.log("req.body: " + req);

    let artikal = getArtikalFromRec(req);

    artikal = await artikals.create(artikal);

    res.status(201).json(artikal);
  } catch (err) {
    next(err);
  }
}

async function put(req, res, next) {
  try {
    let artikal = getArtikalFromRec(req);

    artikal.artikal_id = parseInt(req.params.id, 10);

    artikal = await artikals.update(artikal);

    if (artikal !== null) {
      res.status(200).json(artikal);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    next(err);
  }
}

async function del(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10);

    const success = await artikals.delete(id);

    if (success) {
      res.status(204).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    next(err);
  }
}

module.exports.delete = del;
module.exports.put = put;
module.exports.post = post;
module.exports.get = get;
module.exports.getByName = getByName;

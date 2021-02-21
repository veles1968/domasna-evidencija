const vids = require("../db_apis/vids.js");

async function get(req, res, next) {
  console.log("START GET");

  try {
    const context = {};

    console.log("1. req.params: " + JSON.stringify(req.params));
    console.log("2. req.params.id: " + req.params.id);
    console.log("3. req.body.id: " + req.body.id);
    console.log("4. req.query: " + JSON.stringify(req.query));

    context.id = parseInt(req.params.id, 10);
    context.ime_vid = req.query.ime_vid;

    console.log("5. context: " + JSON.stringify(context));

    const rows = await vids.find(context);
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

function getVidFromRec(req) {
  const vid = {
    ime_vid: req.body.ime_vid,
    vid_id: req.body.vid_id,
  };

  return vid;
}

async function post(req, res, next) {
  try {
    console.log("req.body: " + req);

    let vid = getVidFromRec(req);

    vid = await vids.create(vid);

    res.status(201).json(vid);
  } catch (err) {
    next(err);
  }
}

async function put(req, res, next) {
  try {
    let vid = getVidFromRec(req);

    vid.vid_id = parseInt(req.params.id, 10);

    vid = await vids.update(vid);

    if (vid !== null) {
      res.status(200).json(vid);
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

    const success = await vids.delete(id);

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

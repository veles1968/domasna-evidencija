const express = require("express");
const router = new express.Router();
const artikals = require("../controllers/artikals.js");
const artikalsvids = require("../controllers/artikalsVids.js");
const defaultCurrency = require("../controllers/defaultCurrency.js");
const home = require("../controllers/home.js");
const primanjasvalsvrabs = require("../controllers/primanjasValsVrabs.js");
const valutas = require("../controllers/valutas.js");
const vids = require("../controllers/vids.js");
const vrabotens = require("../controllers/vrabotens.js");

// : means optional parameter
// router.route("/artikals/:id?").get(artikals.get);

/* Home Page for the NODE.JS Server */
// router.route.get("/", function (req, res, next) {
//   res.render("home", { title: "Home Page Domasna Evidencija Server App 0.1" });
// });
// router.route("/home").get(home.get);

// router.get("/", function (req, res, next) {
//   res.render("home", { title: "Home Page Domasna Evidencija Server App 0.1" });
// });

// router.get("/home", home.serverOutput);

router.get("/home", function (req, res, next) {
  // res.render("router", {
  //   title: "Home Page Domasna Evidencija Server App 0.1",
  // });

  res.status(200).json({
    body: "Hello from the server!",
  });
});

// Table ARTIKLI
router
  .route("/artikals/:id?")
  .get(artikals.get)
  .post(artikals.post)
  .put(artikals.put)
  .delete(artikals.delete);

// Tables ARTIKLI, VID
router.route("/artikalsvids/:id?").get(artikalsvids.get);

// defaultCurrency
router.route("/defaultcurrency/:id?").get(defaultCurrency.get);

// Tables PRIMANJA, VRABOTEN, VALUTA
router
  .route("/primanjasvalsvrabs/:id?")
  .get(primanjasvalsvrabs.get)
  .post(primanjasvalsvrabs.post)
  .put(primanjasvalsvrabs.put);
// .delete(primanjasvalsvrabs.delete);

// Table VALUTA
router.route("/valutas/:id?").get(valutas.get);

// Table VID
router.route("/vids/:id?").get(vids.get);

// Table VRABOTEN
router.route("/vrabotens/:id?").get(vrabotens.get);

module.exports = router;

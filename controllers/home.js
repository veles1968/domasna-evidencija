const serverOutput = (req, res, next) => {
  console.log("START GET");
  res.render("router", {
    title: "Home Page Domasna Evidencija Server App 0.1",
  });
  // res.render("home");
  // res.status(200).json({
  //   body: "Hello from the server!",
  // });
  console.log("END GET");
};

module.exports.serverOutput = serverOutput;

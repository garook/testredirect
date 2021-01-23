require("dotenv").config();
const express = require("express");
const serverless = require("serverless-http");
const { getRedirectUrl } = require("./services/redirection");

const app = express();

app.get("*", async (req, res) => {
  console.log("abca")
  const url = await getRedirectUrl({
    protocol: req.protocol,
    hostname: req.hostname,
    originalUrl: req.originalUrl
  });
  res.set("location", url);

  return res.status(301).send(); ;
});

/** Production Express handler **/
module.exports.expressHandler = serverless(app);

/**  Development handlers **/
if (process.env.NODE_ENV !== "production") {
  (async function () {
    console.log("**** Listening on port 8899 ****");
    app.listen(8899);
  })();
}

exports.app = app;

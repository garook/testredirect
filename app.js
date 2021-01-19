const express = require("express");
const serverless = require("serverless-http");
const app = express();

const redirects = {
  "speedoc.sg": "http:/speedoc.com/sg",
  "speedoc.my": "http:/speedoc.com/sg",
  "speedoc.com.my": "http:/speedoc.com/sg",
  "localhost:8890": "http://google.com.sg"
};

app.get("/", function (req, res) {
  res.status(301).redirect(redirects[req.get("host")]);
});

/** Production Express handler **/
module.exports.expressHandler = serverless(app);

/**  Development handlers **/
if (process.env.NODE_ENV !== "production") {
  (async function () {
    console.log("**** Listening on port 8890 ****");
    app.listen(8890);
  })();
}

module.exports = app;

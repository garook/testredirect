require("dotenv").config();
const express = require("express");

const app = express();

app.get("/ping", (req, res) => res.end());

app.get("*", async (req, res) => {
  const url = `${req.protocol}://${req.hostname}${req.originalUrl}`;
  try {
    return res.redirect("https://form.jotform.com/211774478626062");
  } catch (e) {
    console.log(`Sending 400 for`, url, e.toString());
    return res.status(400).end();
  }
});

const port = process.env.PORT || 8888;
app.listen(port);

console.log(`**** Listening on port ${port} ****`);

exports.app = app;

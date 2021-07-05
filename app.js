require("dotenv").config();
const express = require("express");

const app = express();

app.get("/ping", ({res}) => res.end());

app.get("/homehospital", async ({res}) => {
  try {
    return res.redirect("https://form.jotform.com/211774478626062");
  } catch (e) {
    console.log(`error: `, e.toString());
    return res.status(400).end();
  }
});

app.get("/aia", async ({res}) => {
  try {
    return res.redirect("https://form.jotform.com/211775297237060");
  } catch (e) {
    console.log(`error: `, e.toString());
    return res.status(400).end();
  }
});

const port = process.env.PORT || 8888;
app.listen(port);

console.log(`**** Listening on port ${port} ****`);

exports.app = app;

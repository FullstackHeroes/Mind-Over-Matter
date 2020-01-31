const app = express();
const path = require("path");
const express = require("express");
const volleyball = require("volleyball");
const bodyParser = require("body-parser");
// const db = require('./db') //for when db is up
module.exports = app;

app.use(volleyball);

app.use(express.json());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(express.urlencoded({ extended: true }));

app.use("/api", require("./api"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Server Error");
});

const db = require("../db");
const { Hour, Day, Week } = require("./score");
const User = require("./user");

module.exports = {
  db,
  User,
  Hour,
  Day,
  Week
};

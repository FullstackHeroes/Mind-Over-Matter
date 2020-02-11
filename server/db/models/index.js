const { db } = require("../db");
const { WeightedScore } = require("./score");
const User = require("./user");

WeightedScore.belongsTo(User);

module.exports = {
  db,
  User,
  WeightedScore
};

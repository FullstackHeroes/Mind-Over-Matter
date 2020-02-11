const { db } = require("../db");
const { WeightedScore, NormalizeScore } = require("./score");
const User = require("./user");

WeightedScore.belongsTo(User);
NormalizeScore.belongsTo(User);

module.exports = {
  db,
  User,
  WeightedScore,
  NormalizeScore
};

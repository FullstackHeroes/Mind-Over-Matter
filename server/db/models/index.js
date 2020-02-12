const { db } = require("../db");
const { WeightedScore } = require("./score");
const User = require("./user");
const Article = require("./article");

WeightedScore.belongsTo(User);

module.exports = {
  db,
  User,
  WeightedScore,
  Article
};

const { db } = require("../db");
const { Hour, Day, Week, NormalizeScore } = require("./score");
const User = require("./user");

Hour.belongsTo(User);
Day.belongsTo(User);
Week.belongsTo(User);
NormalizeScore.belongsTo(User);

module.exports = {
  db,
  User,
  Hour,
  Day,
  Week,
  NormalizeScore
};

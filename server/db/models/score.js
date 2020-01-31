const Sequelize = require("sequelize");
module.exports = { Hour, Day, Week };

const Hour = Sequelize.define("Hour", {
  trueScore: DataTypes.DECIMAL,
  timeStamp: DataTypes.STRING
  //format for if we need additional validations
  // trueScore: {
  //   type: Sequelize.STRING
  // },
  // timeStamp: {
  //   type: Sequelize.STRING
  // }
});

const Day = Sequelize.define("Day", {
  trueScore: DataTypes.DECIMAL,
  timeStamp: DataTypes.STRING
});

const Week = Sequelize.define("Week", {
  trueScore: DataTypes.DECIMAL,
  timeStamp: DataTypes.STRING
});

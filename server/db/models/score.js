const Sequelize = require("sequelize");
module.exports = { Hour, Day, Week };

const Hour = Sequelize.define("Hour", {
  trueScore:{
    type: Sequelize.STRING
  }
});

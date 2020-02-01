const Sequelize = require("sequelize");
const { db } = require("../db");

const Hour = db.define("hour", {
  trueScore: {
    type: Sequelize.DECIMAL
  },
  happy: {
    type: Sequelize.DECIMAL
  },
  surprised: {
    type: Sequelize.DECIMAL
  },
  neutral: {
    type: Sequelize.DECIMAL
  },
  disgusted: {
    type: Sequelize.DECIMAL
  },
  fearful: {
    type: Sequelize.DECIMAL
  },
  angry: {
    type: Sequelize.DECIMAL
  },
  sad: {
    type: Sequelize.DECIMAL
  },
  timeStamp: {
    type: Sequelize.STRING
  }
});

const Day = db.define("day", {
  trueScore: {
    type: Sequelize.DECIMAL
  },
  happy: {
    type: Sequelize.DECIMAL
  },
  surprised: {
    type: Sequelize.DECIMAL
  },
  neutral: {
    type: Sequelize.DECIMAL
  },
  disgusted: {
    type: Sequelize.DECIMAL
  },
  fearful: {
    type: Sequelize.DECIMAL
  },
  angry: {
    type: Sequelize.DECIMAL
  },
  sad: {
    type: Sequelize.DECIMAL
  },
  timeStamp: {
    type: Sequelize.STRING
  }
});

const Week = db.define("week", {
  trueScore: {
    type: Sequelize.DECIMAL
  },
  happy: {
    type: Sequelize.DECIMAL
  },
  surprised: {
    type: Sequelize.DECIMAL
  },
  neutral: {
    type: Sequelize.DECIMAL
  },
  disgusted: {
    type: Sequelize.DECIMAL
  },
  fearful: {
    type: Sequelize.DECIMAL
  },
  angry: {
    type: Sequelize.DECIMAL
  },
  sad: {
    type: Sequelize.DECIMAL
  },
  timeStamp: {
    type: Sequelize.STRING
  }
});

module.exports = { Hour, Day, Week };

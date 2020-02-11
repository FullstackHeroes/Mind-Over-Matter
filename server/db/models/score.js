const Sequelize = require("sequelize");
const { db } = require("../db");

const WeightedScore = db.define("weighted", {
  trueScore: {
    type: Sequelize.FLOAT
  },
  normalizeScore: {
    type: Sequelize.FLOAT
  },
  runningScore: {
    type: Sequelize.FLOAT
  },
  sentimentDiff: {
    type: Sequelize.FLOAT
  },
  happy: {
    type: Sequelize.FLOAT
  },
  surprised: {
    type: Sequelize.FLOAT
  },
  neutral: {
    type: Sequelize.FLOAT
  },
  disgusted: {
    type: Sequelize.FLOAT
  },
  fearful: {
    type: Sequelize.FLOAT
  },
  angry: {
    type: Sequelize.FLOAT
  },
  sad: {
    type: Sequelize.FLOAT
  },
  timeStamp: {
    type: Sequelize.DATE
  },
  count: {
    type: Sequelize.INTEGER
  },
  screenScore: {
    type: Sequelize.FLOAT
  },
  screenTime: {
    type: Sequelize.FLOAT
  }
});

module.exports = { WeightedScore };

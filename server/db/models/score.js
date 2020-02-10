const Sequelize = require("sequelize");
const { db } = require("../db");

const WeightedScore = db.define("WeightedScore", {
  trueScore: {
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
    type: Sequelize.STRING
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

const NormalizeScore = db.define("normalizeScore", {
  normalizeScore: {
    type: Sequelize.FLOAT
  },
  runningScore: {
    type: Sequelize.FLOAT
  },
  sentimentDiff: {
    type: Sequelize.FLOAT
  },
  timeStamp: {
    type: Sequelize.STRING
  }
});

module.exports = { WeightedScore, NormalizeScore };

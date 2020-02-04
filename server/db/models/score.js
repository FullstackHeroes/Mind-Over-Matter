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
  },
  count: {
    type: Sequelize.DECIMAL
  },
  screenScore: {
    type: Sequelize.DECIMAL
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

const NormalizeScore = db.define("normalizeScore", {
  normalizeScore: {
    type: Sequelize.DECIMAL
  }
});

module.exports = { Hour, Day, Week, NormalizeScore };

const Sequelize = require("sequelize");
const { db } = require("../db");

const Article = db.define("article", {
  title: {
    type: Sequelize.STRING
  },
  url: {
    type: Sequelize.STRING
  }
});

module.exports = Article;

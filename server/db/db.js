const { Pool, Client } = require("pg");
const Sequelize = require("sequelize");
const pkg = require("../../package.json");
const pool = new Pool();

const databaseName =
  pkg.name + (process.env.NODE_ENV === "test" ? "-test" : "");

const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`,
  {
    logging: true
    //THE BELOW IS ONLY NEEDED TO REMOVE DEFAULT TIMESTAMP INSERTIONS BY SEQUILIZE
    // define: {
    //   timestamps: false
    // }
  }
);

module.exports = {
  db,
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  }
  //all of our routes and quieries should go here. This is an excellent place to debug.
};

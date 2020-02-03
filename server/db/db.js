const { Pool, Client } = require("pg");
const Sequelize = require("sequelize");
const pkg = require("../../package.json");
const pool = new Pool();

const databaseName =
  pkg.name + (process.env.NODE_ENV === "test" ? "-test" : "");

const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`,
  {
    logging: false
    //the below is only needed to remove default timestamp insertions by sequilize. Only reinstate if we make the transition back to raw sql
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

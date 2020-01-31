const { Pool, Client } = require("pg");

const pool = new Pool();

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  }
  //all of our routes and quieries should go here. This is an exceellent place to debug.
};

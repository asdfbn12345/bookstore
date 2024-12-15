const mariadb = require("mysql2");

module.exports = connection;

const connection = mariadb.createConnection(
  process.env.MARIADB_CONNECTION_OPTIONS
);

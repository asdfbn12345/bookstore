const dotenv = require("dotenv");
const mariadb = require("mysql2");

dotenv.config();

module.exports = connection;

const connection = mariadb.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.MARIADB_PASSWORD,
  database: "bookstore",
  dataStrings: true,
});

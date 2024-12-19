const { StatusCodes } = require("http-status-codes");
const conn = require("../databases/mariadb");

module.exports = {
  getAllCategories,
};

function getAllCategories(req, res) {
  const sql = `SELECT * FROM categories`;

  conn.query(sql, (err, result) => {
    const categories = result;
    if (err !== null) {
      res.status(StatusCodes.NOT_FOUND).end();
      return;
    }

    if (categories.length === 0) {
      res.status(StatusCodes.NOT_FOUND).end();
      return;
    }

    const categoriesObject = {
      categories: categories,
    };

    res.status(StatusCodes.OK).json(categoriesObject).end();
  });
}

const { StatusCodes } = require("http-status-codes");
const conn = require("../databases/mariadb");

module.exports = {
  getAllCategories,
};

async function getAllCategories(req, res) {
  const sql = `SELECT * FROM categories`;
  try {
    const [result] = await conn.query(sql);
    const categories = result;

    if (categories.length === 0) {
      res.status(StatusCodes.NOT_FOUND).end();
      return;
    }

    const categoriesObject = {
      categories: categories,
    };

    res.status(StatusCodes.OK).json(categoriesObject).end();
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).end();
    return;
  }
}

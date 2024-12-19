const { StatusCodes } = require("http-status-codes");
const conn = require("../databases/mariadb");
const { NEWLY_MONTH } = require("../constants/book");

module.exports = {
  getBooks,
  getBookDetail,
};

function getBooks(req, res) {
  const { category_id, newly, likes, limit, page } = req.query;

  const sql = `SELECT * FROM books JOIN categories ON books.category_id=categories.id WHERE category_id=?`;
  const values = [category_id];

  if (newly !== undefined) {
    sql += ` AND newly < CURDATE() - INTERVAL ${NEWLY_MONTH} MONTH`;
  }

  if (newly !== undefined || likes !== undefined) {
    sql += ` ORDER BY `;
    if (newly) {
      sql += `publication_date`;
    }

    if (newly && likes) {
      sql += ", ";
    }

    if (likes) {
      sql += `likes DESC`;
    }
  }

  sql += ` LIMIT ${limit} OFFSET ${page - 1}`;

  conn.query(sql, values, (err, result) => {
    const books = result;

    if (err !== null) {
      res.status(StatusCodes.BAD_REQUEST).end();
      return;
    }

    if (book.length === 0) {
      res.status(StatusCodes.NOT_FOUND).end();
      return;
    }

    const booksObject = {
      books: result,
    };

    res.status(StatusCodes.OK).json(booksObject).end();
  });
}

function getBookDetail(req, res) {
  const { id } = req.params;

  const sql = `SELECT FROM books JOIN categories ON books.category_id=categories.id WHERE id=?`;
  const values = [id];

  conn.query(sql, values, (err, result) => {
    if (err !== null) {
      res.status(StatusCodes.BAD_REQUEST).end();
      return;
    }

    const bookObject = {
      book: result,
    };

    res.status(StatusCodes.OK).json(bookObject).end();
  });
}

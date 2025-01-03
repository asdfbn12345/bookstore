const { StatusCodes } = require("http-status-codes");
const conn = require("../databases/mariadb");
const { NEWLY_MONTH } = require("../constants/book");

module.exports = {
  getBooks,
  getBookDetail,
};

async function getBooks(req, res) {
  const { categoryId, newly, likes, limit, page } = req.query;

  const likesSubQuery = `(SELECT COUNT(*) FROM likes WHERE c.book_id = b.id) AS likes`;
  const join = `JOIN categories c ON b.category_id = c.id`;
  const sql = `SELECT b.*, c.name as category_name, ${likesSubQuery}
    FROM books b
    ${join}
    WHERE b.category_id = ?`;
  const values = [categoryId];

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

  try {
    const [result] = await conn.query(sql, values);
    const books = result;

    if (books.length === 0) {
      res.status(StatusCodes.NOT_FOUND).end();
      return;
    }

    const booksObject = {
      books: result,
    };

    res.status(StatusCodes.OK).json(booksObject).end();
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).end();
    return;
  }
}

async function getBookDetail(req, res) {
  const { bookId } = req.params;
  const { userId } = req.body;

  const likesSubQuery = `(SELECT COUNT(*) FROM likes WHERE c.book_id = b.id) AS likes`;
  const likedSubQuery =
    userId === undefined
      ? ""
      : `, SELECT EXISTS(SELECT * FROM likes WHERE c.book_id = b.id AND user_id = ${userId}) AS liked`;
  const join = `JOIN categories c ON b.category_id = c.id`;
  const sql = `SELECT b.*, c.name AS category_name ${likesSubQuery} ${likedSubQuery} FROM books b ${join} WHERE b.id = ?`;
  const values = [bookId];

  try {
    const [result] = await conn.query(sql, values);
    const bookObject = {
      book: result,
    };

    res.status(StatusCodes.OK).json(bookObject).end();
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).end();
    return;
  }
}

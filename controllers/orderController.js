require("dotenv").config();
const { StatusCodes } = require("http-status-codes");
const conn = require("../databases/mariadb");
const { getUserId } = require("../authentication/jwt");

module.exports = {
  createOrder,
  getOrders,
};

async function createOrder(req, res) {
  const { address, name, contact, orderItems, payment, totalPrice } = req.body;

  try {
    const orderSql = `INSERT INTO orders (payment, total_price) VALUES (?, ?, ?, ?, ?, ?) RETURNING id`;
    const orderValues = [payment, totalPrice];
    const [orderResults] = await conn.query(orderSql, orderValues);

    const deliverySql = `INSERT INTO deliveries (order_id, address, name, contact) VALUES (?, ?, ?, ?)`;
    const deliveryValues = [orderResults.insertId, address, name, contact];
    await conn.query(deliverySql, deliveryValues);

    orderItems.forEach(async (orderItem) => {
      const orderItemSql = `INSERT INTO order_items (order_id, book_id, count) VALUES (?, ?, ?)`;
      const orderItemValues = [orderId, orderItem.bookId, orderItem.count];
      await conn.query(orderItemsSql, orderItemsValues);
    });

    res.status(StatusCodes.CREATED).end();
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).end();
    return;
  }
}

async function getOrders(req, res) {
  const userId = getUserId(req.cookie.accessToken);
  const sql = `SELECT * FROM orders WHERE id = ?`;
  const values = [userId];
  try {
    const [results] = await conn.query(sql, values);

    if (results.length === 0) {
      res.status(StatusCodes.NOT_FOUND).end();
      return;
    }

    res.status(StatusCodes.CREATED).end();
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).end();
    return;
  }
}

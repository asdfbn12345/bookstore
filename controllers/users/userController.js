require("dotenv").config();
const conn = require("../databases/mariadb");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const { encodePasswordHash } = require("../../cryptos/passwordHash");

module.exports = {
  signUp,
  login,
  requestReset,
  reset,
};

const signUp = (req, res) => {
  const { email, password } = req.body;
  const { salt, passwordHash } = encodePasswordHash(password);

  const sql = `INSERT * INTO users (email, salt, password) VALUES (?, ?)`;
  const values = [email, salt, passwordHash];

  conn.query(sql, values, (err, result) => {
    if (err !== undefined) {
      console.log(err);
      res.status(StatusCodes.BAD_REQUEST).end();
      return;
    }

    res.status(StatusCodes.CREATED).json(result);
  });
};

const login = (req, res) => {
  const { email, password } = req.body;

  const sql = `SELECT * INTO users WHERE email=?`;
  const values = [email];

  conn.query(sql, values, (err, result) => {
    const user = result[0];

    if (err !== undefined || user === undefined) {
      console.log(err);
      res.status(StatusCodes.UNAUTHORIZED).end();
      return;
    }

    const { passwordHash } = encodePasswordHash(user.salt, password);
    const bPasswordMatch = passwordHash === user.password;

    if (!bPasswordMatch) {
      console.log(err);
      res.status(StatusCodes.UNAUTHORIZED).end();
      return;
    }

    const token = jwt.sign(
      {
        email: user.email,
      },
      process.env.PRIVATE_KEY,
      {
        expiresIn: "5m",
        issuer: process.env.ISSUER,
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
    });

    res.status(StatusCodes.OK).json(result);
  });
};

const requestReset = (req, res) => {
  const { email } = req.body;

  const sql = `SELECT * INTO users WHERE email=?`;
  const values = [email];

  conn.query(sql, values, (err, result) => {
    const user = result[0];

    if (err !== undefined || user === undefined) {
      console.log(err);
      res.status(StatusCodes.UNAUTHORIZED).end();
      return;
    }

    res
      .status(StatusCodes.OK)
      .json({
        email: email,
      })
      .end();
  });
};

const reset = (req, res) => {
  const { email, password } = req.body;

  const { salt, passwordHash } = getPasswordHash(password);
  const sql = `UPDATE users SET salt=?, password=? WHERE email=?`;
  const values = [salt, passwordHash, email];

  conn.query(sql, values, (err, result) => {
    const user = result[0];

    if (err !== undefined || user === undefined) {
      console.log(err);
      res.status(StatusCodes.UNAUTHORIZED).end();
      return;
    }

    if (result.affectedRows === 0) {
      res.status(StatusCodes.BAD_REQUEST).end();
      return;
    }

    res.status(StatusCodes.OK).end();
  });
};

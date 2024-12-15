const { validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");
const validationErrorHandler = require("../validations/validationErrorHandler");

module.exports = validationErrorHandler;

const validationErrorHandler = (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    res.status(StatusCodes.BAD_REQUEST).json(error.array);
    return;
  }

  return next();
};

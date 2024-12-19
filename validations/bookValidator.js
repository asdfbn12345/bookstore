const { query } = require("express-validator");
const validationErrorHandler = require("../validations/validationErrorHandler");

module.exports = {
  getBooksValidators,
};

const getBooksValidators = [
  query("category_id")
    .notEmpty()
    .isInt()
    .withMessage("Valid category id required."),
  query("newly").isBoolean().withMessage("Valid newly value required."),
  query("likes").isBoolean().withMessage("Valid likes value required."),
  query("limit").notEmpty().isInt().withMessage("Valid limit value required."),
  query("page").notEmpty().isInt().withMessage("Valid page value required."),
  validationErrorHandler,
];

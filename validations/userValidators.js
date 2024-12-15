const { body } = require("express-validator");
const validationErrorHandler = require("../validations/validationErrorHandler");

module.exports = {
  signUpValidators,
  loginValidators,
  requestResetValidators,
  resetValidators,
};

const signUpValidators = [
  body("email").notEmpty().isEmail().withMessage("Valid email required."),
  body("password").notEmpty().isEmail().withMessage("Valid password required."),
  validationErrorHandler(),
];

const loginValidators = [
  body("email").notEmpty().isEmail().withMessage("Valid email required."),
  body("password").notEmpty().isEmail().withMessage("Valid password required."),
  validationErrorHandler(),
];

const requestResetValidators = [
  body("email").notEmpty().isEmail().withMessage("Valid email required."),
  validationErrorHandler(),
];

const resetValidators = [
  body("email").notEmpty().isEmail().withMessage("Valid email required."),
  body("password").notEmpty().isEmail().withMessage("Valid password required."),
  validationErrorHandler(),
];

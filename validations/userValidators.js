require("dotenv").config();
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
  body("password")
    .notEmpty()
    .isString()
    .isLength(process.env.PBKDF2_KEYLEN)
    .withMessage("Valid password required."),
  validationErrorHandler(),
];

const loginValidators = [
  body("email").notEmpty().isEmail().withMessage("Valid email required."),
  body("password")
    .notEmpty()
    .isString()
    .isLength(process.env.PBKDF2_KEYLEN)
    .withMessage("Valid password required."),
  validationErrorHandler(),
];

const requestResetValidators = [
  body("email").notEmpty().isEmail().withMessage("Valid email required."),
  validationErrorHandler(),
];

const resetValidators = [
  body("email").notEmpty().isEmail().withMessage("Valid email required."),
  body("password")
    .notEmpty()
    .isString()
    .isLength(process.env.PBKDF2_KEYLEN)
    .withMessage("Valid password required."),
  validationErrorHandler(),
];

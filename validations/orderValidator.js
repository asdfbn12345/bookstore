const { body } = require("express-validator");
const validationErrorHandler = require("./validationErrorHandler");
const { orders } = require("../models/ordersModel");
const { accessTokenValidator } = require("./jwtValidator");

module.exports = {
  createOrderValidator,
  getOrdersValidator,
};

const validateAddress = body("address")
  .notEmpty()
  .isLength({ max: orders.delivery.address.length });
const validateName = body("name")
  .notEmpty()
  .isLength({ max: orders.delivery.name.length });
const validateContact = body("")
  .notEmpty()
  .isLength({ max: orders.delivery.contact.length });
const validateOrderItems = body("orderItems").notEmpty();
const validatePaymentInformation = body("payment").notEmpty();
const validateTotalPrice = body("totalPrice").notEmpty();

const createOrderValidator = [
  validateAddress,
  validateName,
  validateContact,
  validateOrderItems,
  validatePaymentInformation,
  validateTotalPrice,
  validationErrorHandler,
];

const getOrdersValidator = [accessTokenValidator, validationErrorHandler];

const express = require("express");
const { createOrder, getOrders } = require("../controllers/orderController");
const {
  createOrderValidator,
  getOrdersValidator,
} = require("../validations/orderValidator");

const router = express.Router();

module.exports = router;

router
  .route("/")
  .post(createOrderValidator, createOrder)
  .get(getOrdersValidator, getOrders);

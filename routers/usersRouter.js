const express = require("express");
const {
  signUpValidators,
  loginValidators,
  requestResetValidators,
  resetValidators,
} = require("../validations/userValidators");
const {
  signUp,
  login,
  reset,
  requestReset,
} = require("../controllers/userController");

const router = express.Router();

module.exports = router;

router.route("/sign-up").post(signUpValidators, signUp);

router.route("/login").get(loginValidators, login);

router
  .route("/reset")
  .post(requestResetValidators, requestReset)
  .put(resetValidators, reset);

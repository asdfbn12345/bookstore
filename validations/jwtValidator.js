const { cookie } = require("express-validator");

module.exports = {
  accessTokenValidator,
};

const accessTokenValidator = cookie("accessToken").notEmpty().isJWT();

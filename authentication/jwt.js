const jwt = require("jsonwebtoken");

module.exports = { getUserId };

function getUserId(accessToken) {
  const parsedAccessToken = jwt.decode(accessToken);

  if (parsedAccessToken === null) {
    throw new Error("jwt decode error.");
  }

  return parsedAccessToken.userId;
}

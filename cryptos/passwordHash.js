const crypto = require("crypto");

module.exports = { encodePasswordHash };

function encodePasswordHash(salt, password) {
  if (!isValidSalt(salt)) {
    return;
  }

  const salt =
    salt === undefined ? crypto.randomBytes(64).toString("base64") : salt;
  const passwordHash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("base64");

  return { salt, passwordHash };
}

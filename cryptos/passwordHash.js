require("dotenv").config();
const crypto = require("crypto");

module.exports = { encodePasswordHash };

function encodePasswordHash(salt, password) {
  if (!isValidSalt(salt)) {
    return;
  }

  const salt =
    salt === undefined ? crypto.randomBytes(64).toString("base64") : salt;

  const iterations = process.env.PBKDF2_ITERATIONS;
  const keylen = process.env.PBKDF2_KEYLEN;
  const digest = process.env.PBKDF2_DIGEST;
  const passwordHash = crypto
    .pbkdf2Sync(password, salt, iterations, keylen, digest)
    .toString("base64");

  return { salt, passwordHash };
}

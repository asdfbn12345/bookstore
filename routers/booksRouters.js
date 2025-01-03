const express = require("express");
const { getBooksValidators } = require("../validations/bookValidator");
const { getBookDetail, getBooks } = require("../controllers/bookController");

const router = express.Router();

module.exports = router;

router.route("/").get(getBooksValidators, getBooks);
router.route("/:id").get(getBookDetail);

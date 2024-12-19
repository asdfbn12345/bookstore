const express = require("express");
const { getBooksValidators } = require("../validations/bookValidator");
const { getBookDetail } = require("../controllers/bookController");

const booksRouter = express.Router();

module.exports = booksRouter;

module.exports = router;

router.route("/").get(getBooksValidators, getBooks);
router.route("/:id").get(getBookDetail);

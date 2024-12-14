require("dotenv").config();
const express = require("express");
const usersRouter = require("./routers/usersRouter");
const ordersRouter = require("./routers/ordersRouters");
const booksRouter = require("./routers/booksRouters");

const app = express();

app.use(express.json());

app.use("/users", usersRouter);
app.use("/books", booksRouter);
app.use("/orders", ordersRouter);

app.listen(process.env.PORT);

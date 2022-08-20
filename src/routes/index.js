const express = require("express");
const bodyParser = require("body-parser");

const userRouter = require("./user");
const adminRouter = require("./admin");
const productRouter = require("./product");
const cartRouter = require("./cart");
const orderRouter = require("./order");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", userRouter);
app.use("/admin", adminRouter);
app.use("/product", productRouter);
app.use("/cart", cartRouter);
app.use("/order", orderRouter);

app.get("/", (req, res) => {
  res.send("welcome to foodelo");
});

module.exports = app;

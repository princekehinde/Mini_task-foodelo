const express = require("express");
const Validator = require("../validation/product");
const Controller = require("../controller/product");
const Middleware = require("../middleware/auth-middleware");

const router = express();

router.post(
  "/",
  Middleware.isAdminAuthenticated,
  Validator.createProductForm,
  Controller.createProduct
);

router.get("/", Controller.getProducts);

router.get("/:id", Validator.getProductById, Controller.getProductById);

module.exports = router;

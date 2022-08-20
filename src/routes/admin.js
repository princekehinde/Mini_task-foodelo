const express = require("express");
const Validator = require("../validation/admin");
const Controller = require("../controller/admin");

const router = express();

router.post("/login", Validator.loginForm, Controller.login);

module.exports = router;

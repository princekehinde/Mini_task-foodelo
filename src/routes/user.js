const express = require("express");
const userValidator = require("./../validation/user");
const UserController = require("../controller/user");
const Middleware = require("../middleware/auth-middleware");

const router = express.Router();

router.post(
  "/register",
  userValidator.registerAndLoginForm,
  UserController.register
);

router.post("/login", userValidator.registerAndLoginForm, UserController.login);

router.put(
  "/change-password",
  Middleware.isUserAuthenticated,
  userValidator.changePasswordForm,
  UserController.changePassword
);

router.get(
  "/forget-password",
  userValidator.forgetPasswordForm,
  UserController.forgetPassword
);

router.put(
  "/reset-password",
  userValidator.resetPasswordForm,
  UserController.resetPassword
);

module.exports = router;

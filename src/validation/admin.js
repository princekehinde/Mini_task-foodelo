const Joi = require("joi");
const { errorResponse } = require("../utils/response");

class AdminValidation {
  static async loginForm(req, res, next) {
    try {
      const loginFormSchema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required(),
      });
      await loginFormSchema.validateAsync(req.body, {
        abortEarly: false,
      });
      next();
    } catch (error) {
      return errorResponse(res, 400, error.message);
    }
  }
}
module.exports = AdminValidation;

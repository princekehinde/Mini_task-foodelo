const Joi = require("joi");
const { errorResponse } = require("../utils/response");

class OrderValidation {
  static async validateOrderId(req, res, next) {
    try {
      const orderIdSchema = Joi.object().keys({
        id: Joi.string().required(),
      });

      await orderIdSchema.validateAsync(req.params, {
        abortEarly: false,
      });
      next();
    } catch (error) {
      return errorResponse(res, 400, error.message);
    }
  }
}
module.exports = OrderValidation;

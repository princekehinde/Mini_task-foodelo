const Joi = require("joi");
const { errorResponse } = require("../utils/response");

class CartValidation {
  static async createCartForm(req, res, next) {
    try {
      const createCartSchema = Joi.object({
        productId: Joi.string().required(),
        quantity: Joi.number().default(1),
      });
      await createCartSchema.validateAsync(req.body, {
        abortEarly: false,
      });
      next();
    } catch (error) {
      return errorResponse(res, 400, error.message);
    }
  }
}
module.exports = CartValidation;

const Joi = require("joi");
const { errorResponse } = require("../utils/response");

class ProductValidation {
  static async createProductForm(req, res, next) {
    try {
      const createProductSchema = Joi.object({
        name: Joi.string().required(),
        price: Joi.number().required(),
        description: Joi.string().required(),
        image: Joi.string().required(),
      });

      await createProductSchema.validateAsync(req.body, {
        abortEarly: false,
      });
      next();
    } catch (error) {
      return errorResponse(res, 400, error.message);
    }
  }

  static async getProductById(req, res, next) {
    try {
      const getProductsSchema = Joi.object().keys({
        id: Joi.string().required(),
      });

      await getProductsSchema.validateAsync(req.params, {
        abortEarly: false,
      });
      next();
    } catch (error) {
      return errorResponse(res, 400, error.message);
    }
  }
}
module.exports = ProductValidation;

const ProductManager = require("../modules/product-manager");
const {
  successResponse,
  errorResponse,
  paginationSuccessResponse,
} = require("../utils/response");

class ProductController {
  static async createProduct(req, res) {
    try {
      const result = await ProductManager.createProduct(req.body);

      if (result.statusCode === 400)
        return errorResponse(res, result.message, result.statusCode);

      return successResponse(
        res,
        result.statusCode,
        result.message,
        result.data
      );
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  }

  static async getProducts(req, res) {
    try {
      const result = await ProductManager.getProducts(req.query);

      console.log(result);

      return paginationSuccessResponse(
        res,
        result.statusCode,
        result.message,
        result.data
      );
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  }

  static async getProductById(req, res) {
    try {
      const result = await ProductManager.getProductById(req.params);

      return successResponse(
        res,
        result.statusCode,
        result.message,
        result.data
      );
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  }
}
module.exports = ProductController;

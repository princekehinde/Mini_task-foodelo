const user = require("../model/user");
const CartManager = require("../modules/cart-manager");
const {
  successResponse,
  errorResponse,
  paginationSuccessResponse,
} = require("../utils/response");

class CartController {
  static async createCart(req, res) {
    try {
      req.body.userId = req.user.id;
      const result = await CartManager.createCart(req.body);

      if (result.statusCode === 400)
        return errorResponse(res, result.statusCode, result.message);

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

  static async increaseCartItemQuantity(req, res) {
    try {
      req.params.userId = req.user.id;
      console.log(req.params, "req.params");
      const result = await CartManager.increaseCartItemQuantity(req.params);

      if (result.statusCode === 400)
        return errorResponse(res, result.statusCode, result.message);

      return successResponse(
        res,
        result.statusCode,
        result.message,
        result.data
      );
    } catch (error) {
      return errorResponse(res, 500, "Oops! Something went wrong");
    }
  }

  static async decreaseCartItemQuantity(req, res) {
    try {
      req.params.userId = req.user.id;
      console.log(req.params, "req.params");
      const result = await CartManager.decreaseCartItemQuantity(req.params);

      if (result.statusCode === 400)
        return errorResponse(res, result.statusCode, result.message);

      return successResponse(
        res,
        result.statusCode,
        result.message,
        result.data
      );
    } catch (error) {
      return errorResponse(res, 500, "Oops! Something went wrong");
    }
  }

  static async deleteCartItem(req, res) {
    try {
      req.params.userId = req.user.id;
      const result = await CartManager.deleteCartItem(req.params);

      if (result.statusCode === 400)
        return errorResponse(res, result.statusCode, result.message);

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

  static async getCartItems(req, res) {
    try {
      req.params.userId = req.user.id;
      const result = await CartManager.getCartItems(req.params);
      if (result.statusCode === 400)
        return errorResponse(res, result.statusCode, result.message);
      return paginationSuccessResponse(
        res,
        result.statusCode,
        result.message,
        result.data
      );
    } catch (error) {
      return errorResponse(res, 500, "Oops! Something went wrong");
    }
  }
}
module.exports = CartController;

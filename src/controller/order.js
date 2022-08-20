const OrderManager = require("../modules/order-manager");
const {
  successResponse,
  errorResponse,
  paginationSuccessResponse,
} = require("../utils/response");

class OrderController {
  static async processOrder(req, res) {
    try {
      req.body.userId = req.user.id;
      const result = await OrderManager.processOrder(req.body);

      if (result.statusCode === 400)
        return errorResponse(res, result.statusCode, result.message);

      return successResponse(
        res,
        result.statusCode,
        result.message,
        result.data
      );
    } catch (error) {
      return errorResponse(res, 400, error.message);
    }
  }

  static async getAllOrders(req, res) {
    try {
      req.query.userId = req.user.id;
      const result = await OrderManager.getAllOrders(req.query);

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

  static async getOrderById(req, res) {
    try {
      console.log(req.params, "req.params");

      req.params.userId = req.user.id;
      const result = await OrderManager.getOrderById(req.params);

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
}

module.exports = OrderController;

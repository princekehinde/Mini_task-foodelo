const AdminManager = require("../modules/admin-manager");
const {
  successResponse,
  errorResponse,
  paginationSuccessResponse,
} = require("../utils/response");

class AdminController {
  static async login(req, res) {
    try {
      // NOTE : only login functionality for super admin is implemented
      const result = await AdminManager.adminLogin(req.body);
      if (result.statusCode === 404 || result.statusCode === 400)
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
}
module.exports = AdminController;

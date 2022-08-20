const { decodeToken } = require("../utils/jwt");
const { decodeAdminToken } = require("../utils/jwt-admin");
const { errorResponse } = require("../utils/response");

async function isUserAuthenticated(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return errorResponse(res, 499, "Token required");
  }

  const user = await decodeToken(authorization);

  if (!user || user.statusCode === 401)
    return errorResponse(res, 401, "Invalid user token");

  req.user = user;
  return next();
}

async function isAdminAuthenticated(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return errorResponse(res, 499, "Token required");
  }

  const admin = await decodeAdminToken(authorization);

  if (!admin || admin.statusCode === 401)
    return errorResponse(res, 401, "Invalid user token");

  req.admin = admin;
  return next();
}

module.exports = {
  isUserAuthenticated,
  isAdminAuthenticated,
};

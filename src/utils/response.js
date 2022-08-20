/**
 * The success response function
 * @param {Object} res - Express response object
 * @param {Number} statusCode - HTTP status code
 * @param {String} message - Message to be displayed
 * @param {Object} data - Data to be returned
 */
const successResponse = (res, statusCode, message, data) => {
  const response = {
    meta: { statusCode, message },
    error: false,
    data,
  };
  return res.status(statusCode).json(response);
};

const paginationSuccessResponse = (
  res,
  statusCode,
  message,
  data,
  paginationMeta
) => {
  const response = {
    meta: { statusCode, message, ...paginationMeta },
    error: false,
    data,
  };
  return res.status(statusCode).json(response);
};

const errorResponse = (res, statusCode, message, errors = [], errorCode) => {
  const response = {
    meta: { statusCode, message },
    error: true,
    errors: errors,
  };
  return res.status(statusCode).json(response);
};

module.exports = {
  successResponse,
  errorResponse,
  paginationSuccessResponse,
};

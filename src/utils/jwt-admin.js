/* eslint-disable no-underscore-dangle */
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const UserModel = require("../model/user");
const AdminManager = require("../modules/admin-manager");

dotenv.config();
async function generateAdminToken(email) {
  const payload = {
    subject: email,
  };

  const options = {
    expiresIn: "1d",
  };
  try {
    const token = await jwt.sign(payload, process.env.JWT_SECRET, options);
    return token;
  } catch (error) {
    return error.message;
  }
}

async function decodeAdminToken(token) {
  try {
    const { ADMIN } = process.env;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // check if the token is not for the super admin
    if (decoded.subject !== ADMIN) {
      return {
        statusCode: 401,
        message: "Unauthorized",
      };
    }

    return { email: decoded.subject };
  } catch (error) {
    return null;
  }
}

module.exports = {
  generateAdminToken,
  decodeAdminToken,
};

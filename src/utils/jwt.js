/* eslint-disable no-underscore-dangle */
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const UserModel = require("../model/user");
const AdminManager = require("../modules/admin-manager");

dotenv.config();

class JWT {
  /**
   * generate an access token for authorized user
   * @param {Object} user - The user object
   * @returns {String} - The user token
   */
  static async generateToken(data, superAdmin = false) {
    let payload;

    if (!superAdmin) {
      payload = {
        subject: user.id,
      };
    } else {
      payload = {
        subject: user,
      };
    }

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

  /**
   * Validate userToken and see if they exist
   * @param {String} decoded.subject - The user Id
   * @returns {User} - The userInformation token or null
   */
  static async decodeToken(token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await UserModel.findById(decoded.subject);
      if (!user) {
        return {
          statusCode: 401,
          message: "Invalid token",
        };
      }
      return user;
    } catch (error) {
      return null;
    }
  }
}

module.exports = JWT;

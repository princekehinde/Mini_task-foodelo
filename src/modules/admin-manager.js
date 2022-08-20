const dotenv = require("dotenv");
const JWTAdmin = require("./../utils/jwt-admin");

dotenv.config();

class AdminManager {
  /**
   * @description - This method is used to login the super admin
   * @param {string} email the email of the super admin
   * @param {string} password the password of the super admin
   */

  static async adminLogin(data) {
    const { ADMIN, ADMIN_PASSWORD } = process.env;
    const { email, password } = data;

    // return error if email or password does not match
    if (email !== ADMIN || password !== ADMIN_PASSWORD)
      return {
        statusCode: 400,
        message: "Invalid email or password",
      };

    // generate token for the super admin
    const token = await JWTAdmin.generateAdminToken(email, true);
    return {
      statusCode: 200,
      message: "Login successful",
      data: {
        admin: { firstName: "Super", lastName: "Admin", email: email },
        token,
      },
    };
  }
}

module.exports = AdminManager;

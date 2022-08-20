const bcrypt = require("bcryptjs");
const jwt = require("./../utils/jwt");
const UserModel = require("./../model/user");
const EmailService = require("../utils/node-mail");

class UserManager {
  constructor() {}

  static userResponse = (data) => {
    return {
      email: data.email,
      username: data.username,
      id: data.id,
    };
  };

  /**
   * @param {string} username the username of the user
   * @param {string} email the email of the user
   * @param {string} password the password of the user
   */

  static async register(data) {
    try {
      const { email, username, password } = data;

      const user = await UserModel.findOne({
        $or: [
          { email: email.toLowerCase() },
          { username: username.toLowerCase() },
        ],
      });

      if (user)
        return {
          statusCode: 400,
          message: "User already exists",
        };

      const hashPassword = await bcrypt.hashSync(password, 10);

      const createUser = await UserModel.create({
        email: email.toLowerCase(),
        username: username.toLowerCase(),
        password: hashPassword,
      });

      return {
        statusCode: 200,
        message: "User created successfully",
        data: await UserManager.userResponse(createUser),
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * @description - This method is used to login a user
   * @param {object} data - The data of the user
   * @returns {object} - The response of the user
   */
  static async login(data) {
    const { email, password } = data;
    const user = await UserModel.findOne({ email: email.toLowerCase() });
    if (!user)
      return {
        statusCode: 404,
        message: "User not found",
      };

    const isPasswordValid = await bcrypt.compareSync(password, user.password);
    if (!isPasswordValid)
      return {
        statusCode: 401,
        message: "Invalid password",
      };

    const token = await jwt.generateToken(user);
    return {
      statusCode: 200,
      message: "Login successful",
      data: {
        token,
        user: await UserManager.userResponse(user),
      },
    };
  }

  /**
   * @description - This method is used to change the password of a user
   * @param {object} data - The data of the user
   * @returns {object} - The response of the user
   */
  static async changePassword(data) {
    const { oldPassword, newPassword } = data;
    const user = await UserModel.findById(data.id);

    // update password if old password is valid
    const isPasswordValid = await bcrypt.compareSync(
      oldPassword,
      user.password
    );
    if (!isPasswordValid)
      return {
        statusCode: 401,
        message: "Invalid password",
      };

    const hashPassword = await bcrypt.hashSync(newPassword, 10);
    await UserModel.findByIdAndUpdate(data.id, { password: hashPassword });

    return {
      statusCode: 200,
      message: "Password changed successfully",
    };
  }

  /**
   * @description - This method is used to send mail for forget password
   * @param {object} data - The data of the user
   * @returns {object} - The response of the user
   */
  static async forgetPassword(data) {
    console.log(data, "data");
    const { email } = data;
    const user = await UserModel.findOne({ email: email.toLowerCase() });
    if (!user)
      return {
        statusCode: 404,
        message: "User not found",
      };

    const token = await jwt.generateToken(user);
    const url = `http://localhost:3000/reset-password/${token}`;
    const message = `<p>Click <a href="${url}">here</a> to reset your password</p>`;
    const mailSent = await EmailService.sendMail(
      email,
      "Reset Password",
      message
    );

    if (!mailSent)
      // update reset password token with default number
      await UserModel.findOneAndUpdate(
        { email },
        { $set: { resetPasswordToken: "1234" } }
      );

    return {
      statusCode: 200,
      message: "Email sent successfully",
    };
  }

  /**
   * @description - This method is used to reset the password of a user
   * @param {object} data - The data of the user
   * @returns {object} - The response of the user
   */
  static async resetPassword(data) {
    const { email, password, token } = data;
    const user = await UserModel.findOne({ email });
    if (!user)
      return {
        statusCode: 404,
        message: "User not found",
      };

    // if no token is in the db
    if (!user.resetPasswordToken || user.resetPasswordToken === "")
      return {
        statusCode: 400,
        message: "please initiate the reset password process",
      };

    // if token is not equal to the token in the database
    if (user.resetPasswordToken !== token) {
      // increment the reset password token
      user.no_of_tries = user.no_of_tries + 1;
      return {
        statusCode: 401,
        message: "Invalid token",
      };
    }

    const hashPassword = await bcrypt.hashSync(password, 10);
    await UserModel.findOneAndUpdate(
      { resetPasswordToken: token },
      {
        $set: {
          password: hashPassword,
          resetPasswordToken: "",
          no_of_tries: 0,
        },
      }
    );

    return {
      statusCode: 200,
      message: "Password changed successfully",
    };
  }
}

module.exports = UserManager;

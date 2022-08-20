const dotenv = require("dotenv");
const nock = require("nock");
const axios = require("axios");
const CartModel = require("../model/cart");
const UserModel = require("../model/user");
const OrderModel = require("../model/order");
dotenv.config();

class OrderManager {
  /**
   * @description - This method would use nock to mock a payment gateway
   * @param {Object} data - The data to be created
   * @returns {Object} - The data of the nock response
   */
  static async makePayment(data) {
    try {
      const { amount, email } = data;

      const mockResponse = {
        statusCode: 200,
        message: "Payment successful",
        data: {
          paymentId: "12345",
          amount,
          paymentGateway: "xyz.com",
          paymentStatus: "success",
        },
      };

      nock(process.env.PAYMENT_GATEWAY_URL)
        .post("/payment", {
          amount,
          email,
        })
        .reply(200, mockResponse);

      return mockResponse;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * @description - This method is used to process an order in cart
   * @param {Object} data - The data of the order
   * @returns {Object} - The response of the order
   */
  static async processOrder(data) {
    // NOTE: This is a temporary solution to process an order in cart
    const { userId } = data;
    const cartItems = await CartModel.find({ userId }).populate("productId");
    if (!cartItems.length)
      return {
        statusCode: 400,
        message: "Cart is empty",
      };

    console.log(cartItems, "cartItems");

    const totalPrice = cartItems.reduce((acc, item) => {
      return acc + item.quantity * item.productId.price;
    }, 0);

    const user = await UserModel.findById(userId);

    const order = await OrderModel.create({
      userId,
      items: cartItems,
      total: totalPrice,
    });

    const payment = await OrderManager.makePayment({
      amount: totalPrice,
      email: user.email,
    });
    console.log(payment, "payment");
    if (payment.statusCode !== 200) {
      await OrderModel.findByIdAndUpdate(
        order._id,
        {
          paymentStatus: "FAILED",
        },
        { new: true }
      );

      return {
        statusCode: 400,
        message: "Payment failed",
      };
    }

    // update the order with payment details

    const updatedOrder = await OrderModel.findByIdAndUpdate(
      order._id,
      {
        paymentId: payment.data.paymentId,
        paymentStatus: "SUCCESS",
        status: "paymentCompleted",
      },
      { new: true }
    );

    // delete all the cart items
    await CartModel.deleteMany({ userId });

    return {
      statusCode: 200,
      message: "Order processed",
      data: updatedOrder,
    };
  }

  /**
   * @description - This method is get all orders
   * @param {Object} data - The data of the order
   * @returns {Object} - The response of the order
   */
  static async getAllOrders(data) {
    const { userId, page, limit } = data;
    const pageQuery = {
      page: page ? page : 1,
      limit: limit ? limit : 10,
    };
    const orders = await OrderModel.paginate({ userId }, pageQuery);

    return {
      statusCode: 200,
      message: "Orders retrieved successfully",
      data: orders,
    };
  }

  /**
   * @description - This method is used to get an order by id
   * @param {Object} data - The data of the order
   * @returns {Object} - The response of the order
   */
  static async getOrderById(data) {
    const { id, userId } = data;
    console.log(data, "data");
    const order = await OrderModel.findOne({ _id: id, userId });

    if (!order)
      return {
        statusCode: 400,
        message: "Order not found",
      };

    return {
      statusCode: 200,
      message: "Order retrieved successfully",
      data: order,
    };
  }
}

module.exports = OrderManager;

const { parse } = require("dotenv");
const ProductModel = require("./../model/product");

class ProductManager {
  /**
   * @description - This method is used to create a new product
   * @param {Object} data - The data to be created
   * @returns {Object} - The created product
   */
  static async createProduct(data) {
    const { name, price, description, image } = data;

    const product = await ProductModel.findOne({ name });

    if (product)
      return {
        statusCode: 400,
        message: "Product already exists",
      };

    const createProduct = await ProductModel.create({
      name,
      price,
      description,
      image,
    });

    return {
      statusCode: 201,
      message: "Product created successfully",
      data: createProduct,
    };
  }

  /**
   * @description - This method is used to get all products
   * @param {Object} query - The query to be used
   * @returns {Object} - The response of the products
   */
  static async getProducts(data) {
    const { page, limit } = data;

    const pageQuery = {
      page: page ? parseInt(page) : 1,
      limit: limit ? parseInt(limit) : 10,
    };

    const products = await ProductModel.paginate({}, pageQuery);

    return {
      statusCode: 200,
      message: "Products retrieved successfully",
      data: products,
    };
  }

  /**
   * @description - This method is used to get a product by id
   * @param {Object} query - The query to be used
   * @returns {Object} - The response of the product
   */

  static async getProductById(data) {
    const { id } = data;

    const product = await ProductModel.findById(id);

    if (!product)
      return {
        statusCode: 404,
        message: "Product not found",
      };

    return {
      statusCode: 200,
      message: "Product retrieved successfully",
      data: product,
    };
  }
}

module.exports = ProductManager;

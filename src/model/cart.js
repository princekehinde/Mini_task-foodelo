const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const CartSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    quantity: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

CartSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Cart", CartSchema);

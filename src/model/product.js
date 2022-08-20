const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

productSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Product", productSchema);

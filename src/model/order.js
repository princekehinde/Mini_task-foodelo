const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    items: [
      {
        type: Object,
        required: true,
      },
    ],
    total: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["PENDING", "SUCCESS", "FAILED"],
      default: "PENDING",
    },
    paymentId: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "paymentCompleted", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

OrderSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Order", OrderSchema);

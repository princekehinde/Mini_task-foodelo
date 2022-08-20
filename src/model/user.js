const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    resetPasswordToken: {
      type: String,
    },
    no_of_tries: {
      default: 0,
      type: Number,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);

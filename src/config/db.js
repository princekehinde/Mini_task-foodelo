const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

let mongoUrl = null;

const mongoConnection = () => {
  if (process.env.NODE_ENV === "diva cake") {
    mongoUrl = TEST_DB || "mongodb://localhost:27017";
  } else {
    mongoUrl = process.env.DATABASE_URI;
  }
  return mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = mongoConnection;

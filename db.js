const mongoose = require("mongoose");
require("dotenv").config();

const mongoUrl = process.env.mongoUrl;
const connection = mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.error("Database connection error:", error);
    process.exit(1); // Terminate the application upon connection error
  });

module.exports = { connection };

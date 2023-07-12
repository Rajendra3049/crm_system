const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const { connection } = require("./db");
const { employeeRoute } = require("./routes/employee.route");
const { enquiryRoute } = require("./routes/enquiry.route");

app.use(cors());
app.use(express.json());

app.get("/ping", function (req, res) {
  try {
    res.status(200).json("pong");
  } catch (error) {
    res.status(500).json({ status: "error", message: "Server error" });
  }
});

app.use("/employee", employeeRoute);
app.use("/enquiry", enquiryRoute);

app.listen(process.env.PORT || 3000, async () => {
  await connection;
});

const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { employeeModal } = require("../models/employee");

const employeeRoute = express.Router();

employeeRoute.post("/register", async function (req, res) {
  const { name, email, password } = req.body;

  try {
    let found = await employeeModal.findOne({ email });
    if (found) {
      res.status(200).json("employee already registered");
    } else {
      const hash = await bcrypt.hash(password, 10);
      const newEmployee = await employeeModal.create({
        name: name,
        email: email,
        password: hash,
      });
      res.send({ msg: "registration successful" });
    }
  } catch (error) {
    res.status(500).json({ error: error, message: "error in registration" });
  }
});

employeeRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const employee = await employeeModal.findOne({ email: email });
    if (employee) {
      bcrypt.compare(password, employee.password, function (err, result) {
        if (result) {
          let token = jwt.sign({ foo: "bar", employeeID: employee._id }, "crm");
          res.send({
            msg: "Login successful",
            token: token,
          });
        } else {
          res.send({ msg: "Wrong Credentials" });
        }
      });
    } else {
      res.send({ msg: "employee not found" });
    }
  } catch (error) {
    res.status(500).json({ status: "error", message: "error in login" });
  }
});

module.exports = { employeeRoute };

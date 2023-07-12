const mongoose = require("mongoose");
const { employeeSchema } = require("../schema/employee.schema");

const employeeModal = mongoose.model("employee", employeeSchema);

module.exports = { employeeModal };

const mongoose = require("mongoose");
const enquirySchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  course_interest: { type: String, required: true },
  claim_status: Boolean,
  employeeID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "employees",
  },
});

module.exports = { enquirySchema };

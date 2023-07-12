const mongoose = require("mongoose");
const { enquirySchema } = require("../schema/enquiry.schema");

const enquiryModal = mongoose.model("enquiry", enquirySchema);

module.exports = { enquiryModal };

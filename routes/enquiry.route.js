const express = require("express");
const { enquiryModal } = require("../models/enquiry.modal");
const enquiryRoute = express.Router();
const { employeeAuth } = require("../middlewares/middleware");

// get all unclaimed
enquiryRoute.get("/", employeeAuth, async function (req, res) {
  try {
    let data = await enquiryModal.find({ claim_status: false });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      error: error,
      message: "error while getting all unclaimed enquiry",
    });
  }
});

// get all claimed by current employee
enquiryRoute.get("/claimed", employeeAuth, async function (req, res) {
  const { employeeID } = req.body;
  try {
    let data = await enquiryModal.find({ claim_status: true, employeeID });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      error: error,
      message:
        "error while getting all claimed enquiry by current logged-in employee",
    });
  }
});

// public enquiry from
enquiryRoute.post("/create", async function (req, res) {
  let newEnquiry = { ...req.body, claim_status: false };
  try {
    enquiryModal.create(newEnquiry);
    res
      .status(200)
      .json({ msg: "enquiry created successfully", enquiry: newEnquiry });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: error, message: "error while creating enquiry 2" });
  }
});

// claimed by the employee
enquiryRoute.patch("/claim/:id", employeeAuth, async function (req, res) {
  const _id = req.params.id;
  try {
    await enquiryModal.findByIdAndUpdate(_id, {
      ...req.body,
      claim_status: true,
    });
    res.status(200).json({ msg: "enquiry claimed successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: error, message: "error while creating enquiry 2" });
  }
});

module.exports = { enquiryRoute };

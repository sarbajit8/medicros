const mongoose = require("mongoose");

const EmployeeCustomer = new mongoose.Schema(
  {
    name: String,
    employeeid: String,
    mobile: String,
    email: String,
    shopname: String,
    address: String,
    gst: String,
    dl: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("EmployeeCustomer", EmployeeCustomer);
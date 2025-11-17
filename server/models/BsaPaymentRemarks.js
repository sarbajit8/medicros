const mongoose = require("mongoose");

const BsaPaymentRemarksSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    accounremarks: {
      type: String,
      default: "",
    },
    accountamount: {
      type: String,
      default: "",
    },
    casshremarks: {
      type: String,
      default: "",
    },
    qrremarks: {
      type: String,
      default: "",
    },
    btremarks: {
      type: String,
      default: "",
    },
    msremarks: {
      type: String,
      default: "",
    },
    ppremarks: {
      type: String,
      default: "",
    },
    cpremarks: {
      type: String,
      default: "",
    },
    chequestatus: {
      type: String,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("BsaPaymentRemarks", BsaPaymentRemarksSchema);

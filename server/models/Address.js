const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema(
  {
    userId: String,
    address: String,
    city: String,
    pincode: String,
    phone: String,
    deagLicence: String,
    notes: String,
    name: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Address", AddressSchema);

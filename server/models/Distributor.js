const mongoose = require("mongoose");

const DistributorSchema = new mongoose.Schema(
  { image: { type: String, required: true },
    name: { type: String, required: true },
    companyname: { type: String, required: true }, // ✅ Added
    username: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    pin: { type: String, required: true },
    gst: { type: String, required: true },          // ✅ Added
    dl: { type: String, required: true },           // ✅ Added
    email: { type: String, required: true },        // ✅ Added
    mobile: { type: String, required: true },
  }
);

module.exports = mongoose.model("Distributor", DistributorSchema);

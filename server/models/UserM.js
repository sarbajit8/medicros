const mongoose = require("mongoose");

const userMSchema = new mongoose.Schema({
  name: { type: String },
  email:{type: String}, 
  businessname:{type: String},
  mobile: { type: String, required: true, unique: true },
  otp: { type: String },
  isVerified: { type: Boolean, default: false },
});

module.exports = mongoose.model("UserM", userMSchema);

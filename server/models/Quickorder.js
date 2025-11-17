
const mongoose = require("mongoose");

const QuickOrderSchema = new mongoose.Schema(
  {
    name: String,
    shopname: String,
    gst: String,
    dl: String,
    phone: Number,
    address: String,
    requirement:String,
   

  },
  { timestamps: true }
);

module.exports = mongoose.model("QuickOrder", QuickOrderSchema);
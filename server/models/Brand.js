const mongoose = require("mongoose");

const BrandSchema = new mongoose.Schema(
  {
    image: String,
    name: String,
    type: String,
    type2: String,

  },
  { timestamps: true }
);

module.exports = mongoose.model("Brand", BrandSchema);
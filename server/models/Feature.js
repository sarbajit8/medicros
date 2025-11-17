const mongoose = require("mongoose");

const FeatureSchema = new mongoose.Schema(
  {
    image: String,
    text: String,

  },
  { timestamps: true }
);

module.exports = mongoose.model("Feature", FeatureSchema);

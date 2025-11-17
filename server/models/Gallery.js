const mongoose = require("mongoose");

const GallerySchema = new mongoose.Schema(
  {
    title: String,
    designation: String,
    image: String,
    type: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Gallery", GallerySchema);

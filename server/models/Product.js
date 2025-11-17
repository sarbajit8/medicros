const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    image: String,
    image1: String,
    image2: String,
    image3: String,
    image4: String,
    title: String,
    description: String,
    category: String,
    brand: String,
    price: Number,
    salePrice: Number,
    totalStock: Number,
    averageReview: Number,
    freescheme: String,
    margin: String,
    discount: Number,
    slider: String,
    composition: String,
    productquantity: String,
    mrp: String,
    packof: String,
    



  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
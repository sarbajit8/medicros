const mongoose = require("mongoose");

const PcdOrderSchema = new mongoose.Schema({
  userId: String,
  cartId: String,
  distributorCartItems: [
    {
      productId: String,
      title: String,
      pcdName: String,
      quantity: Number,
      productprice: Number,
    },
  ],
  addressInfo: {
    addressId: String,
    address: String,
    city: String,
    pincode: String,
    phone: String,
    notes: String,
  },
  orderStatus: String,
  deliveryboy: String,
  paymentMethod: String,
  paymentStatus: String,
  totalAmount: String,
  orderDate: Date,
  orderUpdateDate: Date,
  paymentId: String,
  due:String,
});

module.exports = mongoose.model("PcdOrder", PcdOrderSchema);

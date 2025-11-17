const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: String,
  cartId: String,
  cartItems: [
    {
      productId: String,
      title: String,
      image: String,
      price: String,
      quantity: Number,
      freescheme:String,
      margin: String,
      discount: String,
      mrp: String,
      packof: String,
      productquantity: String,
    },
  ],
  addressInfo: {
    name: String,
    addressId: String,
    address: String,
    city: String,
    pincode: String,
    phone: String,
    notes: String,
  },
  deliveryboy: String,
  orderStatus: String,
  paymentMethod: String,
  paymentStatus: String,
  totalAmount: Number,
  orderDate: Date,
  orderUpdateDate: Date,
  paymentId: String,
  payerId: String,
  rozorpay_signature: String,
  due:String
});

module.exports = mongoose.model("Order", OrderSchema);

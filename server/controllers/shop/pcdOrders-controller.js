const PcdOrder = require("../../models/PcdOrders");
const PcdCart = require("../../models/PcdCart");
const PcdProduct = require("../../models/PcdProducts");

// Create new COD PCD Order
const createPcdOrderCod = async (req, res) => {
  try {
    const {
      userId,
      pcdCartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId,
      payerId,
      cartId,
    } = req.body;

    const newOrder = new PcdOrder({
      userId,
      distributorCartItems: pcdCartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId,
      payerId,
      cartId,
    });

    await newOrder.save();

    res.status(201).json({
      success: true,
      orderId: newOrder._id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

// Confirm PCD COD Order
const capturePcdCodOrder = async (req, res) => {
  try {
    const { orderId } = req.body;

    const order = await PcdOrder.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    for (let item of order.distributorCartItems) {
      const product = await PcdProduct.findById(item.productId);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product not found: ${item.title}`,
        });
      }
      product.totalStock -= item.quantity;
      await product.save();
    }

    await PcdCart.findByIdAndDelete(order.cartId);

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order confirmed",
      data: order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

// Get all orders by user
const getAllPcdOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await PcdOrder.find({ userId });

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found!",
        data: "newuse",
      });
    }

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

// Get single order by ID
const getPcdOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await PcdOrder.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

module.exports = {
  createPcdOrderCod,
  capturePcdCodOrder,
  getAllPcdOrdersByUser,
  getPcdOrderDetails,
};

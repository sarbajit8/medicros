const Order = require("../../models/PcdOrders");

const getAllPcdOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    if (!orders.length) {
      return res.status(404).json({ success: false, message: "No orders found!" });
    }
    res.status(200).json({ success: true, data: orders });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, message: "Some error occurred!" });
  }
};

const getPcdOrderDetailsForAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found!" });
    }
    res.status(200).json({ success: true, data: order });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, message: "Some error occurred!" });
  }
};

const updatePcdOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found!" });
    }
    await Order.findByIdAndUpdate(id, { orderStatus });
    res.status(200).json({ success: true, message: "Order status updated successfully!" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, message: "Some error occurred!" });
  }
};

const updatePcdOrderProductPrice = async (req, res) => {
  try {
    const { orderId, productId } = req.params;
    const { productprice } = req.body;

    if (!productprice || isNaN(productprice)) {
      return res.status(400).json({ success: false, message: "Invalid product price provided!" });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found!" });
    }

    const product = order.distributorCartItems.find(item => item.productId === productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found in this order!" });
    }

    product.productprice = productprice;
    await order.save();

    res.status(200).json({ success: true, message: "Product price updated successfully!", data: order });
  } catch (error) {
    console.error("Error in updatePcdOrderProductPrice:", error);
    res.status(500).json({ success: false, message: "Error updating product price!" });
  }
};

const updatePcdOrderTotalAmount = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { totalAmount } = req.body;

    if (!totalAmount || isNaN(totalAmount) || totalAmount <= 0) {
      return res.status(400).json({ success: false, message: "Invalid total amount provided!" });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found!" });
    }

    order.totalAmount = totalAmount;
    await order.save();

    res.status(200).json({ success: true, message: "Total amount updated successfully!", data: order });
  } catch (error) {
    console.error("Error in updatePcdOrderTotalAmount:", error);
    res.status(500).json({ success: false, message: "Error updating total amount!" });
  }
};

const updatePcdDeliveryBoy = async (req, res) => {
  try {
    const { id } = req.params;
    const { deliveryboy } = req.body;

    if (!deliveryboy || typeof deliveryboy !== "string" || deliveryboy.trim() === "") {
      return res.status(400).json({ success: false, message: "Invalid delivery boy name provided!" });
    }

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found!" });
    }

    order.deliveryboy = deliveryboy;
    await order.save();

    res.status(200).json({ success: true, message: "Delivery boy updated successfully!", data: order });
  } catch (error) {
    console.error("Error in updatePcdDeliveryBoy:", error);
    res.status(500).json({ success: false, message: "Error updating delivery boy!" });
  }
};

const getPcdOrdersByDeliveryBoy = async (req, res) => {
  try {
    const { deliveryboy } = req.params;
    if (!deliveryboy || deliveryboy.trim() === "") {
      return res.status(400).json({ success: false, message: "Delivery boy name is required!" });
    }

    const orders = await Order.find({ deliveryboy });
    if (!orders.length) {
      return res.status(404).json({ success: false, message: `No orders found for ${deliveryboy}` });
    }

    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error("Error in getPcdOrdersByDeliveryBoy:", error);
    res.status(500).json({ success: false, message: "Error fetching orders!" });
  }
};

const updatePcdPaymentStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { paymentStatus } = req.body;

    if (!paymentStatus) {
      return res.status(400).json({ success: false, message: "Payment status is required" });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    order.paymentStatus = paymentStatus;
    order.orderUpdateDate = new Date();
    await order.save();

    res.status(200).json({ success: true, message: "Payment status updated", order });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating payment status", error: error.message });
  }
};

const updatePcdPaymentMethod = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { paymentMethod } = req.body;

    if (!paymentMethod) {
      return res.status(400).json({ success: false, message: "Payment method is required" });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    order.paymentMethod = paymentMethod;
    order.orderUpdateDate = new Date();
    await order.save();

    res.status(200).json({ success: true, message: "Payment method updated", order });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating payment method", error: error.message });
  }
};


const updatePcdOrderDue = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { due } = req.body;

    // Validate input
    if (due === undefined || due === null || isNaN(due)) {
      return res.status(400).json({
        success: false,
        message: "Invalid due amount provided!",
      });
    }

    // Find the order
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }

    // Update due amount
    order.due = due;
    order.orderUpdateDate = new Date();

    await order.save();

    res.status(200).json({
      success: true,
      message: "Due amount updated successfully!",
      data: order,
    });
  } catch (error) {
    console.error("Error in updatePcdOrderDue:", error);
    res.status(500).json({
      success: false,
      message: "Some error occurred while updating due amount!",
    });
  }
};


module.exports = {
  getAllPcdOrders,
  getPcdOrderDetailsForAdmin,
  updatePcdOrderStatus,
  updatePcdOrderProductPrice,
  updatePcdOrderTotalAmount,
  updatePcdDeliveryBoy,
  getPcdOrdersByDeliveryBoy,
  updatePcdPaymentStatus,
  updatePcdPaymentMethod,
  updatePcdOrderDue
};

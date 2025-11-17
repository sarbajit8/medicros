const Order = require("../../models/Order");

const getAllOrdersOfAllUsers = async (req, res) => {
  try {
    const orders = await Order.find({});

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found!",
      });
    }

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const getOrderDetailsForAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

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
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }

    await Order.findByIdAndUpdate(id, { orderStatus });

    res.status(200).json({
      success: true,
      message: "Order status is updated successfully!",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};


// ✅ Controller to update the delivery boy for an order
const updateDeliveryBoy = async (req, res) => {
  try {
    const { id } = req.params; // Order ID
    const { deliveryboy } = req.body; // New Delivery Boy Name

    // ✅ Validate input
    if (!deliveryboy || typeof deliveryboy !== "string" || deliveryboy.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Invalid delivery boy name provided!",
      });
    }

    // ✅ Find the order
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }

    // ✅ Update the delivery boy
    order.deliveryboy = deliveryboy;

    // ✅ Save the updated order
    await order.save();

    res.status(200).json({
      success: true,
      message: "Delivery boy updated successfully!",
      data: order,
    });
  } catch (error) {
    console.error("Error in updateDeliveryBoy:", error);
    res.status(500).json({
      success: false,
      message: "Some error occurred while updating the delivery boy!",
    });
  }
};


// ✅ Controller to find orders by delivery boy name
const getOrdersByDeliveryBoy = async (req, res) => {
  try {
    const { deliveryboy } = req.params; // Get delivery boy name from params

    if (!deliveryboy || deliveryboy.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Delivery boy name is required!",
      });
    }

    // ✅ Find orders assigned to the given delivery boy
    const orders = await Order.find({ deliveryboy });

    if (orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No orders found for delivery boy: ${deliveryboy}`,
      });
    }

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.error("Error in getOrdersByDeliveryBoy:", error);
    res.status(500).json({
      success: false,
      message: "Some error occurred while fetching orders.",
    });
  }
};



const updatePaymentStatus = async (req, res) => {
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

    res.status(200).json({ success: true, message: "Payment status updated successfully", order });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};


const updatePaymentMethod = async (req, res) => {
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

    res.status(200).json({ success: true, message: "Payment method updated successfully", order });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};


const updateDueAmount = async (req, res) => {
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

    // Update due and timestamp
    order.due = due;
    order.orderUpdateDate = new Date();

    await order.save();

    res.status(200).json({
      success: true,
      message: "Due amount updated successfully!",
      data: order,
    });
  } catch (error) {
    console.error("Error updating due amount:", error);
    res.status(500).json({
      success: false,
      message: "Some error occurred while updating due amount!",
    });
  }
};





module.exports = {
  getAllOrdersOfAllUsers,
  getOrderDetailsForAdmin,
  updateOrderStatus,
  updateDeliveryBoy,
  getOrdersByDeliveryBoy,
  updatePaymentStatus,
  updatePaymentMethod,
  updateDueAmount

};

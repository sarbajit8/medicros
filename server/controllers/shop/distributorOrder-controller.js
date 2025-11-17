const DistributorOrder = require("../../models/DistributorOrders");
const DistributorCart = require("../../models/DistributorCart");
const DistributorProduct = require("../../models/DistributorProducts");


const createDistributorOrderCod = async (req, res) => {
  try {
    const {
      userId,
      distributorCartItems,
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

    const newlyCreatedOrder = new DistributorOrder({
      userId,
      distributorCartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId,
      payerId,
      cartId
    });

   
    await newlyCreatedOrder.save();

    res.status(201).json({
      success: true,
      orderId: newlyCreatedOrder._id,
    });
   

  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};





const captureDistributorCodOrder = async (req, res) => {
  try {
    const { orderId } = req.body;

    let order = await DistributorOrder.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order can not be found",
      });
    }
    
    for (let item of order.distributorCartItems) {
      let product = await DistributorProduct.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Not enough stock for this product ${product.title}`,
        });
      }

      product.totalStock -= item.quantity;

      await product.save();
    }

   

    const getCartId = order.cartId;
    await DistributorCart.findByIdAndDelete(getCartId);

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order confirmed",
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




const getAllDestributorOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await DistributorOrder.find({ userId:userId });

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found!",
        data:"newuse"
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

const getDistributorOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await DistributorOrder.findById(id);

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




module.exports = {
 createDistributorOrderCod,
 getAllDestributorOrdersByUser,
 getDistributorOrderDetails,
 captureDistributorCodOrder,
 
  
};

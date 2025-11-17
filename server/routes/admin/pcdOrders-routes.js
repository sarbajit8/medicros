const express = require("express");
const router = express.Router();

const {
  getAllPcdOrders,
  getPcdOrderDetailsForAdmin,
  updatePcdOrderStatus,
  updatePcdOrderProductPrice,
  updatePcdOrderTotalAmount,
  updatePcdDeliveryBoy,
  getPcdOrdersByDeliveryBoy,
  updatePcdPaymentStatus,
  updatePcdPaymentMethod,
  updatePcdOrderDue,
} = require("../../controllers/admin/pcdOrder-Controller");

// GET all PCD orders
router.get("/get", getAllPcdOrders);

// GET single order details by ID
router.get("/details/:id", getPcdOrderDetailsForAdmin);

// PUT update order status
router.put("/update/:id", updatePcdOrderStatus);

// PUT update price of a specific product in an order
router.put("/update-price/:orderId/:productId", updatePcdOrderProductPrice);

// PUT update total order amount
router.put("/update-total-amount/:orderId", updatePcdOrderTotalAmount);

// PUT update delivery boy
router.put("/update-deliveryboy/:id", updatePcdDeliveryBoy);

// GET orders by delivery boy
router.get("/deliveryboy/:deliveryboy", getPcdOrdersByDeliveryBoy);

// PUT update payment status
router.put("/update-payment-status/:orderId", updatePcdPaymentStatus);

// PUT update payment method
router.put("/update-payment-method/:orderId", updatePcdPaymentMethod);
router.put("/update-due/:orderId", updatePcdOrderDue);


module.exports = router;

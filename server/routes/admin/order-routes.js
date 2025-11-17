const express = require("express");

const {
  getAllOrdersOfAllUsers,
  getOrderDetailsForAdmin,
  updateOrderStatus,
  updateDeliveryBoy,
  getOrdersByDeliveryBoy,
  updatePaymentStatus,
  updatePaymentMethod,
  updateDueAmount,
} = require("../../controllers/admin/order-controller");

const router = express.Router();

router.get("/get", getAllOrdersOfAllUsers);
router.get("/details/:id", getOrderDetailsForAdmin);
router.put("/update/:id", updateOrderStatus);
router.put("/update-deliveryboy/:id", updateDeliveryBoy);
router.get("/deliveryboy/:deliveryboy", getOrdersByDeliveryBoy);
router.put("/update-payment-status/:orderId", updatePaymentStatus);
router.put("/update-payment-method/:orderId", updatePaymentMethod);
router.put("/update-due/:orderId", updateDueAmount);

module.exports = router;

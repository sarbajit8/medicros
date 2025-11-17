const express = require("express");
const { getAllDistributorOrders, getDistributorOrderDetailsForAdmin, updateDistributorsOrderStatus, updateDistributorOrderProductPrice, updateDistributorOrderTotalAmount, updateDeliveryBoy, getDistributorOrdersByDeliveryBoy, updateDistributorPaymentStatus, updateDistributorPaymentMethod, updateDistributorOrderDue } = require("../../controllers/admin/distributorOrder-controller");


const router = express.Router();

router.get("/get", getAllDistributorOrders);
router.get("/details/:id", getDistributorOrderDetailsForAdmin);
router.put("/update/:id", updateDistributorsOrderStatus);
router.put("/update-price/:orderId/:productId", updateDistributorOrderProductPrice);
router.put("/update-total-amount/:orderId", updateDistributorOrderTotalAmount);
router.put("/update-deliveryboy/:id", updateDeliveryBoy);
router.get("/deliveryboy/:deliveryboy", getDistributorOrdersByDeliveryBoy);
router.put("/update-payment-status/:orderId", updateDistributorPaymentStatus);
router.put("/update-payment-method/:orderId", updateDistributorPaymentMethod);
router.put("/update-due/:orderId", updateDistributorOrderDue);

module.exports = router;

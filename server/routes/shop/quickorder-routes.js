const express = require("express");
const { addQuickOrder, getAllQuickOrders } = require("../../controllers/shop/quickorder-controller");

const router = express.Router();

router.post("/add", addQuickOrder); // Add new Quick Order
router.get("/all", getAllQuickOrders); // Get all Quick Orders

module.exports = router;

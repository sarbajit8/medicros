// routes/shop/pcdOrders-routes.js

const express = require("express");
const { createPcdOrderCod, capturePcdCodOrder, getAllPcdOrdersByUser, getPcdOrderDetails } = require("../../controllers/shop/pcdOrders-controller");

const router = express.Router();

// ➕ Create a new PCD order (COD)
router.post("/create", createPcdOrderCod);

// ✅ Finalize/capture the COD PCD order after confirming stock and deleting cart
router.post("/capture", capturePcdCodOrder);

// 🔍 Get all PCD orders for a user
router.get("/user/:userId", getAllPcdOrdersByUser);

// 📦 Get single PCD order details by order ID
router.get("/details/:id", getPcdOrderDetails);

module.exports = router;

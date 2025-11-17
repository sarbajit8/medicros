// routes/admin/pcdCart-router.js
const express = require("express");
const { pcdAddToCart, fetchPcdCartItems, updatePcdCartItemQty, deletePcdCartItem } = require("../../controllers/shop/pcdCart-controller");


const router = express.Router();

// ➕ Add item to cart
router.post("/add", pcdAddToCart);

// 🛒 Get all cart items for a user
router.get("/items/:userId", fetchPcdCartItems);

// 🔁 Update cart item quantity
router.put("/update", updatePcdCartItemQty);

// 🗑️ Delete item from cart
router.delete("/delete/:userId/:productId", deletePcdCartItem);

module.exports = router;

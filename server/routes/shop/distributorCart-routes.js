const express = require("express");
const { distributorAddToCart, fetchDistributorCartItems, updateDistributorCartItemQty, deleteDistributorCartItem } = require("../../controllers/shop/distributorCart-controller");


const router = express.Router();

router.post("/add", distributorAddToCart);
router.get("/get/:userId", fetchDistributorCartItems);
router.put("/update-cart", updateDistributorCartItemQty);
router.delete("/:userId/:productId", deleteDistributorCartItem);

module.exports = router;

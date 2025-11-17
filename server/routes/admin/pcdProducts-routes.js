const express = require("express");
const { addPcdProduct, fetchAllPcdProduct, getAllProductByPcd, editPcdProduct, deletePcdProduct } = require("../../controllers/admin/pcdProducts-controller");


const router = express.Router();

// ➕ Add new PCD product
router.post("/add", addPcdProduct);

// 📦 Get all PCD products
router.get("/get", fetchAllPcdProduct);

// 🔍 Get products by PCD ID (distributor)
router.get("/pcd/:PcdId", getAllProductByPcd);

// ✏️ Edit a product
router.put("/edit/:id", editPcdProduct);

// 🗑️ Delete a product
router.delete("/delete/:id", deletePcdProduct);

module.exports = router;

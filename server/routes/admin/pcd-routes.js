const express = require("express");
const { addPcd, fetchAllPcd, editPcd, deletePcd } = require("../../controllers/admin/pcd-controller");
const router = express.Router();

 // adjust path based on your folder structure

// ➕ Add new PCD
router.post("/add", addPcd);

// 📥 Get all PCD entries
router.get("/all", fetchAllPcd);

// ✏️ Edit existing PCD
router.put("/edit/:id", editPcd);

// ❌ Delete PCD
router.delete("/delete/:id", deletePcd);

module.exports = router;

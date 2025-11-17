const express = require("express");
const { addCategory, fetchAllCategorys,deleteCategory } = require("../../controllers/admin/category-controller");

const router = express.Router();

router.post("/add", addCategory);
router.get("/get", fetchAllCategorys);
router.delete("/delete/:id", deleteCategory);

module.exports = router;

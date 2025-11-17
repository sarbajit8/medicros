const express = require("express");
const { addBrand, fetchAllBrands, deleteBrand, updateBrand } = require("../../controllers/admin/brand-controller");

const router = express.Router();

router.post("/add", addBrand);
router.get("/get", fetchAllBrands);
router.delete("/delete/:id", deleteBrand);
router.put("/update/:id", updateBrand);


module.exports = router;

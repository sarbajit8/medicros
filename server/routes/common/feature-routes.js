const express = require("express");
const { addFeatureImage, getFeatureImages, deleteFeatureImages, editFeatureImage } = require("../../controllers/common/feature-controller");



const router = express.Router();

router.post("/add", addFeatureImage);
router.get("/get", getFeatureImages);
router.delete("/delete/:id", deleteFeatureImages);
router.put("/edit/:id", editFeatureImage);



module.exports = router;

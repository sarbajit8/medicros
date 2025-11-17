const express = require("express");
const { addGlleryItems, getGlleryItems, deleteGallery, editGallery } = require("../../controllers/common/gallery-controller");

const router = express.Router();

router.post("/add", addGlleryItems);
router.get("/get", getGlleryItems);
router.delete("/delete/:id", deleteGallery);
router.put("/edit/:id", editGallery);


module.exports = router;

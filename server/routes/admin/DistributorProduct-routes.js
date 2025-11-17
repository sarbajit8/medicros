const express = require("express");

const { addDistributorProduct,
        getAllProductByDistributor, 
        editDistributorProduct, 
        deleteDistributorProduct, 
        fetchAllDistributorProduct 
    } = require("../../controllers/admin/DistributorProduct-controller");

const router = express.Router();

router.post("/add", addDistributorProduct);
router.get("/get", fetchAllDistributorProduct);
router.get("/list/:distributorId", getAllProductByDistributor);
router.put("/edit/:id", editDistributorProduct);
router.delete("/delete/:id", deleteDistributorProduct);

module.exports = router;
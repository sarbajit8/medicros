const express = require("express");
const { createDistributorOrderCod, captureDistributorCodOrder, getAllDestributorOrdersByUser, getDistributorOrderDetails } = require("../../controllers/shop/distributorOrder-controller");


const router = express.Router();


router.post("/createcod", createDistributorOrderCod);
router.post("/captureorder", captureDistributorCodOrder);
router.get("/list/:userId", getAllDestributorOrdersByUser);
router.get("/details/:id", getDistributorOrderDetails);


module.exports = router;

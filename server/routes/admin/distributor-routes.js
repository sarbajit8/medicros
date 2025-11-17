const express = require("express");
const { addDistributor,
      fetchAllDistributor,
      editDistributor, 
      deleteDistributor } = require("../../controllers/admin/distributor-controller");



const router = express.Router();

router.post("/add", addDistributor);
router.get("/get", fetchAllDistributor);
router.put("/edit/:id", editDistributor);
router.delete("/delete/:id", deleteDistributor);

module.exports = router;

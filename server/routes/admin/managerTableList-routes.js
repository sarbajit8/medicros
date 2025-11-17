const express = require("express");
const { upsertManagerPartyCollection, getManagerPartyCollectionByDate, deleteManagerPartyCollectionEntryById, editManagerPartyCollectionEntryById } = require("../../controllers/admin/managerListTable-controller");
const router = express.Router();



// Route to add or update party collection entries
router.post("/upsert", upsertManagerPartyCollection);
router.get("/by-date", getManagerPartyCollectionByDate);
router.delete("/delete-by-id", deleteManagerPartyCollectionEntryById);
router.put("/edit-by-id", editManagerPartyCollectionEntryById);



module.exports = router;

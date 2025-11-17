const express = require("express");
const { upsertBsaPartyCollection,
     getBsaPartyCollectionByDate,
     deleteBsaPartyCollectionEntryById,
     editBsaPartyCollectionEntryById } = require("../../controllers/admin/bsaListTable-controller");
const router = express.Router();



// @route   POST /api/admin/bsatablelist/upsert
router.post("/upsert", upsertBsaPartyCollection);

// @route   GET /api/admin/bsatablelist/get-by-date
router.get("/get-by-date", getBsaPartyCollectionByDate);

// @route   DELETE /api/admin/bsatablelist/delete-by-id
router.delete("/delete-by-id", deleteBsaPartyCollectionEntryById);

// @route   PUT /api/admin/bsatablelist/edit-by-id
router.put("/edit-by-id", editBsaPartyCollectionEntryById);

module.exports = router;

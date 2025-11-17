const mongoose = require("mongoose");

const PartyEntrySchema = new mongoose.Schema({
  partyname: {
    type: String,
  },
  billamount: {
    type: Number,
  },
  collectedamount: {
    type: Number,
  },
  mop: {
    type: String, // Mode of Payment
  },
});

const ManagerPartyCollectionSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    entries: {
      type: [PartyEntrySchema],
      validate: [arr => arr.length > 0, "At least one party entry is required."],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ManagerPartyCollection", ManagerPartyCollectionSchema);

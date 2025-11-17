const mongoose = require("mongoose");

const ManagerDailyLogSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee", // Make sure this matches your actual employee model name
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    startkm: {
      type: Number,
    },
    endkm: {
      type: Number,
    },
    startimg: {
      type: String,
    },
    endimg: {
      type: String,
    },
    starttime: {
      type: String,
    },
    endtime: {
      type: String,
    },
    pricePerKm: {
      type: Number,
    },
    fuel: {
      type: Number,
    },
    lunch: {
      type: Number,
    },
    totalamount: {
      type: Number,
    },
    market: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ManagerDailyLog", ManagerDailyLogSchema);

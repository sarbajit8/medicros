const mongoose = require("mongoose");

const BsaDailyLogSchema = new mongoose.Schema(
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
  
    lunch: {
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

module.exports = mongoose.model("BsaDailyLog", BsaDailyLogSchema);

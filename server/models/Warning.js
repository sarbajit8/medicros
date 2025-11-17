const mongoose = require("mongoose");

const WarningSchema = new mongoose.Schema(
  {
    content: {type: String,
        required: true,},
    title: {type: String,
         required: true,},
    employeeId: {type: String,
              required: true,
              },
    date: {
                type: Date,
                required: true,
              }, 
  },
);

module.exports = mongoose.model("Warning", WarningSchema);
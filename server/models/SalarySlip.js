const mongoose = require("mongoose");

const SalarySchema = new mongoose.Schema(
  {
    image: {type: String,
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

module.exports = mongoose.model("Salary", SalarySchema);
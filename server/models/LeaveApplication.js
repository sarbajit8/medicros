const mongoose = require("mongoose");

const LeaveApplicationSchema = new mongoose.Schema(
  {
    employeeName: {type: String,
                   required: true,},
    employeeId: {type: String,
                 required: true,},
    employeePan: {type: String,
                },
    title:    {type: String,
               required: true,},
    application: {type: String,
                  required: true,
             },
    leaveStatus: {
                type: String,
                required: true,
              },
    reply: {
                type: String,
              },
    date: {
                type: Date,
                required: true,
              },
   
  },
);

module.exports = mongoose.model("LeaveApplication", LeaveApplicationSchema);
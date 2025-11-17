const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema(
  {
    
    title: {type: String,
         required: true,},
    description: {type: String,
         required: true,},
    status: {type: String,
         required: true,},
    date: {   
         type: Date,
         required: true,
              }, 
  },
 { timestamps: true },

);

module.exports = mongoose.model("Notification", NotificationSchema);
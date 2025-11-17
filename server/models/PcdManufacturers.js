const mongoose = require("mongoose");

const PcdSchema = new mongoose.Schema(
  {
    image: { type: String,
           required: true },
    name: {type: String,
           required: true,},
   company: {type: String,
            required: true,},
    username: {type: String,
              required: true,
              unique: true,},
    address: {
                type: String,
                required: true,
              },
    pin: {
                type: String,
                required: true,
              },
    gst: {
                type: String,
                required: true,
              },   
    dl: {
                type: String,
                required: true,
              },    
    email: {
                type: String,
                required: true,
              },      
    mobile: {
                type: String,
                required: true,
              },
   
   
  },
);

module.exports = mongoose.model("Pcd", PcdSchema);
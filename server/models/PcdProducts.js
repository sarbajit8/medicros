const mongoose = require("mongoose");

const PcdProductsSchema = new mongoose.Schema(
  {
    PcdId: {type: String,
                 required: true,}, 
    totalStock: {type: Number, 
                required: true,}, 
    distributorName : {type: String,
                  required: true,},  
    productname: {type: String,
                required: true,},    
  },
);

module.exports = mongoose.model("PcdProducts", PcdProductsSchema);
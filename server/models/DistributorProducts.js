const mongoose = require("mongoose");

const DistributorProductsSchema = new mongoose.Schema(
  {
    distributorId: {type: String,
                 required: true,}, 
    totalStock: {type: Number, 
                required: true,}, 
    distributorName : {type: String,
                  required: true,},  
    productname: {type: String,
                required: true,},    
  },
);

module.exports = mongoose.model("DistributorProduct", DistributorProductsSchema);
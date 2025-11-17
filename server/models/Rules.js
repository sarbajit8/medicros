const mongoose = require("mongoose");

const RulesSchema = new mongoose.Schema(
  {
    image: {type: String,
        required: true,},
    title: {type: String,
         required: true,},
    date: {   
         type: Date,
         required: true,
              }, 
  },
);

module.exports = mongoose.model("Rules", RulesSchema);
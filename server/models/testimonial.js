const mongoose = require("mongoose");

const TestimonialSchema = new mongoose.Schema(
  {
    image: {type: String,
        required: true,},
    message: {type: String,
         required: true,},
    name: {type: String,
              required: true,
              },
    ratting: {
                type: String,
                required: true,
              }, 
  },
);

module.exports = mongoose.model("Testimonial", TestimonialSchema);
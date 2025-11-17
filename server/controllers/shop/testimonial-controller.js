const Testimonial = require("../../models/testimonial");

// Create new testimonial
const createTestimonial = async (req, res) => {
  try {
    const { image, message, name, ratting } = req.body;
    
    const testimonial = new Testimonial({
      image,
      message, 
      name,
      ratting
    });

    const savedTestimonial = await testimonial.save();
    res.status(201).json(savedTestimonial);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all testimonials
const getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    res.status(200).json(testimonials);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get testimonial by ID
const getTestimonialById = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }
    res.status(200).json(testimonial);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update testimonial
const updateTestimonial = async (req, res) => {
  try {
    const { image, message, name, ratting } = req.body;
    
    const updatedTestimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      {
        image,
        message,
        name,
        ratting
      },
      { new: true }
    );

    if (!updatedTestimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    res.status(200).json(updatedTestimonial);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete testimonial
const deleteTestimonial = async (req, res) => {
  try {
    const deletedTestimonial = await Testimonial.findByIdAndDelete(req.params.id);
    
    if (!deletedTestimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    res.status(200).json({ message: "Testimonial deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createTestimonial,
  getAllTestimonials,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial
};
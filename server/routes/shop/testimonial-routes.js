const express = require('express');
const router = express.Router();
const {
  createTestimonial,
  getAllTestimonials, 
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial
} = require('../../controllers/shop/testimonial-controller');

// Create testimonial
router.post('/create', createTestimonial);

// Get all testimonials
router.get('/all', getAllTestimonials);

// Get testimonial by ID  
router.get('/:id', getTestimonialById);

// Update testimonial
router.put('/update/:id', updateTestimonial);

// Delete testimonial
router.delete('/delete/:id', deleteTestimonial);

module.exports = router;
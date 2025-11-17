const mongoose = require('mongoose');

const AlertSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  type: {
    type: String,
    required: true,
  
  },
  status: {
    type: String,
    default: 'read',
   
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Alert', AlertSchema);

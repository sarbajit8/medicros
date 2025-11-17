const mongoose = require('mongoose');

const excelSchema = new mongoose.Schema({
  title: { type: String, required: true },
  brand: { type: String, required: true },
});

module.exports = mongoose.model('excel', excelSchema);
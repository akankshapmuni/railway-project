const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  officerName: { type: String, required: true },
  designation: String,
  from: { type: Date, required: true },
  to: { type: Date, required: true },
  outTo: String,
  dutyLeave: String,
  purpose: String
}, { timestamps: true });

module.exports = mongoose.model('Tour', tourSchema);

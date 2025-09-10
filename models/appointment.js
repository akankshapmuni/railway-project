const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  date: String,
  time: String,
  with: String,
  designation: String,
  purpose: String,
  venue: String
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);

// routes/admin.js
const express = require('express');
const router = express.Router();
const Appointment = require('../models/appointment');
const Tour = require('../models/tour');

// Admin dashboard: show appointments + tours
router.get('/admin', async (req, res) => {
  try {
    const appointments = await Appointment.find({}).sort({ date: -1 }).lean();
    const tours        = await Tour.find({}).sort({ from: -1 }).lean();

    console.log('Admin counts -> appointments:', appointments.length, 'tours:', tours.length);
    return res.render('admin', { appointments, tours, user: req.user });
  } catch (err) {
    console.error('Error loading admin page:', err);
    return res.status(500).send('Server error');
  }
});

module.exports = router;

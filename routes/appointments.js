const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// Show public list (optional)
router.get('/', async (req, res) => {
  const appointments = await Appointment.find().sort({ createdAt: -1 });
  // a public listing page (if you have it)
  res.render('appointments_list', { appointments, user: req.session.admin || null });
});

// New form
router.get('/new', (req, res) => {
  // render create form (usually admin-only)
  res.render('appointment_form', { appointment: {}, user: req.session.admin || null });
});

// Create
router.post('/', async (req, res) => {
  try {
    await Appointment.create(req.body);
    // <-- redirect to ADMIN dashboard (the combined page)
    res.redirect('/admin');
  } catch (err) {
    console.error('Error creating appointment:', err);
    // On error, you can re-render the form with an error message
    res.render('appointment_form', { appointment: req.body, error: 'Failed to create', user: req.session.admin || null });
  }
});

// Edit form
router.get('/:id/edit', async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);
  res.render('appointment_form', { appointment, user: req.session.admin || null });
});

// Update
router.put('/:id', async (req, res) => {
  try {
    await Appointment.findByIdAndUpdate(req.params.id, req.body);
    // <-- redirect to ADMIN dashboard
    res.redirect('/admin');
  } catch (err) {
    console.error('Error updating appointment:', err);
    res.render('appointment_form', { appointment: { _id: req.params.id, ...req.body }, error: 'Failed to update', user: req.session.admin || null });
  }
});

// Delete
router.delete('/:id', async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    // <-- redirect to ADMIN dashboard
    res.redirect('/admin');
  } catch (err) {
    console.error('Error deleting appointment:', err);
    res.redirect('/admin');
  }
});

module.exports = router;

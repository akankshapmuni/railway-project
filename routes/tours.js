// routes/tours.js
const express = require('express');
const router = express.Router();
const Tour = require('../models/Tour');

// Public list (optional)
router.get('/', async (req, res) => {
  const tours = await Tour.find().sort({ from: -1 });
  res.render('tours_list', { tours, user: req.session.admin || null });
});

// New form
router.get('/new', (req, res) => {
  res.render('tour_form', { tour: {}, user: req.session.admin || null });
});

// Create
router.post('/', async (req, res) => {
  try {
    await Tour.create(req.body);
    // <-- redirect to ADMIN dashboard
    res.redirect('/admin');
  } catch (err) {
    console.error('Error creating tour:', err);
    res.render('tour_form', { tour: req.body, error: 'Failed to create', user: req.session.admin || null });
  }
});

// Edit form
router.get('/:id/edit', async (req, res) => {
  const tour = await Tour.findById(req.params.id);
  res.render('tour_form', { tour, user: req.session.admin || null });
});

// Update
router.put('/:id', async (req, res) => {
  try {
    await Tour.findByIdAndUpdate(req.params.id, req.body);
    // <-- redirect to ADMIN dashboard
    res.redirect('/admin');
  } catch (err) {
    console.error('Error updating tour:', err);
    res.render('tour_form', { tour: { _id: req.params.id, ...req.body }, error: 'Failed to update', user: req.session.admin || null });
  }
});

// Delete
router.delete('/:id', async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    // <-- redirect to ADMIN dashboard
    res.redirect('/admin');
  } catch (err) {
    console.error('Error deleting tour:', err);
    res.redirect('/admin');
  }
});

module.exports = router;

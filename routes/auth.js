const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Admin = require('../models/admin');
const Appointment = require('../models/appointment');
const Tour = require('../models/tour');

// Render page-only login (no header/footer)
router.get('/login', (req, res) => {
  res.render('login', { error: req.flash('error') });
});

// login post
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });
  if (!admin) {
    req.flash('error', 'Invalid credentials');
    return res.redirect('/login');
  }
  const ok = await admin.validatePassword(password);
  if (!ok) {
    req.flash('error', 'Invalid credentials');
    return res.redirect('/login');
  }
  req.session.admin = { id: admin._id, username: admin.username };
  res.redirect('/admin');
});

// routes/auth.js (replace /admin handler with this)
router.get('/admin', async (req, res) => {
  // if you want /admin to require login, uncomment next two lines
  // if (!req.session?.admin) {
  //   return res.redirect('/login');
  // }

  try {
    const Appointment = require('../models/Appointment');
    const Tour = require('../models/Tour');

    const appointments = await Appointment.find().sort({ createdAt: -1 }).lean();
    const tours = await Tour.find().sort({ from: -1 }).lean();

    console.log('ADMIN DASHBOARD: appointments:', appointments.length, 'tours:', tours.length);
    if (tours.length) console.log('First tour sample:', tours[0]);

    res.render('admin', {
      appointments,
      tours,
      isAdmin: !!req.session?.admin,
      hideLogin: !!req.session?.admin,
      user: req.session?.admin || null
    });
  } catch (err) {
    console.error('Error rendering admin dashboard', err);
    req.flash('error', 'Unable to load dashboard');
    res.redirect('/login');
  }
});

// routes/auth.js

router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.render('logout', { isAdmin: false, hideLogin: true });
  });
});

// If you prefer GET /logout instead of POST, use this:
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.render('logout', { isAdmin: false, hideLogin: true });
  });
});

module.exports = router;

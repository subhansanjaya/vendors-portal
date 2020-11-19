const express = require('express');
const mongoose = require('mongoose');

const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');

const router = express.Router();
const { ensureAuthenticated } = require('../helpers/auth');

// Load Booking Model
require('../models/Booking');
const Booking = mongoose.model('bookings');

// Booking Index Page
router.get('/', (req, res) => {
  Booking.find({ user: req.user.id }).lean()
    .sort({ date: 'desc' })
    .then(bookings => {
      res.render('bookings/index', {
        bookings: bookings
      });
    });
});

// Get Bookings for a Specific Date
router.get('/bookings/:id', (req, res) => {
  Booking.find({ bookingdate: req.params.id }).lean()
    .sort({ date: 'desc' })
    .then(bookings => {
      res.send(bookings);
    });
});

// Get Previous Location of the Vendor 
router.get('/closest/', (req, res) => {

  Booking
    .findOne({ bookingdate: req.query.date, vendor: req.query.vendor }).lean()
    .sort({ date: 'desc' })
    .then(bookings => {
      res.send(bookings);
    });

  //Should convert the time or use the proper data type. 
  /*
    .aggregate(
      [
      { "$project": {
        "start": {
          "$dateFromString": {
            "dateString": { "$concat": [req.query.date, "T", req.query.start] }
          }
        }
      }}
    ])
  
  */

});

// Add Booking Form
router.get('/add', ensureAuthenticated, (req, res) => {
  res.render('bookings/add');
});

// Process Form
router.post('/', ensureAuthenticated, (req, res) => {
  let errors = [];

  if (!req.body.address) {
    errors.push({ text: 'Please add address' });
  }

  if (!req.body.datepicker) {
    errors.push({ text: 'Please add date' });
  }

  if (errors.length > 0) {
    res.render('bookings/add', {
      errors: errors,
      address: req.body.address,
      services: req.body.services,
      squarefeets: req.body.squarefeets,
      bookingdate: req.body.datepicker,
      start: req.body.start,
      end: req.body.end,
      vendor: req.body.vendor
    });
  } else {
    const newUser = {
      errors: errors,
      address: req.body.address,
      services: req.body.services,
      squarefeets: req.body.squarefeets,
      bookingdate: req.body.datepicker,
      start: req.body.start,
      end: req.body.end,
      vendor: req.body.vendor,
      user: req.user.id
    }
    new Booking(newUser)
      .save()
      .then(booking => {
        req.flash('success_msg', 'Booking added');
        res.redirect('/bookings');
      }, error => {
        console.error(error.message);
      })

  }
});


// Delete Booking
router.delete('/:id', ensureAuthenticated, (req, res) => {
  Booking.remove({ _id: req.params.id })
    .then(() => {
      req.flash('success_msg', 'Booking removed');
      res.redirect('/bookings');
    });
});

module.exports = router;
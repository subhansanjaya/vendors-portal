const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const IdeaSchema = new Schema({
  vendor: {
    type: String,
    required: true
  },
  services: {
    type: String,
    required: true
  },
  squarefeets: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  bookingdate: {
    type: String,
    required: true
  },
  start: {
    type: String,
    required: true
  },
  end: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('bookings', IdeaSchema);
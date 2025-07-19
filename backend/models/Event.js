const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Please provide a title for the event'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  start: {
    type: Date,
    required: [true, 'Please provide a start date and time']
  },
  end: {
    type: Date,
    required: [true, 'Please provide an end date and time']
  },
  allDay: {
    type: Boolean,
    default: false
  },
  location: {
    type: String,
    trim: true
  },
  color: {
    type: String,
    default: '#3a87ad'
  },
  category: {
    type: String,
    trim: true
  },
  recurring: {
    type: String,
    enum: [null, 'daily', 'weekly', 'monthly', 'yearly'],
    default: null
  },
  recurringEndDate: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes for better query performance
eventSchema.index({ user: 1, start: 1, end: 1 });

module.exports = mongoose.model('Event', eventSchema);

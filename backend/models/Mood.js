const mongoose = require('mongoose');

const moodSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  mood: {
    type: String,
    required: [true, 'Please select a mood'],
    enum: ['😊', '😢', '😡', '😴', '😍', '😐', '😊', '😊', '😊', '😊']
  },
  note: {
    type: String,
    trim: true,
    maxlength: [500, 'Note cannot be more than 500 characters']
  },
  date: {
    type: Date,
    default: Date.now
  },
  activities: [{
    type: String,
    trim: true
  }],
  intensity: {
    type: Number,
    min: 1,
    max: 5,
    default: 3
  },
  tags: [{
    type: String,
    trim: true
  }]
}, {
  timestamps: true
});

// Indexes for better query performance
moodSchema.index({ user: 1, date: -1 });

// Virtual for formatted date
moodSchema.virtual('formattedDate').get(function() {
  return this.date.toISOString().split('T')[0];
});

module.exports = mongoose.model('Mood', moodSchema);

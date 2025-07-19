const express = require('express');
const router = express.Router();
const {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventsByDateRange
} = require('../controllers/eventController');

const { protect } = require('../middleware/auth');

// All routes are protected and require authentication
router.use(protect);

router
  .route('/')
  .get(getEvents)
  .post(createEvent);

router
  .route('/:id')
  .get(getEvent)
  .put(updateEvent)
  .delete(deleteEvent);

router
  .route('/range')
  .get(getEventsByDateRange);

module.exports = router;

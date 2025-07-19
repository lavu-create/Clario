const express = require('express');
const router = express.Router();
const {
  getMoods,
  getMood,
  createMood,
  updateMood,
  deleteMood,
  getMoodStats,
  getMoodsByDate
} = require('../controllers/moodController');

const { protect } = require('../middleware/auth');

// All routes are protected and require authentication
router.use(protect);

router
  .route('/')
  .get(getMoods)
  .post(createMood);

router
  .route('/:id')
  .get(getMood)
  .put(updateMood)
  .delete(deleteMood);

router
  .route('/stats')
  .get(getMoodStats);

router
  .route('/date/:date')
  .get(getMoodsByDate);

module.exports = router;

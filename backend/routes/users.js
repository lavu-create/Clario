const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  userPhotoUpload,
  getDashboardStats
} = require('../controllers/userController');

const { protect, authorize } = require('../middleware/auth');

// All routes are protected and require authentication
router.use(protect);

// Admin only routes
router.use(authorize('admin'));

router
  .route('/')
  .get(getUsers)
  .post(createUser);

router
  .route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

router
  .route('/:id/photo')
  .put(userPhotoUpload);

// Dashboard stats route (protected, no admin required)
router
  .route('/dashboard/stats')
  .get(getDashboardStats);

module.exports = router;

const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const path = require('path');
const fs = require('fs');

// @desc    Get all users (Admin only)
// @route   GET /api/users
// @access  Private/Admin
exports.getUsers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get single user
// @route   GET /api/users/:id
// @access  Private/Admin
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc    Create user (Admin only)
// @route   POST /api/users
// @access  Private/Admin
exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  res.status(201).json({
    success: true,
    data: user
  });
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private
exports.updateUser = asyncHandler(async (req, res, next) => {
  // Check if user is updating their own profile or is an admin
  if (req.params.id !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this user`,
        401
      )
    );
  }

  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!user) {
    return next(
      new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private
exports.deleteUser = asyncHandler(async (req, res, next) => {
  // Check if user is deleting their own account or is an admin
  if (req.params.id !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete this user`,
        401
      )
    );
  }

  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
    );
  }

  // Delete profile picture if it's not the default
  if (user.profilePic !== 'default.jpg') {
    const filePath = path.join(
      __dirname,
      `../public/uploads/${user.profilePic}`
    );
    
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }

  await user.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Upload photo for user
// @route   PUT /api/users/:id/photo
// @access  Private
exports.userPhotoUpload = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is user owner or admin
  if (user._id.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this user`,
        401
      )
    );
  }

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }

  const file = req.files.file;

  // Make sure the image is a photo
  if (!file.mimetype.startsWith('image')) {
    return next(new ErrorResponse(`Please upload an image file`, 400));
  }

  // Check file size
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
        400
      )
    );
  }

  // Create custom filename
  file.name = `photo_${user._id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }

    // Delete old photo if it exists and it's not the default
    if (user.profilePic !== 'default.jpg') {
      const oldFilePath = path.join(
        __dirname,
        `../public/uploads/${user.profilePic}`
      );
      
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }
    }

    await User.findByIdAndUpdate(req.params.id, { profilePic: file.name });

    res.status(200).json({
      success: true,
      data: file.name
    });
  });
});

// @desc    Get user dashboard stats
// @route   GET /api/users/dashboard/stats
// @access  Private
exports.getDashboardStats = asyncHandler(async (req, res, next) => {
  const [tasks, events, moods] = await Promise.all([
    // Get task statistics
    Task.aggregate([
      {
        $match: { user: req.user._id }
      },
      {
        $group: {
          _id: '$completed',
          count: { $sum: 1 }
        }
      }
    ]),
    
    // Get upcoming events count
    Event.countDocuments({
      user: req.user._id,
      start: { $gte: new Date() }
    }),
    
    // Get recent mood entries
    Mood.aggregate([
      {
        $match: { user: req.user._id }
      },
      {
        $sort: { date: -1 }
      },
      {
        $limit: 5
      },
      {
        $project: {
          _id: 0,
          mood: 1,
          date: 1,
          note: 1
        }
      }
    ])
  ]);
  
  // Process task statistics
  const taskStats = {
    total: 0,
    completed: 0,
    pending: 0
  };
  
  tasks.forEach(stat => {
    taskStats.total += stat.count;
    if (stat._id === true) {
      taskStats.completed = stat.count;
    } else {
      taskStats.pending += stat.count;
    }
  });
  
  // Process mood statistics
  const moodStats = moods.reduce((acc, mood) => {
    acc[mood.mood] = (acc[mood.mood] || 0) + 1;
    return acc;
  }, {});
  
  const mostCommonMood = Object.entries(moodStats).sort((a, b) => b[1] - a[1])[0];
  
  res.status(200).json({
    success: true,
    data: {
      tasks: taskStats,
      upcomingEvents: events,
      recentMoods: moods,
      moodInsight: mostCommonMood ? {
        mood: mostCommonMood[0],
        count: mostCommonMood[1]
      } : null
    }
  });
});

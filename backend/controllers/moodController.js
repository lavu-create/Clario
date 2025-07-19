const Mood = require('../models/Mood');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Get all mood entries
// @route   GET /api/moods
// @access  Private
exports.getMoods = asyncHandler(async (req, res, next) => {
  const { startDate, endDate, mood, sort } = req.query;
  
  // Build query
  let query = { user: req.user.id };
  
  // Filter by date range
  if (startDate || endDate) {
    query.date = {};
    if (startDate) query.date.$gte = new Date(startDate);
    if (endDate) {
      const end = new Date(endDate);
      end.setDate(end.getDate() + 1); // Include the end date
      query.date.$lt = end;
    }
  }
  
  // Filter by mood
  if (mood) {
    query.mood = mood;
  }
  
  // Execute query
  let result = Mood.find(query);
  
  // Sort
  if (sort) {
    const sortList = sort.split(',').join(' ');
    result = result.sort(sortList);
  } else {
    result = result.sort('-date');
  }
  
  const moods = await result;
  
  res.status(200).json({
    success: true,
    count: moods.length,
    data: moods
  });
});

// @desc    Get single mood entry
// @route   GET /api/moods/:id
// @access  Private
exports.getMood = asyncHandler(async (req, res, next) => {
  const mood = await Mood.findOne({
    _id: req.params.id,
    user: req.user.id
  });

  if (!mood) {
    return next(
      new ErrorResponse(`Mood entry not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: mood
  });
});

// @desc    Create new mood entry
// @route   POST /api/moods
// @access  Private
exports.createMood = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.user = req.user.id;
  
  // Set current date if not provided
  if (!req.body.date) {
    req.body.date = new Date();
  }

  const mood = await Mood.create(req.body);

  res.status(201).json({
    success: true,
    data: mood
  });
});

// @desc    Update mood entry
// @route   PUT /api/moods/:id
// @access  Private
exports.updateMood = asyncHandler(async (req, res, next) => {
  let mood = await Mood.findById(req.params.id);

  if (!mood) {
    return next(
      new ErrorResponse(`Mood entry not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is mood entry owner
  if (mood.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this mood entry`,
        401
      )
    );
  }

  mood = await Mood.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: mood
  });
});

// @desc    Delete mood entry
// @route   DELETE /api/moods/:id
// @access  Private
exports.deleteMood = asyncHandler(async (req, res, next) => {
  const mood = await Mood.findById(req.params.id);

  if (!mood) {
    return next(
      new ErrorResponse(`Mood entry not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is mood entry owner
  if (mood.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete this mood entry`,
        401
      )
    );
  }

  await mood.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Get mood statistics
// @route   GET /api/moods/stats
// @access  Private
exports.getMoodStats = asyncHandler(async (req, res, next) => {
  const { startDate, endDate } = req.query;
  
  // Build match stage
  const match = { user: req.user._id };
  
  // Add date range if provided
  if (startDate || endDate) {
    match.date = {};
    if (startDate) match.date.$gte = new Date(startDate);
    if (endDate) {
      const end = new Date(endDate);
      end.setDate(end.getDate() + 1); // Include the end date
      match.date.$lt = end;
    }
  }
  
  const stats = await Mood.aggregate([
    {
      $match: match
    },
    {
      $group: {
        _id: '$mood',
        count: { $sum: 1 },
        avgIntensity: { $avg: '$intensity' },
        activities: { $push: '$activities' },
        dates: { $push: '$date' }
      }
    },
    {
      $project: {
        _id: 0,
        mood: '$_id',
        count: 1,
        avgIntensity: 1,
        activities: {
          $reduce: {
            input: '$activities',
            initialValue: [],
            in: { $concatArrays: ['$$value', '$$this'] }
          }
        },
        dates: 1
      }
    },
    {
      $sort: { count: -1 }
    }
  ]);
  
  // Process activities to get most common
  const processedStats = stats.map(stat => {
    // Count occurrences of each activity
    const activityCounts = stat.activities.reduce((acc, activity) => {
      acc[activity] = (acc[activity] || 0) + 1;
      return acc;
    }, {});
    
    // Sort activities by count and get top 3
    const topActivities = Object.entries(activityCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([activity]) => activity);
    
    // Get date range
    const dates = stat.dates.map(d => new Date(d));
    const dateRange = {
      start: new Date(Math.min(...dates)),
      end: new Date(Math.max(...dates))
    };
    
    return {
      ...stat,
      topActivities,
      dateRange
    };
  });
  
  // Calculate overall mood statistics
  const totalMoods = processedStats.reduce((sum, stat) => sum + stat.count, 0);
  const overallStats = {
    totalMoods,
    moodDistribution: processedStats.map(stat => ({
      mood: stat.mood,
      percentage: Math.round((stat.count / totalMoods) * 100) || 0,
      count: stat.count
    })),
    averageMood: processedStats.reduce((sum, stat) => {
      // Assign a numerical value to each mood for calculation
      const moodValues = {
        '😊': 5, '😍': 5, // Positive moods
        '😐': 3,           // Neutral
        '😢': 2, '😡': 1, '😴': 2 // Negative moods
      };
      return sum + (moodValues[stat.mood] || 3) * stat.count;
    }, 0) / totalMoods
  };
  
  res.status(200).json({
    success: true,
    data: {
      stats: processedStats,
      overall: overallStats
    }
  });
});

// @desc    Get mood entries by date
// @route   GET /api/moods/date/:date
// @access  Private
exports.getMoodsByDate = asyncHandler(async (req, res, next) => {
  const date = new Date(req.params.date);
  const nextDay = new Date(date);
  nextDay.setDate(date.getDate() + 1);
  
  const moods = await Mood.find({
    user: req.user.id,
    date: {
      $gte: date,
      $lt: nextDay
    }
  }).sort('-date');
  
  res.status(200).json({
    success: true,
    count: moods.length,
    data: moods
  });
});

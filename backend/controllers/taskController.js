const Task = require('../models/Task');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Private
exports.getTasks = asyncHandler(async (req, res, next) => {
  const { completed, dueDate, category, sort, fields } = req.query;
  
  // Build query
  let query = { user: req.user.id };
  
  // Filter by completion status
  if (completed) {
    query.completed = completed === 'true';
  }
  
  // Filter by due date
  if (dueDate) {
    const date = new Date(dueDate);
    const nextDay = new Date(date);
    nextDay.setDate(date.getDate() + 1);
    
    query.dueDate = {
      $gte: date,
      $lt: nextDay
    };
  }
  
  // Filter by category
  if (category) {
    query.category = category;
  }
  
  // Execute query
  let result = Task.find(query);
  
  // Select fields
  if (fields) {
    const fieldsList = fields.split(',').join(' ');
    result = result.select(fieldsList);
  }
  
  // Sort
  if (sort) {
    const sortList = sort.split(',').join(' ');
    result = result.sort(sortList);
  } else {
    result = result.sort('dueDate');
  }
  
  const tasks = await result;
  
  res.status(200).json({
    success: true,
    count: tasks.length,
    data: tasks
  });
});

// @desc    Get single task
// @route   GET /api/tasks/:id
// @access  Private
exports.getTask = asyncHandler(async (req, res, next) => {
  const task = await Task.findOne({
    _id: req.params.id,
    user: req.user.id
  });

  if (!task) {
    return next(
      new ErrorResponse(`Task not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: task
  });
});

// @desc    Create new task
// @route   POST /api/tasks
// @access  Private
exports.createTask = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.user = req.user.id;

  const task = await Task.create(req.body);

  res.status(201).json({
    success: true,
    data: task
  });
});

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
exports.updateTask = asyncHandler(async (req, res, next) => {
  let task = await Task.findById(req.params.id);

  if (!task) {
    return next(
      new ErrorResponse(`Task not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is task owner
  if (task.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this task`,
        401
      )
    );
  }

  task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: task
  });
});

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
exports.deleteTask = asyncHandler(async (req, res, next) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return next(
      new ErrorResponse(`Task not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is task owner
  if (task.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete this task`,
        401
      )
    );
  }

  await task.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Get task statistics
// @route   GET /api/tasks/stats
// @access  Private
exports.getTaskStats = asyncHandler(async (req, res, next) => {
  const stats = await Task.aggregate([
    {
      $match: { user: req.user._id }
    },
    {
      $group: {
        _id: '$completed',
        count: { $sum: 1 },
        avgPriority: { $avg: { $cond: [
          { $eq: ['$priority', 'high'] }, 3, 
          { $cond: [
            { $eq: ['$priority', 'medium'] }, 2, 
            1
          ]}
        ]}},
        minDueDate: { $min: '$dueDate' },
        maxDueDate: { $max: '$dueDate' }
      }
    },
    {
      $sort: { _id: 1 }
    }
  ]);

  res.status(200).json({
    success: true,
    data: stats
  });
});

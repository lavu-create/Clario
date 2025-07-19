const Event = require('../models/Event');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Get all events
// @route   GET /api/events
// @access  Private
exports.getEvents = asyncHandler(async (req, res, next) => {
  const { start, end, category } = req.query;
  
  // Build query
  let query = { user: req.user.id };
  
  // Filter by date range
  if (start && end) {
    query.start = { $gte: new Date(start) };
    query.end = { $lte: new Date(end) };
  }
  
  // Filter by category
  if (category) {
    query.category = category;
  }
  
  const events = await Event.find(query).sort('start');
  
  res.status(200).json({
    success: true,
    count: events.length,
    data: events
  });
});

// @desc    Get single event
// @route   GET /api/events/:id
// @access  Private
exports.getEvent = asyncHandler(async (req, res, next) => {
  const event = await Event.findOne({
    _id: req.params.id,
    user: req.user.id
  });

  if (!event) {
    return next(
      new ErrorResponse(`Event not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: event
  });
});

// @desc    Create new event
// @route   POST /api/events
// @access  Private
exports.createEvent = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.user = req.user.id;

  const event = await Event.create(req.body);

  res.status(201).json({
    success: true,
    data: event
  });
});

// @desc    Update event
// @route   PUT /api/events/:id
// @access  Private
exports.updateEvent = asyncHandler(async (req, res, next) => {
  let event = await Event.findById(req.params.id);

  if (!event) {
    return next(
      new ErrorResponse(`Event not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is event owner
  if (event.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this event`,
        401
      )
    );
  }

  event = await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: event
  });
});

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Private
exports.deleteEvent = asyncHandler(async (req, res, next) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    return next(
      new ErrorResponse(`Event not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is event owner
  if (event.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete this event`,
        401
      )
    );
  }

  await event.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Get events by date range
// @route   GET /api/events/range
// @access  Private
exports.getEventsByDateRange = asyncHandler(async (req, res, next) => {
  const { start, end } = req.query;
  
  if (!start || !end) {
    return next(
      new ErrorResponse('Please provide start and end dates', 400)
    );
  }
  
  const events = await Event.find({
    user: req.user.id,
    $or: [
      // Event starts within the range
      { 
        start: { $gte: new Date(start), $lte: new Date(end) } 
      },
      // Event ends within the range
      { 
        end: { $gte: new Date(start), $lte: new Date(end) } 
      },
      // Event spans the entire range
      { 
        start: { $lte: new Date(start) },
        end: { $gte: new Date(end) }
      }
    ]
  }).sort('start');
  
  res.status(200).json({
    success: true,
    count: events.length,
    data: events
  });
});

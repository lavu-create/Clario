const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Task = require('../models/Task');
const Event = require('../models/Event');
const Mood = require('../models/Mood');
const bcrypt = require('bcryptjs');

// Load environment variables
dotenv.config({ path: './config/config.env' });

// Connect to database
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Import data
const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: '123456',
    role: 'admin',
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: '123456',
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: '123456',
  },
];

const tasks = [
  {
    title: 'Complete project proposal',
    description: 'Finish the project proposal document',
    dueDate: new Date('2023-06-15'),
    priority: 'high',
    category: 'work',
  },
  {
    title: 'Buy groceries',
    description: 'Milk, eggs, bread, fruits',
    dueDate: new Date('2023-06-10'),
    priority: 'medium',
    category: 'personal',
  },
];

const events = [
  {
    title: 'Team Meeting',
    description: 'Weekly team sync',
    start: new Date('2023-06-12T10:00:00'),
    end: new Date('2023-06-12T11:00:00'),
    category: 'work',
  },
  {
    title: 'Dentist Appointment',
    start: new Date('2023-06-15T14:00:00'),
    end: new Date('2023-06-15T15:00:00'),
    category: 'personal',
  },
];

const moods = [
  {
    mood: '😊',
    note: 'Feeling great today!',
    activities: ['work', 'exercise'],
    intensity: 4,
  },
  {
    mood: '😐',
    note: 'Average day',
    activities: ['work'],
    intensity: 3,
  },
];

// Import data into database
const importData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Task.deleteMany();
    await Event.deleteMany();
    await Mood.deleteMany();

    // Create users
    const createdUsers = [];
    for (const user of users) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      const newUser = await User.create(user);
      createdUsers.push(newUser);
    }

    // Create tasks and events for each user
    for (const user of createdUsers) {
      // Create tasks
      const userTasks = tasks.map(task => ({
        ...task,
        user: user._id,
      }));
      await Task.insertMany(userTasks);

      // Create events
      const userEvents = events.map(event => ({
        ...event,
        user: user._id,
      }));
      await Event.insertMany(userEvents);

      // Create mood entries for the past 7 days
      const moodEntries = [];
      for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        
        const randomMood = moods[Math.floor(Math.random() * moods.length)];
        
        moodEntries.push({
          ...randomMood,
          user: user._id,
          date,
        });
      }
      await Mood.insertMany(moodEntries);
    }

    console.log('Data imported successfully');
    process.exit();
  } catch (error) {
    console.error('Error importing data:', error);
    process.exit(1);
  }
};

// Delete data from database
const deleteData = async () => {
  try {
    await User.deleteMany();
    await Task.deleteMany();
    await Event.deleteMany();
    await Mood.deleteMany();

    console.log('Data deleted successfully');
    process.exit();
  } catch (error) {
    console.error('Error deleting data:', error);
    process.exit(1);
  }
};

// Handle command line arguments
if (process.argv[2] === '-d') {
  deleteData();
} else {
  importData();
}

const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

// Connect to Database;
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the Clario Backend API' });
});

/**USER ROUTES */
// User Auth Routes
app.use('/api/users', require('./routes/userRoutes'));

// User Tasks Routes
// app.use('/api/users/tasks', require('./routes/users/taskRoutes'));

// Resource Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})
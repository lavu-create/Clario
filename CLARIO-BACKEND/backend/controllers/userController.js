const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const { generateToken } = require('../utils/generateToken');

// @desc: Register a new user
// @route: POST /api/users/register
// @access: Public

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    // Validation:
    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please include all fields');
    }

    // Find if user already exists
    const isUserExist = await User.findOne({ email: email });

    if (isUserExist) {
        res.status(400);
        throw new Error('User already exists');
    }

    // Hash Password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create User;
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id, process.env.JWT_USER_SECRET),
        });
    }
    else {
        res.status(400);
        throw new Error('Invalid user data');
    }
})

// @desc: Login a user user
// @route: POST /api/users/login
// @access: Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Validation:
    if (!email || !password) {
        res.status(400);
        throw new Error('Please enter correct credentials');
    }

    // Check if user already exists;
    const user = await User.findOne({ email: email });

    // UnHash Password;
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    // Check user and password;
    if (user && isPasswordCorrect) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id, process.env.JWT_USER_SECRET),
        });
    }
    else {
        res.status(401)
        throw new Error('Invalid credentials');
    }
});

// @desc    Get current user 
// @route   GET /api/users/me
// @access  Private

const getMeUser = asyncHandler(async (req, res) => {
    const currUser = req.user;
    const formattedUser = {
        "id": currUser._id,
        "name": currUser.name,
        "email": currUser.email,
        "isAdmin": currUser.isAdmin,
    };

    res.status(200).json(formattedUser);
})

module.exports = { registerUser, loginUser, getMeUser };
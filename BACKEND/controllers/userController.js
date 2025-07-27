const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

const User = require("../models/userModel");
const { generateToken } = require("../helper/generateToken");

// @desc    Register a new user
// @route   /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // validation;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  // find if user already exists;
  const isUserExists = await User.findOne({ email: email });

  if (isUserExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //   create user;
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
      token: generateToken(user._id, process.env.JWT_SECRET, "30d"),
    });
  } else {
    res.status(400);
    throw new error("Invalid user data");
  }
});

// @desc    Login a user
// @route   /api/users/login
// @access  Public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    res.status(400);
    throw new Error("Please enter correct credentials");
  }

  // Check if user already exists;
  const user = await User.findOne({ email: email });

  if (!user) {
    res.status(401);
    throw new Error("Invalid Credentials");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (user && isPasswordCorrect) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id, process.env.JWT_SECRET, "30d"),
    });
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }
});

module.exports = {
  registerUser,
  loginUser,
};

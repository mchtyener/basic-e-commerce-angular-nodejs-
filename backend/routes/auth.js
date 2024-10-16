const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const userValidationSchema = require('../validations/userValidation');
const router = express.Router();
const jwtHelper = require('../helpers/jwtHelper');
const tokenBlacklist = require('../models/TokenBlacklist');

router.post('/logout', async (req, res) => {
  try {
    const authHeader = req.header('Authorization');

    if (!authHeader) {
      return res
        .status(400)
        .json({ message: 'Authorization header is missing' });
    }

    const token = authHeader.replace('Bearer ', '');

    if (!token) {
      return res.status(400).json({ message: 'Token is missing' });
    }

    await tokenBlacklist.create({ token });
    res.status(200).json({ message: 'Successfully logged out', success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', success: false });
  }
});

router.post('/register', async (req, res) => {
  const { error } = userValidationSchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ message: error.details[0].message, success: false });
  }

  const { firstName, lastName, email, password, confirmPassword, phone, role } =
    req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
      role: role || 'user',
    }).save();

    const token = jwtHelper.generateToken(newUser);

    res.status(201).json({
      success: true,
      token,
      id: newUser._id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      role: newUser.role,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwtHelper.generateToken(user);

    res.status(200).json({
      token,
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

const express = require('express');
const adminRoutes = require('./admin');
const userRoutes = require('./user');
const authRoutes = require('./auth');
const restaurantRoutes = require('./restaurant');
const uploadRoutes = require('./upload');
const authenticateToken = require('../middleware/authMiddleware');
const authorizeRole = require('../middleware/roleMiddleware');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('', uploadRoutes);
router.use('', restaurantRoutes);
router.use('/admin', authenticateToken, authorizeRole('admin'), adminRoutes);
router.use('/user', authenticateToken, authorizeRole('user'), userRoutes);

module.exports = router;

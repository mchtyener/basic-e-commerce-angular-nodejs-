// routes/user.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('User Home Page');
});

router.get('/profile', (req, res) => {
  res.send('User Profile');
});

module.exports = router;

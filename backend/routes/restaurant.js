const express = require('express');
const router = express.Router();
const Restaurant = require('../models/restaurant');

router.get('/restaurants', async (req, res) => {
  try {
    const restaurants = await Restaurant.find();

    const restaurant = restaurants.map((restaurant) => {
      const imageUrl = restaurant.image
        ? `${req.protocol}://${req.get('host')}/uploads/${restaurant.image}`
        : null;

      return {
        ...restaurant.toObject(),
        image: imageUrl,
      };
    });

    res.status(200).json({
      success: true,
      restaurants: restaurant,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.get('/restaurants/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.status(201).json({
      success: true,
      restaurant,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;

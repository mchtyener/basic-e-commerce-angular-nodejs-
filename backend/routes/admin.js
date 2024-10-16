const express = require('express');
const router = express.Router();
const Restaurant = require('../models/restaurant');
const { Product, SubCategory } = require('../models/product');

router.post('/restaurant', async (req, res) => {
  const {
    name,
    address,
    phone,
    email,
    logo,
    banner,
    opening_time,
    closing_time,
    description,
    minimum_order_amount,
  } = req.body;

  const isValidTime = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    if (isNaN(hours) || isNaN(minutes)) return false;
    if (hours < 0 || hours > 23) return false;
    if (minutes < 0 || minutes > 59) return false;
    return true;
  };

  if (
    !logo ||
    !banner ||
    !opening_time ||
    !closing_time ||
    !description ||
    minimum_order_amount === undefined
  ) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (!isValidTime(opening_time) || !isValidTime(closing_time)) {
    return res.status(400).json({
      message: 'Opening time and closing time must be in hh:mm format',
    });
  }

  try {
    const existingRestaurant = await Restaurant.findOne({ name });

    if (existingRestaurant) {
      return res
        .status(400)
        .json({ message: 'A restaurant with this name already exists' });
    }

    const newRestaurant = new Restaurant({
      name,
      address,
      phone,
      email,
      logo,
      banner,
      opening_time,
      closing_time,
      description,
      minimum_order_amount,
    });

    await newRestaurant.save();

    res.status(201).json({
      success: true,
      data: newRestaurant,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/restaurant/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const deletedRestaurant = await Restaurant.findByIdAndDelete(id);

    if (!deletedRestaurant) {
      return res
        .status(404)
        .json({ message: 'Restaurant not found', success: false });
    }

    res.status(200).json({
      message: 'Restaurant deleted successfully',
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred while deleting the restaurant',
      success: false,
    });
  }
});

router.post('/restaurants/:restaurantId/products', async (req, res) => {
  const { name, description, price, categories, isAvailable, image } = req.body;
  const { restaurantId } = req.params;

  try {
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    const newProduct = new Product({
      name,
      description,
      price,
      image,
      company: restaurant._id,
      categories,
      isAvailable,
    });

    const savedProduct = await newProduct.save();

    res.status(201).json({
      message: 'Product created successfully',
      product: savedProduct,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/restaurants', async (req, res) => {
  try {
    const restaurant = await Restaurant.find();
    res.status(200).json(restaurant);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/restaurants/:restaurantId/products', async (req, res) => {
  const { restaurantId } = req.params;

  try {
    const products = await Product.find({ restaurant: restaurantId });
    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: 'No products found for this restaurant' });
    }
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/subcategories', async (req, res) => {
  const { name, company } = req.body;

  try {
    const existingCompany = await Company.findById(company);
    if (!existingCompany) {
      return res.status(404).json({
        success: false,
        message: 'Company not found.',
      });
    }
    const newSubCategory = new SubCategory({ name, company });
    const savedSubCategory = await newSubCategory.save();

    res.status(201).json({
      success: true,
      category: savedSubCategory,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;

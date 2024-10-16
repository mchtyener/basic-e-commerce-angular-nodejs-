const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  logo: { type: String, required: true },
  banner: { type: String, required: true },
  address: { type: String, required: true },
  opening_time: { type: String, required: true },
  closing_time: { type: String, required: true },
  description: { type: String, required: true },
  minimum_order_amount: { type: Number, required: true },
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;

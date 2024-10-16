const Product = require('../models/product');

const addProduct = async (productData) => {
  try {
    const newProduct = new Product(productData);
    await newProduct.save();
    return newProduct;
  } catch (error) {
    throw new Error('Error adding product: ' + error.message);
  }
};

module.exports = {
  addProduct,
};

const Product = require('../models/productModel');

// GET all products
const getProducts = async (req, res) => {
 
  try {
    const products = await Product.find({});
    res.json(products);
    console.log(products);
  } catch (error) {
    console.error('Failed to fetch products:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET single product by ID
const getProductById = async (req, res) => {
  console.log("Fetching product with ID:", req.params.id);
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error('Failed to fetch product:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// POST: Reduce product stock by 1
const reduceProductStock = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.countInStock <= 0) {
      return res.status(400).json({ message: 'Out of stock' });
    }

    product.countInStock -= 1;
    await product.save();

    res.json({ message: 'Stock reduced', countInStock: product.countInStock });
  } catch (error) {
    console.error('Failed to reduce stock:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
// In productController.js
// In productController.js
const increaseProductStock = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    const qty = parseInt(req.body.qty) || 1;

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.countInStock += qty;
    await product.save();

    res.json({ message: 'Stock increased', countInStock: product.countInStock });
  } catch (error) {
    console.error('Failed to increase stock:', error);
    res.status(500).json({ message: 'Server error' });
  }
};




module.exports = {
  getProducts,
  getProductById,
  reduceProductStock,
  increaseProductStock
};

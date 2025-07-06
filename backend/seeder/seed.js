// seed.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/productModel');
const connectDB = require('../config/db');
const products = require('./products.json');

dotenv.config();
connectDB();

const seedData = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log('✅ Sample data imported!');
    process.exit();
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

seedData();

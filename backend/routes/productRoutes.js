const express = require('express');
const router = express.Router();
const { getProducts, getProductById , reduceProductStock,increaseProductStock} = require('../controllers/productController');

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/reduce-stock/:id', reduceProductStock);
router.post('/increase-stock/:id', increaseProductStock);


module.exports = router;

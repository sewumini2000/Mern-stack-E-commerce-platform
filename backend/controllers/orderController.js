// controllers/orderController.js
const Order = require('../models/orderModel');

// controllers/orderController.js
// controllers/orderController.js
const placeOrder = async (req, res) => {
  const { items, address } = req.body;

  console.log('Incoming order:', { user: req.user, items, address });

  const order = new Order({
    user: req.user?._id, // Optional chaining to prevent crash
    items,
    address,
    isPaid: false,
  });

  try {
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    console.error('Error placing order:', error); // See exact Mongoose or logic error
    res.status(500).json({ message: 'Error placing order', error: error.message });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders' });
  }
};


module.exports = { placeOrder,getUserOrders };

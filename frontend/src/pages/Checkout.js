import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, Button, TextField, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from '../axios';
import { clearCart } from '../redux/cartSlice';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items } = useSelector((state) => state.cart);
  const userInfo = useSelector((state) => state.user.userInfo);

  const [address, setAddress] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handlePlaceOrder = async () => {
    if (!userInfo || !userInfo.token) {
      setError('You must be logged in to place an order.');
      return;
    }

    if (!address.trim()) {
      setError('Please provide a shipping address.');
      return;
    }

    const orderItems = items.map((item) => ({
      name: item.name,
      quantity: item.qty,
      price: item.price,
      image: item.image,
      product: item._id,
    }));

    try {
      const { data } = await axios.post(
        'http://localhost:5000/api/orders',
        { items: orderItems, address },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      // ✅ Clear the cart after placing the order
      dispatch(clearCart());

      // ✅ Show success and redirect
      setMessage('Order placed successfully!');
      setTimeout(() => navigate('/profile'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Order placement failed.');
    }
  };

  return (
    <Box sx={{ padding: '2rem', maxWidth: 600, margin: '0 auto' }}>
      <Typography variant="h4" sx={{ marginBottom: '2rem' }}>
        Checkout
      </Typography>

      {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <TextField
        fullWidth
        multiline
        rows={3}
        label="Shipping Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        sx={{ marginBottom: '1.5rem' }}
      />

      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={handlePlaceOrder}
        disabled={items.length === 0}
      >
        Place Order
      </Button>
    </Box>
  );
};

export default Checkout;

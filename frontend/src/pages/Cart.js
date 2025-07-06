import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, Button, CardMedia, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { decreaseQty } from '../redux/cartSlice';
import axios from '../axios';

const Cart = () => {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalPrice = items
    .reduce((acc, item) => acc + item.price * item.qty, 0)
    .toFixed(2);

  const handleRemoveFromCart = async (itemId) => {
    dispatch(decreaseQty(itemId));
    try {
      await axios.post(`/api/products/increase-stock/${itemId}`, {
        qty: 1,
      });
    } catch (error) {
      console.error('Error increasing stock:', error);
    }
  };

  return (
    <Box sx={{ padding: '2rem' }}>
      <Typography variant="h4" sx={{ marginBottom: '2rem' }}>
        Your Cart
      </Typography>

      {items.length === 0 ? (
        <Typography>No items in the cart</Typography>
      ) : (
        items.map((item) => (
          <Box
            key={item._id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.5rem',
              border: '1px solid #ccc',
              borderRadius: '12px',
              padding: '1rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            }}
          >
            <CardMedia
              component="img"
              image={`http://localhost:5000${item.image}`}
              alt={item.name}
              sx={{
                width: 80,
                height: 80,
                objectFit: 'cover',
                marginRight: '1rem',
                borderRadius: '8px',
              }}
            />
            <Typography sx={{ flexGrow: 1, fontWeight: 500 }}>
              {item.name}

            </Typography>

            <Stack direction="row" spacing={3} alignItems="center">
              <Typography>Qty: {item.qty}</Typography>
              <Typography>${(item.price * item.qty).toFixed(2)}</Typography>
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleRemoveFromCart(item._id)}
                sx={{ borderRadius: '20px', paddingX: 2 }}
              >
                Remove
              </Button>
            </Stack>
          </Box>
        ))
      )}

      {items.length > 0 && (
        <Box
          sx={{
            marginTop: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Total Price: ${totalPrice}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ borderRadius: '8px' }}
            onClick={() => navigate('/checkout')}
          >
            Proceed to Checkout
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Cart;

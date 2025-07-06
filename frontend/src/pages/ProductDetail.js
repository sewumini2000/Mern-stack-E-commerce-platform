import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../axios';
import { Box, Typography, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const userInfo = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
      setProduct(data);
      console.log(data);
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!userInfo) {
      navigate('/login');
    } else {
      // Add product to Redux store
      dispatch(addToCart(product));
  
      // Update localStorage
      const storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
      const existing = storedCart.find((item) => item._id === product._id);
      let updatedCart;
      if (existing) {
        updatedCart = storedCart.map((item) =>
          item._id === product._id ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        updatedCart = [...storedCart, { ...product, qty: 1 }];
      }
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  
      // Reduce stock via backend
      try {
        await axios.post(`http://localhost:5000/api/products/reduce-stock/${product._id}`);
      } catch (error) {
        console.error('Error reducing stock:', error);
        alert('Failed to reduce stock. Please try again.');
      }
  
      // Redirect to cart page
      navigate('/cart');
    }
  };
  

  if (!product) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ padding: '2rem', maxWidth: '800px', margin: 'auto' }}>
<img
  src={`http://localhost:5000${product.image}`}
  alt={product.name}
  style={{ width: '50%', height: 'auto' }}
/>
      <Typography variant="h4" sx={{ marginTop: '1rem' }}>{product.name}</Typography>
      <Typography variant="body1" sx={{ marginTop: '1rem' }}>{product.description}</Typography>
      <Typography variant="h5" sx={{ marginTop: '1rem' }}>${product.price}</Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ marginTop: '1rem' }}
        onClick={handleAddToCart}
      >
        Add to Cart
      </Button>
    </Box>
  );
};

export default ProductDetail;

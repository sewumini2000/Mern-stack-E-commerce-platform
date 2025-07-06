import React, { useEffect } from 'react';
import axios from '../axios';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '../redux/productSlice';
import ProductCard from '../components/ProductCard';
import { Grid } from '@mui/material';

const Home = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('/api/products');
        dispatch(setProducts(data));
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };
    fetchProducts();
  }, [dispatch]);

  return (
    <Grid container spacing={3} sx={{ padding: '2rem' }}>
      {products.map((product) => (
        <Grid xs={12} sm={6} md={4} key={product._id}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Home;

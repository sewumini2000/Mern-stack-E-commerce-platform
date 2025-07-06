import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

const ProductCard = ({ product }) => (
  <Card sx={{ maxWidth: 345, margin: '1rem' }}>
    <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
      <CardMedia
        component="img"
        height="200"
        image={`http://localhost:5000${product.image}`}
        alt={product.name}
      />
      <CardContent>
        <Typography variant="h6">{product.name}</Typography>
        <Typography variant="body2" color="text.secondary">${product.price}</Typography>
      </CardContent>
    </Link>
  </Card>
);

export default ProductCard;

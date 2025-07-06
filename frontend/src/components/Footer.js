import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => (
  <Box component="footer" sx={{ textAlign: 'center', padding: '1rem', backgroundColor: '#f1f1f1' }}>
    <Typography variant="body2" color="textSecondary">
      © 2025 E-Commerce App
    </Typography>
  </Box>
);

export default Footer;

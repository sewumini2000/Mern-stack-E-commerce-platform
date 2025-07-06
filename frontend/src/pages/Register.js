import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import axios from '../axios';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState(null);

  const handleRegister = async () => {
    try {
      const response = await axios.post('/api/users/register', form);
      console.log('User registered successfully:', response.data);
      // Redirect to login page after successful registration
      window.location.href = '/login';
    } catch (err) {
      // Log the error to see the response from the backend
      console.error('Registration error:', err.response ? err.response.data : err.message);
      setError(err.response?.data?.message || 'Something went wrong!');
    }
  };
  

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: 400, margin: 'auto' }}>
      {error && <Typography color="error">{error}</Typography>}
      <TextField
        label="Name"
        variant="outlined"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        margin="normal"
      />
      <TextField
        label="Email"
        variant="outlined"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        margin="normal"
      />
      <TextField
        label="Password"
        variant="outlined"
        type="password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleRegister} sx={{ marginTop: 2 }}>
        Register
      </Button>
    </Box>
  );
};

export default Register;

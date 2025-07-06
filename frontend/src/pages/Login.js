import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import axios from '../axios';
import { loginSuccess } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom'; // <-- Import useNavigate

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate(); // <-- Initialize navigate

  const handleLogin = async () => {
    try {
      const { data } = await axios.post('/api/users/login', { email, password });
      console.log('Login successful:', data);
      dispatch(loginSuccess(data));
      navigate('/'); // <-- Redirect to home page
    } catch (error) {
      console.log('Login failed:', error.response?.data?.message || error.message);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: 400, margin: 'auto' }}>
      <TextField
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Password"
        variant="outlined"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleLogin} sx={{ marginTop: 2 }}>
        Login
      </Button>
    </Box>
  );
};

export default Login;

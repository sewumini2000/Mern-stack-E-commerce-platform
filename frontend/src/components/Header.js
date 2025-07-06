import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/userSlice';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Left-aligned navigation */}
        <Box sx={{ flexGrow: 1 }}>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/cart">Cart</Button>
        </Box>

        {/* Right-aligned buttons */}
        <Box>
          {userInfo ? (
            <>
              <Button 
                color="inherit" 
                component={Link} 
                to="/profile"
                sx={{ ml: 1 }}
              >
                Profile
              </Button>
              <Button 
                color="error" 
                variant="contained" 
                onClick={handleLogout}
                sx={{ ml: 1, '&:hover': { backgroundColor: 'darkred' } }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login" sx={{ ml: 1 }}>
                Login
              </Button>
              <Button color="inherit" component={Link} to="/register" sx={{ ml: 1 }}>
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

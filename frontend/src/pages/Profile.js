import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Typography,
  List,
  ListItem,
  Divider,
  CardMedia,
  Stack,
} from '@mui/material';
import axios from '../axios';

const Profile = () => {
  const { userInfo } = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (userInfo?.token) {
        try {
          const { data } = await axios.get('http://localhost:5000/api/orders/myorders', {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          });
          setOrders(data);
        } catch (error) {
          console.error('Failed to fetch orders:', error);
        }
      }
    };

    fetchOrders();
  }, [userInfo]);

  return (
    <Box sx={{ padding: '2rem' }}>
      {userInfo ? (
        <>
          <Typography variant="h5">Hello, {userInfo.name}</Typography>
          <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
            Your Order History...
          </Typography>
          <List>
            {orders.map((order) => (
              <React.Fragment key={order._id}>
                <ListItem sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                  <Typography sx={{ fontWeight: 'bold' }}>
                    Order ID: {order._id}
                  </Typography>
                  <Typography>
                    Date: {new Date(order.createdAt).toLocaleDateString()}
                  </Typography>
                  <Typography>Status: {order.isPaid ? 'Paid' : 'Pending'}</Typography>
                  <Typography sx={{ mt: 1, fontWeight: 500 }}>Items:</Typography>

                  {order.items.map((item, index) => (
                    <Stack
                      key={index}
                      direction="row"
                      spacing={2}
                      alignItems="center"
                      sx={{ mt: 1 }}
                    >
                      <CardMedia
                        component="img"
                        image={`http://localhost:5000${item.image}`}
                        alt={item.name}
                        sx={{ width: 60, height: 60, borderRadius: 1, objectFit: 'cover' }}
                      />
                      <Typography>{item.name}</Typography>
                      <Typography>Qty: {item.quantity}</Typography>
                    </Stack>
                  ))}
                </ListItem>
                <Divider sx={{ my: 2 }} />
              </React.Fragment>
            ))}
          </List>
        </>
      ) : (
        <Typography variant="h5">Not logged in</Typography>
      )}
    </Box>
  );
};

export default Profile;

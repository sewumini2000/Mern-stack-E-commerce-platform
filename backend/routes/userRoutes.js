// routes/userRoutes.js
const express = require('express');
const { loginUser, registerUser, getUserProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/profile', protect, getUserProfile);

module.exports = router;

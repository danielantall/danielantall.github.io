const express = require('express');
const { forgotPassword, verifyResetToken, resetPassword } = require('../controllers/authController');

const router = express.Router();

router.post('/forgot-password', forgotPassword); // Generate reset token and send email
router.get('/reset-password/:token', verifyResetToken); // Verify reset token
router.post('/reset-password/:token', resetPassword); // Reset the password

module.exports = router;

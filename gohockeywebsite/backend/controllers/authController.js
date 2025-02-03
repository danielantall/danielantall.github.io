const crypto = require('crypto');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const User = require('../models/User'); // Import the user model

const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key'; // Environment variable for security
const TOKEN_EXPIRY = process.env.TOKEN_EXPIRY || 3600000; // Token expiry time (1 hour)
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000'; // Frontend URL

// Forgot Password: Generate reset token
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    // Check if the user exists
    const user = await User.findByEmail(email);
    console.log('User found:', user); // Debug log
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate reset token and expiry
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = Math.floor(Date.now() / 1000) + Math.floor(TOKEN_EXPIRY / 1000); // Store expiry as Unix timestamp in seconds

    console.log('Generated resetToken:', resetToken); // Debug log
    console.log('Generated resetTokenExpiry:', resetTokenExpiry); // Debug log

    // Save token and expiry in the database
    await User.saveResetToken(user.userId, resetToken, resetTokenExpiry);

    // Generate reset link
    const resetUrl = `${FRONTEND_URL}/reset-password/${resetToken}`;
    console.log('Generated reset URL:', resetUrl); // Debug log

    // Send email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL, // Your email
        pass: process.env.EMAIL_PASSWORD, // Your email password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Password Reset Request',
      html: `<p>Click <a href="${resetUrl}">here</a> to reset your password. This link will expire in 1 hour.</p>`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Password reset email sent' });
  } catch (err) {
    console.error('Error in forgot password:', err); // Debug log
    res.status(500).json({ message: 'Server error' });
  }
};

// Verify Reset Token
const verifyResetToken = async (req, res) => {
  const { token } = req.params;

  try {
    // Validate the token
    const user = await User.findByResetToken(token);
    console.log('User found by token:', user); // Debug log
    if (!user) {
      return res.status(404).json({ message: 'Token not found' });
    }
    if (user.resetTokenExpiry < Math.floor(Date.now() / 1000)) { // Compare expiry in seconds
      return res.status(400).json({ message: 'Reset token expired' });
    }

    res.status(200).json({ message: 'Token is valid' });
  } catch (err) {
    console.error('Error verifying reset token:', err); // Debug log
    res.status(500).json({ message: 'Server error' });
  }
};

// Reset Password
const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password, confirmPassword } = req.body;

  if (!password || !confirmPassword) {
    return res.status(400).json({ message: 'Both password fields are required' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    const user = await User.findByResetToken(token);
    console.log('User found by token for reset password:', user); // Debug log
    if (!user) {
      return res.status(404).json({ message: 'Token not found' });
    }
    if (user.resetTokenExpiry < Math.floor(Date.now() / 1000)) { // Compare expiry in seconds
      return res.status(400).json({ message: 'Reset token expired' });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Hash the new password
    await User.updatePassword(user.userId, hashedPassword); // Update the password
    await User.clearResetToken(user.userId); // Clear the reset token

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (err) {
    console.error('Error resetting password:', err); // Debug log
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { forgotPassword, verifyResetToken, resetPassword };

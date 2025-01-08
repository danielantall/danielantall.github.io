const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import the User model
const SECRET_KEY = 'your_secret_key'; // Use an environment variable in production

// Register a new user
const registerUser = async (req, res) => {
  const { firstName, lastName, email, password, phone, postalCode } = req.body;

  // Validate input
  if (!firstName || !lastName || !email || !password || !phone || !postalCode) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user to the database
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
      postalCode,
    });

    res.status(201).json({ message: 'User registered successfully', userId: newUser.insertId });
  } catch (err) {
    console.error(err);

    // Handle duplicate email error (if email is set as unique in the database)
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ message: 'Email already exists' });
    }

    res.status(500).json({ message: 'Error registering user' });
  }
};

// Log in an existing user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Check if the user exists
    const users = await User.findByEmail(email);
    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = users[0];

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token, user: { id: user.id, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error logging in' });
  }
};

module.exports = { registerUser, loginUser };

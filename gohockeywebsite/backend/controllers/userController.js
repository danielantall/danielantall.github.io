const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import the User model
const SECRET_KEY = 'your_secret_key'; // Use an environment variable in production

// Register a new user
const registerUser = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  // Validate input
  if (!username || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Check if passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    console.log('Incoming request body:', req.body);

    // Check if email already exists
    const existingUsers = await User.findByEmail(email);
    console.log('Existing users by email:', existingUsers);
    if (existingUsers.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Check if username already exists
    const existingUsersByUsername = await User.findByUsername(username);
    console.log('Existing users by username:', existingUsersByUsername);
    if (existingUsersByUsername.length > 0) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed password:', hashedPassword);

    // Save user to the database
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    console.log('New user created:', newUser);

    res.status(201).json({ message: 'User registered successfully', userId: newUser.insertId });
  } catch (err) {
    console.error('Error during user registration:', err);

    // Handle duplicate email error
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ message: 'Email or username already exists' });
    }

    res.status(500).json({ message: 'Error registering user' });
  }
};


// Log in an existing user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const users = await User.findByEmail(email); // Returns rows from `findByEmail`
    console.log('Existing users by email:', users);

    if (!users || users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = users[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.userId, email: user.email }, SECRET_KEY, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token, user: { id: user.userId, email: user.email } });
  } catch (err) {
    console.error('Error logging in:', err);
    res.status(500).json({ message: 'Error logging in' });
  }
};


module.exports = { registerUser, loginUser };

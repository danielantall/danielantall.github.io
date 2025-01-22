const express = require('express');
const cors = require('cors');
const childRoutes = require('./routes/children');
const userRoutes = require('./routes/users');
const db = require('./config/db');

const app = express();
const PORT = 5002;

//middleware, origin[1] for frontend local host connection
app.use(cors({
  origin: ['http://localhost:4200', 'http://127.0.0.1:5500'],
  methods: 'GET,POST,PUT,DELETE', 
  credentials: true, 
}));
app.use(express.json());

//routes
app.use('/users', userRoutes);
app.use('/api', childRoutes);

app.get('/', (req, res) => {
  res.send('Backend is working');
});

//middleware error handling
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start Server
app.listen(PORT, 'localhost', () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


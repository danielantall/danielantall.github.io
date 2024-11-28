const express = require('express');
const cors = require('cors'); 
const db = require('./config/db'); 

const app = express();
const PORT = 4000; 

app.use(cors({
  origin: 'http://localhost:4200', 
  methods: 'GET,POST,PUT,DELETE', 
  credentials: true, 
}));

app.use(express.json());


const userRoutes = require('./routes/users'); 
const childRoutes = require('./routes/children'); 
app.use('/users', userRoutes);
app.use('/api', childRoutes); 

app.get('/', (req, res) => {
  res.send('Backend is working');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

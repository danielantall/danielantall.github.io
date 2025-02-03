const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });
const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  //type your local sql password in a .env and .gitignore
  password: process.env.YOUR_LOCAL_MYSQL_PASSWORD, 
  database: 'go_hockey_backend',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    //remove in deployment
    console.log('Connected to the MySQL database');
    //test query
    connection.query('SHOW TABLES', (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
      } else {
        //remove in deployment
        console.log('Tables in the database:', results);
      }
    });
  }
});

//initial connection errors
connection.on('error', (err) => {
  console.error('Database connection error:', err);
});

module.exports = connection;


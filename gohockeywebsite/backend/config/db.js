const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'go-hockey-backend',
  port: 3306
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1); // Exit the process on a failed connection
  }
  console.log('Connected to the MySQL database');

  // Test query
  connection.query('SHOW TABLES', (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
    } else {
      console.log('Tables in the database:', results);
    }
    process.exit(); // Close the process after testing
  });
});


module.exports = connection;

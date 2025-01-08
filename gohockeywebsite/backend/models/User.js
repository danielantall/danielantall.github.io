const db = require('../config/db'); // Import database connection from db.js file

const User = {
  create: (userData) => {
    const query = `INSERT INTO users (first_name, last_name, email, password, phone, postal_code) VALUES (?, ?, ?, ?, ?, ?)`;
    return db.promise().query(query, [
      userData.firstName,
      userData.lastName,
      userData.email,
      userData.password,
      userData.phone,
      userData.postalCode,
    ]);
  },

  findByEmail: (email) => {
    const query = `SELECT * FROM users WHERE email = ?`;
    return db.promise().query(query, [email]);
  },
};

module.exports = User;

const db = require('../config/db'); 

const User = {
  create: (userData) => {
    const query = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
    return db.promise().query(query, [
      userData.username,
      userData.email,
      userData.password,
    ]);
  },

  findByEmail: (email) => {
    const query = `SELECT * FROM users WHERE email = ?`;
    return db.promise().query(query, [email]).then(([rows]) => rows); // Ensure only rows are returned
  },

  findByUsername: (username) => {
    const query = `SELECT * FROM users WHERE username = ?`;
    return db.promise().query(query, [username]).then(([rows]) => rows); // Ensure only rows are returned
  },
};

module.exports = User;

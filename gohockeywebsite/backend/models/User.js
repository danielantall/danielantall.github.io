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

  findByEmail: async (email) => {
    const query = `SELECT * FROM users WHERE email = ?`;
    try {
      const [rows] = await db.promise().query(query, [email]);
      console.log(`User fetched by email:`, rows); // Debug log
      return rows[0] || null; // Return the first user or null if no users found
    } catch (err) {
      console.error('Error finding user by email:', err);
      throw err;
    }
  },
  

  saveResetToken: (userId, resetToken, resetTokenExpiry) => {
    console.log(`Saving reset token for userId: ${userId}, token: ${resetToken}, expiry: ${resetTokenExpiry}`);
    const query = `UPDATE users SET resetToken = ?, resetTokenExpiry = ? WHERE userId = ?`;
    return db.promise().query(query, [resetToken, resetTokenExpiry, userId]);
  },

  findByResetToken: async (resetToken) => {
    const query = `SELECT * FROM users WHERE resetToken = ? AND resetTokenExpiry > UNIX_TIMESTAMP()`;
    try {
      const [rows] = await db.promise().query(query, [resetToken]);
      console.log(`User fetched by reset token:`, rows);
      return rows[0];
    } catch (err) {
      console.error('Error finding user by reset token:', err);
      throw err;
    }
  },

  updatePassword: async (userId, hashedPassword) => {
    const query = `UPDATE users SET password = ?, resetToken = NULL, resetTokenExpiry = NULL WHERE userId = ?`;
    try {
      const result = await db.promise().query(query, [hashedPassword, userId]);
      console.log(`Password updated for userId ${userId}.`);
      return result;
    } catch (err) {
      console.error('Error updating password:', err);
      throw err;
    }
  },

  clearResetToken: async (userId) => {
    const query = `UPDATE users SET resetToken = NULL, resetTokenExpiry = NULL WHERE userId = ?`;
    try {
      const result = await db.promise().query(query, [userId]);
      console.log(`Reset token cleared for userId ${userId}.`);
      return result;
    } catch (err) {
      console.error('Error clearing reset token:', err);
      throw err;
    }
  },
};

module.exports = User;

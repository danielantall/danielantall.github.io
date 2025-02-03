const db = require('../config/db');

const Guardian = {
  create: (guardianData) => {
    const query = `
      INSERT INTO guardians (userId, firstName, lastName, phoneNumber, email, postalCode)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    return db.promise().query(query, [
      guardianData.userId,
      guardianData.firstName,
      guardianData.lastName,
      guardianData.phoneNumber,
      guardianData.email,
      guardianData.postalCode,
    ]);
  },

  findByUserId: (userId) => {
    const query = `SELECT * FROM guardians WHERE userId = ?`;
    return db.promise().query(query, [userId]).then(([rows]) => rows[0]); // Return the first row
  },

  update: (userId, guardianData) => {
    const query = `
      UPDATE guardians
      SET firstName = ?, lastName = ?, phoneNumber = ?, email = ?, postalCode = ?
      WHERE userId = ?
    `;
    return db.promise().query(query, [
      guardianData.firstName,
      guardianData.lastName,
      guardianData.phoneNumber,
      guardianData.email,
      guardianData.postalCode,
      userId,
    ]);
  },
};

module.exports = Guardian;

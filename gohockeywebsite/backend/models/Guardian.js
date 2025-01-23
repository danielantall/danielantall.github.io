const db = require('../config/db');

const Guardian = {
  create: (guardianData) => {
    const query = `
      INSERT INTO guardians (userId, firstName, lastName, phoneNumber, postalCode)
      VALUES (?, ?, ?, ?, ?)
    `;
    return db.promise().query(query, [
      guardianData.userId,
      guardianData.firstName,
      guardianData.lastName,
      guardianData.phoneNumber,
      guardianData.postalCode,
    ]);
  },

  findByUserId: (userId) => {
    const query = `SELECT * FROM guardians WHERE userId = ?`;
    return db.promise().query(query, [userId]).then(([rows]) => rows[0]); // Return single row
  },

  update: (userId, guardianData) => {
    const query = `
      UPDATE guardians
      SET firstName = ?, lastName = ?, phoneNumber = ?, postalCode = ?
      WHERE userId = ?
    `;
    return db.promise().query(query, [
      guardianData.firstName,
      guardianData.lastName,
      guardianData.phoneNumber,
      guardianData.postalCode,
      userId,
    ]);
  },
};

module.exports = Guardian;

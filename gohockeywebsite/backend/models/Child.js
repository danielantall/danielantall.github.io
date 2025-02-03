const db = require('../config/db');

const Child = {
  create: (childData) => {
    const query = `
      INSERT INTO children (userId, firstName, lastName, birthYear, divisionLevel, hockeyOrganization, position, medicalConditions) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    return db.promise().query(query, [
      childData.userId,
      childData.firstName,
      childData.lastName,
      childData.birthYear,
      childData.divisionLevel,
      childData.hockeyOrganization,
      childData.position,
      childData.medicalConditions
    ]);
  },

  findByUserId: (userId) => {
    const query = `SELECT * FROM children WHERE userId = ?`;
    return db.promise().query(query, [userId]).then(([rows]) => rows); // Return rows only
  },

  update: (childId, childData) => {
    const query = `
      UPDATE children 
      SET firstName = ?, lastName = ?, birthYear = ?, divisionLevel = ?, hockeyOrganization = ?, position = ?, medicalConditions = ?
      WHERE childId = ? AND userId = ?
    `;
    return db.promise().query(query, [
      childData.firstName,
      childData.lastName,
      childData.birthYear,
      childData.divisionLevel,
      childData.hockeyOrganization,
      childData.position,
      childData.medicalConditions,
      childId,
      childData.userId
    ]);
  },

  delete: (childId, userId) => {
    const query = `DELETE FROM children WHERE childId = ? AND userId = ?`;
    return db.promise().query(query, [childId, userId]);
  }
};

module.exports = Child;

const db = require('../config/db');

const Child = {
  create: (childData, callback) => {
    const query = `INSERT INTO children (parent_id, name, birth_year, division, level, email, organization, position, medical_conditions) 
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    db.query(query, [
      childData.parentId,
      childData.name,
      childData.birthYear,
      childData.division,
      childData.level,
      childData.email,
      childData.organization,
      childData.position,
      childData.medicalConditions
    ], callback);
  },

  findByParentId: (parentId, callback) => {
    const query = `SELECT * FROM children WHERE parent_id = ?`;
    db.query(query, [parentId], callback);
  },

  update: (childId, childData, callback) => {
    const query = `UPDATE children SET name = ?, birth_year = ?, division = ?, level = ?, email = ?, organization = ?, position = ?, medical_conditions = ? 
                   WHERE id = ? AND parent_id = ?`;
    db.query(query, [
      childData.name,
      childData.birthYear,
      childData.division,
      childData.level,
      childData.email,
      childData.organization,
      childData.position,
      childData.medicalConditions,
      childId,
      childData.parentId
    ], callback);
  },

  delete: (childId, parentId, callback) => {
    const query = `DELETE FROM children WHERE id = ? AND parent_id = ?`;
    db.query(query, [childId, parentId], callback);
  }
};

module.exports = Child;



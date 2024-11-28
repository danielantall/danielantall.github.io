const Child = require('../models/Child'); 

const addChildProfile = (req, res) => {
  const { parentId, name, birthYear, division, level, email, organization, position, medicalConditions } = req.body;

  if (!parentId || !name || !birthYear) {
    return res.status(400).json({ message: 'Parent ID, name, and birth year are required' });
  }

  Child.create(
    { parentId, name, birthYear, division, level, email, organization, position, medicalConditions },
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error adding child profile' });
      }
      res.status(201).json({ message: 'Child profile added successfully', childId: result.insertId });
    }
  );
};

const getChildrenByParent = (req, res) => {
  const { parentId } = req.params;

  Child.findByParentId(parentId, (err, children) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error fetching child profiles' });
    }
    res.status(200).json(children);
  });
};

const updateChildProfile = (req, res) => {
  const { childId } = req.params;
  const { parentId, name, birthYear, division, level, email, organization, position, medicalConditions } = req.body;

  Child.update(
    childId,
    { parentId, name, birthYear, division, level, email, organization, position, medicalConditions },
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error updating child profile' });
      }
      res.status(200).json({ message: 'Child profile updated successfully' });
    }
  );
};

const deleteChildProfile = (req, res) => {
  const { childId } = req.params;
  const { parentId } = req.body;

  Child.delete(childId, parentId, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error deleting child profile' });
    }
    res.status(200).json({ message: 'Child profile deleted successfully' });
  });
};

module.exports = {
  addChildProfile,
  getChildrenByParent,
  updateChildProfile,
  deleteChildProfile,
};

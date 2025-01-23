const Child = require('../models/Child');

// Add a child profile
const addChildProfile = async (req, res) => {
  const { firstName, lastName, birthYear, divisionLevel, hockeyOrganization, position, medicalConditions } = req.body;
  const userId = req.user.id; // Retrieve `userId` from authenticated user (requires middleware)

  if (!firstName || !lastName || !birthYear) {
    return res.status(400).json({ message: 'First name, last name, and birth year are required' });
  }

  try {
    const result = await Child.create({
      userId,
      firstName,
      lastName,
      birthYear,
      divisionLevel,
      hockeyOrganization,
      position,
      medicalConditions
    });

    res.status(201).json({ message: 'Child profile added successfully', childId: result[0].insertId });
  } catch (err) {
    console.error('Error adding child profile:', err);
    res.status(500).json({ message: 'Error adding child profile' });
  }
};

// Get all children by userId
const getChildrenByUserId = async (req, res) => {
  const userId = req.user.id; // Retrieve `userId` from authenticated user (requires middleware)

  try {
    const children = await Child.findByUserId(userId);
    res.status(200).json(children);
  } catch (err) {
    console.error('Error fetching children:', err);
    res.status(500).json({ message: 'Error fetching children' });
  }
};

// Update a child profile
const updateChildProfile = async (req, res) => {
  const { childId } = req.params;
  const { firstName, lastName, birthYear, divisionLevel, hockeyOrganization, position, medicalConditions } = req.body;
  const userId = req.user.id; // Retrieve `userId` from authenticated user (requires middleware)

  try {
    await Child.update(childId, {
      userId,
      firstName,
      lastName,
      birthYear,
      divisionLevel,
      hockeyOrganization,
      position,
      medicalConditions
    });

    res.status(200).json({ message: 'Child profile updated successfully' });
  } catch (err) {
    console.error('Error updating child profile:', err);
    res.status(500).json({ message: 'Error updating child profile' });
  }
};

// Delete a child profile
const deleteChildProfile = async (req, res) => {
  const { childId } = req.params;
  const userId = req.user.id; // Retrieve `userId` from authenticated user (requires middleware)

  try {
    await Child.delete(childId, userId);
    res.status(200).json({ message: 'Child profile deleted successfully' });
  } catch (err) {
    console.error('Error deleting child profile:', err);
    res.status(500).json({ message: 'Error deleting child profile' });
  }
};

module.exports = {
  addChildProfile,
  getChildrenByUserId,
  updateChildProfile,
  deleteChildProfile
};

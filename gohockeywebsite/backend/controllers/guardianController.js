const Guardian = require('../models/Guardian');

// Create a guardian profile
const createGuardianProfile = async (req, res) => {
  const { firstName, lastName, phoneNumber, postalCode } = req.body;
  const userId = req.user.id; // Get the userId from the token (via authenticateUser middleware)

  if (!firstName || !lastName) {
    return res.status(400).json({ message: 'First name and last name are required' });
  }

  try {
    const result = await Guardian.create({
      userId,
      firstName,
      lastName,
      phoneNumber,
      postalCode,
    });

    res.status(201).json({ message: 'Guardian profile created successfully', guardianId: result.insertId });
  } catch (err) {
    console.error('Error creating guardian profile:', err);
    res.status(500).json({ message: 'Error creating guardian profile' });
  }
};

// Get a guardian profile
const getGuardianProfile = async (req, res) => {
  const userId = req.user.id; // Get the userId from the token (via authenticateUser middleware)

  try {
    const guardian = await Guardian.findByUserId(userId);

    if (!guardian) {
      return res.status(404).json({ message: 'Guardian profile not found' });
    }

    res.status(200).json(guardian);
  } catch (err) {
    console.error('Error fetching guardian profile:', err);
    res.status(500).json({ message: 'Error fetching guardian profile' });
  }
};

// Update a guardian profile
const updateGuardianProfile = async (req, res) => {
  const userId = req.user.id; // Get the userId from the token (via authenticateUser middleware)
  const { firstName, lastName, phoneNumber, postalCode } = req.body;

  if (!firstName || !lastName) {
    return res.status(400).json({ message: 'First name and last name are required' });
  }

  try {
    await Guardian.update(userId, {
      firstName,
      lastName,
      phoneNumber,
      postalCode,
    });

    res.status(200).json({ message: 'Guardian profile updated successfully' });
  } catch (err) {
    console.error('Error updating guardian profile:', err);
    res.status(500).json({ message: 'Error updating guardian profile' });
  }
};

module.exports = {
  createGuardianProfile,
  getGuardianProfile,
  updateGuardianProfile,
};

const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/auth');
const {
  createGuardianProfile,
  getGuardianProfile,
  updateGuardianProfile,
} = require('../controllers/guardianController');

// Routes for guardians
router.post('/guardians', authenticateUser, createGuardianProfile); // Create a guardian profile
router.get('/guardians', authenticateUser, getGuardianProfile); // Get the guardian profile for the authenticated user
router.put('/guardians', authenticateUser, updateGuardianProfile); // Update the guardian profile

module.exports = router;

const express = require('express');
const { authenticateUser } = require('../middleware/auth');
const {
  createGuardianProfile,
  getGuardianProfile,
  updateGuardianProfile,
} = require('../controllers/guardianController');

const router = express.Router();

// CRUD routes for guardians
router.post('/guardians', authenticateUser, createGuardianProfile); // Create a guardian profile
router.get('/guardians', authenticateUser, getGuardianProfile); // Get guardian profile
router.put('/guardians', authenticateUser, updateGuardianProfile); // Update guardian profile

module.exports = router;

const express = require('express');
const { authenticateUser } = require('../middleware/auth'); // Ensure this path is correct
const {
  addChildProfile,
  getChildrenByUserId,
  updateChildProfile,
  deleteChildProfile,
} = require('../controllers/childController');

const router = express.Router();

router.post('/children', authenticateUser, addChildProfile); // Add a child profile
router.get('/children', authenticateUser, getChildrenByUserId); // Get all children for the authenticated user
router.put('/children/:childId', authenticateUser, updateChildProfile); // Update a child profile
router.delete('/children/:childId', authenticateUser, deleteChildProfile); // Delete a child profile

module.exports = router;


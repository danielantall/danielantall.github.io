const express = require('express');
const router = express.Router();
const {
  addChildProfile,
  getChildrenByParent,
  updateChildProfile,
  deleteChildProfile,
} = require('../controllers/childController');

router.post('/children', addChildProfile); // Add a child profile
router.get('/children/:parentId', getChildrenByParent); // Get all children for a parent
router.put('/children/:childId', updateChildProfile); // Update a child profile
router.delete('/children/:childId', deleteChildProfile); // Delete a child profile

module.exports = router;

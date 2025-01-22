const express = require('express');
const router = express.Router();
const {
  addChildProfile,
  getChildrenByParent,
  updateChildProfile,
  deleteChildProfile,
} = require('../controllers/childController');

router.post('/children', addChildProfile);
router.get('/children/:parentId', getChildrenByParent); 
router.put('/children/:childId', updateChildProfile); 
router.delete('/children/:childId', deleteChildProfile); 

module.exports = router;

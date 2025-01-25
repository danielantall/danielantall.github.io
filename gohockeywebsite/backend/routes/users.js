const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController'); 

router.post('/register', registerUser);
router.post('/login', loginUser);

console.log(registerUser); // This should log a function definition
console.log(loginUser);    // This should log a function definition

module.exports = router;

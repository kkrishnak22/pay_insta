
const express = require('express');
const router = express.Router();
const verifyJwt = require('../middleware/verifyJwt');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController')
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/currentUser',verifyJwt,userController.currentUser)
module.exports = router;

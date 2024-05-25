const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { verifyAuth } = require('../middleware/auth.middleware');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/', verifyAuth, userController.getUsers);
router.get('/:id', verifyAuth, userController.getUserById);
router.put('/:id', verifyAuth, userController.updateUser);
router.delete('/:id', verifyAuth, userController.deleteUser);
router.post('/profile', verifyAuth, userController.getProfile);

module.exports = router;

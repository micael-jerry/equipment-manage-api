const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.get('/grade/:grade', userController.getUsersByGrade);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.post('/profile', userController.getUserById);
router.post('/logout', userController.logout);
router.post('/reset-password', userController.resetPassword);

module.exports = router;

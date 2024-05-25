const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.get('/grade/:grade', userController.getUsersByGrade);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.post('/login', userController.login);
router.post('/profile', userController.getUserById);
router.post('/logout', userController.logout);
router.post('/signup', userController.signup);
router.post('/reset-password', userController.resetPassword);
router.post('/verifier-utilisateur', userController.verifierUtilisateur);

module.exports = router;

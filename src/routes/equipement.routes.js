const express = require('express');
const router = express.Router();
const equipementController = require('../controllers/equipement.controller');
const { verifyAuth, verifyAdminAccess } = require('../middleware/auth.middleware');

router.get('/', verifyAuth, equipementController.getEquipements);
router.post('/', verifyAuth, equipementController.createEquipement);
router.get('/:id', verifyAuth, equipementController.getEquipementById);
router.put('/:id', verifyAuth, equipementController.updateEquipement);
router.delete('/:id', verifyAuth, verifyAdminAccess, equipementController.deleteEquipement);

module.exports = router;

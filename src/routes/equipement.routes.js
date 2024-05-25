const express = require('express');
const router = express.Router();
const equipementController = require('../controllers/equipement.controller');
const { verifyAuth } = require('../middleware/auth.middleware');

router.get('/', verifyAuth, equipementController.getEquipements);
router.post('/', verifyAuth, equipementController.createEquipement);
router.put('/:id', verifyAuth, equipementController.updateEquipement);
router.delete('/:id', verifyAuth, equipementController.deleteEquipement);

module.exports = router;

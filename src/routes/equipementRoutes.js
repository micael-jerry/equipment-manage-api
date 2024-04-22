const express = require('express');
const router = express.Router();
const equipementController = require('../controllers/equipementController');

router.get('/', equipementController.getEquipements);
router.get('/:id', equipementController.getEquipementById);
router.post('/', equipementController.createEquipement);
router.put('/:id', equipementController.updateEquipement);
router.delete('/:id', equipementController.deleteEquipement);
router.get('/:id/type', equipementController.getEquipementTypeById);

module.exports = router;
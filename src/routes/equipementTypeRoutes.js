const express = require('express');
const router = express.Router();
const equipementTypeController = require('../controllers/equipementTypeController');

router.get('/', equipementTypeController.getEquipementTypes);
router.get('/:id', equipementTypeController.getEquipementTypeById);
router.post('/', equipementTypeController.createEquipementType);
router.put('/:id', equipementTypeController.updateEquipementType);
router.delete('/:id', equipementTypeController.deleteEquipementType);

module.exports = router;

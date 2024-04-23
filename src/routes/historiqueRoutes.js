const express = require('express');
const router = express.Router();
const historiqueController = require('../controllers/historiqueController');

router.get('/', historiqueController.getAll);
router.get('/user/:id_user', historiqueController.user);
router.get('/equipement/:id_equipement', historiqueController.equipement);
router.post('/createAdd/:id_equipement', historiqueController.createAddEqHistory);
router.post('/createDelete/:id_equipement', historiqueController.createDeleteHistory);
router.post('/create/:id_commande', historiqueController.createCommandeHistory);
router.post('/update/:id_commande', historiqueController.updateCommandeHistory);
router.post('/update/:id_equipement', historiqueController.updateEquipmentHistory);
router.post('/update/:id_stocks', historiqueController.updateStockHistory);

module.exports = router;
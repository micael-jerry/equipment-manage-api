const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const equipementController = require('../controllers/equipementController');
const stockController = require('../controllers/stockController');
const commandeController = require('../controllers/commandeController');
const historiqueController = require('../controllers/historiqueController');
const maintenanceController = require('../controllers/maintenanceController');

// utilisateurs
router.get('/users', userController.getUsers);
router.get('/users/:id', userController.getUserById);
router.post('/users', userController.createUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

// équipements
router.get('/equipements', equipementController.getEquipements);
router.get('/equipements/:id', equipementController.getEquipementById);
router.post('/equipements', equipementController.createEquipement);
router.put('/equipements/:id', equipementController.updateEquipement);
router.delete('/equipements/:id', equipementController.deleteEquipement);

// stocks
router.get('/stocks', stockController.getStocks);
router.get('/stocks/:id', stockController.getStockById);
router.post('/stocks', stockController.createStock);
router.put('/stocks/:id', stockController.updateStock);
router.delete('/stocks/:id', stockController.deleteStock);

// commandes
router.get('/commandes', commandeController.getCommandes);
router.get('/commandes/:id', commandeController.getCommandeById);
router.post('/commandes', commandeController.createCommande);
router.put('/commandes/:id', commandeController.updateCommande);
router.delete('/commandes/:id', commandeController.deleteCommande);

// historique
router.get('/historique-utilisation', historiqueController.getHistoriqueUtilisation);
router.post('/historique-utilisation', historiqueController.createHistoriqueUtilisation);

// maintenance
router.get('/maintenance', maintenanceController.getMaintenances);
router.get('/maintenance/:id', maintenanceController.getMaintenanceById);
router.post('/maintenance', maintenanceController.createMaintenance);
router.put('/maintenance/:id', maintenanceController.updateMaintenance);
router.delete('/maintenance/:id', maintenanceController.deleteMaintenance);

module.exports = router;
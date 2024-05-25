const express = require('express');
const router = express.Router();

// Importez les autres fichiers de route
const userRoutes = require('./userRoutes');
const equipementRoutes = require('./equipementRoutes');
const stockRoutes = require('./stockRoutes');
const commandeRoutes = require('./commande.routes');
const historiqueRoutes = require('./historiqueRoutes');
const maintenanceRoutes = require('./maintenanceRoutes');
const equipementTypeRoutes = require('./equipementTypeRoutes');

// Routes par défaut
router.get('/', (req, res) => {
	res.send("Bienvenue sur l'API");
});

// Utilisez les autres fichiers de route
router.use('/users', userRoutes);
router.use('/equipements', equipementRoutes);
router.use('/stocks', stockRoutes);
router.use('/commandes', commandeRoutes);
router.use('/historique-utilisation', historiqueRoutes);
router.use('/maintenance', maintenanceRoutes);
router.use('/equipements', equipementTypeRoutes);

module.exports = router;

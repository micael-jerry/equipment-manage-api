const express = require('express');
const router = express.Router();

// Importez les autres fichiers de route
const userRoutes = require('./user.routes');
const equipementRoutes = require('./equipement.routes');
const siteRoutes = require('./site.routes');

// Routes par défaut
router.get('/', (req, res) => {
	res.send("Bienvenue sur l'API");
});

// Utilisez les autres fichiers de route
router.use('/users', userRoutes);
router.use('/equipements', equipementRoutes);
router.use('/sites', siteRoutes);
module.exports = router;

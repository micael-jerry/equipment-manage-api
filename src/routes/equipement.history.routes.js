const express = require('express');
const { verifyAuth } = require('../middleware/auth.middleware');
const equipementHistoryController = require('../controllers/equipement.history.controller');
const router = express.Router();

router.get('/', verifyAuth, equipementHistoryController.getEquipementHistory);
router.get(
	'/:id',
	verifyAuth,
	equipementHistoryController.getEquipementHistoryById,
);

module.exports = router;

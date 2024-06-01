const express = require('express');
const router = express.Router();
const siteController = require('../controllers/site.controller');
const {
	verifyAuth,
	verifyAdminAccess,
} = require('../middleware/auth.middleware');

router.get('/', verifyAuth, siteController.getSites);
router.post('/', verifyAuth, siteController.createSite);
router.get('/:id', verifyAuth, siteController.getSiteById);
router.put('/:id', verifyAuth, siteController.updateSite);
router.delete('/:id', verifyAuth, verifyAdminAccess, siteController.deleteSite);

module.exports = router;

const siteService = require('../services/site.service');

exports.getSites = async (req, res) => {
	siteService
		.getSites(req.query)
		.then(r => res.status(200).json(r))
		.catch(err => res.status(500).json(err));
};

exports.createSite = async (req, res) => {
	siteService
		.createSite(req.body)
		.then(r => res.status(201).json(r))
		.catch(err => res.status(500).json(err));
};

exports.getSiteById = async (req, res) => {
	siteService
		.getSiteById(req.params.id)
		.then(r => res.status(200).json(r))
		.catch(err => res.status(500).json(err));
};

exports.updateSite = async (req, res) => {
	siteService
		.updateSite(req.params.id, req.body)
		.then(r => res.status(201).json(r))
		.catch(err => res.status(500).json(err));
};

exports.deleteSite = async (req, res) => {
	siteService
		.deleteSite(req.params.id)
		.then(() =>
			res.status(201).json({
				message: 'Équipement supprimé',
			}),
		)
		.catch(err => res.status(500).json(err));
};

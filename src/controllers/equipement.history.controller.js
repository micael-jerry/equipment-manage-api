const equipementHistoryService = require('../services/equipement.history.service');

exports.getEquipementHistory = async (req, res) => {
	equipementHistoryService
		.getEquipementHistory(req.query)
		.then(r => res.status(200).json(r))
		.catch(err => res.status(500).json(err));
};

exports.getEquipementHistoryById = async (req, res) => {
	equipementHistoryService
		.getEquipementHistoryById(req.params.id)
		.then(r => res.status(200).json(r))
		.catch(err => res.status(500).json(err));
};

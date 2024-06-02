const equipementService = require('../services/equipement.service');

exports.getEquipements = async (req, res) => {
	equipementService
		.getEquipements(req.query)
		.then(r => res.status(200).json(r))
		.catch(err => res.status(500).json(err));
};

exports.createEquipement = async (req, res) => {
	equipementService
		.createEquipement(req.user._id, req.body)
		.then(r => res.status(201).json(r))
		.catch(err => res.status(500).json(err));
};

exports.getEquipementById = async (req, res) => {
	equipementService
		.getEquipementById(req.params.id)
		.then(r => res.status(200).json(r))
		.catch(err => res.status(500).json(err));
};

exports.updateEquipement = async (req, res) => {
	equipementService
		.updateEquipement(req.user._id, req.params.id, req.body)
		.then(r => res.status(201).json(r))
		.catch(err => res.status(500).json(err));
};

exports.deleteEquipement = async (req, res) => {
	equipementService
		.deleteEquipement(req.user._id, req.params.id)
		.then(() =>
			res.status(201).json({
				message: 'Équipement supprimé',
			}),
		)
		.catch(err => res.status(500).json(err));
};

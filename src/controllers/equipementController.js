const EquipementService = require('../services/equipementService');
const HistoriqueService = require('../services/historiqueService');
const commandeController = require('./commandeController');

exports.getEquipements = async (req, res) => {
	try {
		const equipements = await EquipementService.getEquipements();
		res.json(equipements);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

exports.createEquipement = async (req, res) => {
	const {
		nom,
		description,
		pays_d_origine,
		annee_de_fabrication,
		type,
		status_equipement,
	} = req.body;
	try {
		// Créez d'abord la commande pour cet équipement
		const newCommande = await commandeController.createCommande(req, res);
		// Ensuite, créez l'équipement si la commande a été créée avec succès
		if (newCommande) {
			const newEquipement = await EquipementService.createEquipement(
				nom,
				description,
				pays_d_origine,
				annee_de_fabrication,
				type,
				status_equipement,
			);
			await HistoriqueService.createAddEqHistory(newEquipement._id, null, null);
			res.status(201).json(newEquipement);
		}
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

exports.updateEquipement = async (req, res) => {
	const { id } = req.params;
	const {
		nom,
		description,
		pays_d_origine,
		annee_de_fabrication,
		type,
		status_equipement,
	} = req.body;
	try {
		const updatedEquipement = await EquipementService.updateEquipement(
			id,
			nom,
			description,
			pays_d_origine,
			annee_de_fabrication,
			type,
			status_equipement,
		);
		await HistoriqueService.createAddEqHistory(
			updatedEquipement._id,
			null,
			null,
		);
		res.json(updatedEquipement);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

exports.deleteEquipement = async (req, res) => {
	const { id } = req.params;
	try {
		await EquipementService.deleteEquipement(id);
		res.json({ message: 'Équipement supprimé avec succès' });
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

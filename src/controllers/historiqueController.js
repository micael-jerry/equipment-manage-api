const HistoriqueService = require('../services/historiqueService');

const historiqueController = {
	getAll: async (req, res) => {
		try {
			const history = await HistoriqueService.getAllHistory();
			res.json(history);
		} catch (err) {
			res.status(400).json({ message: err.message });
		}
	},

	user: async (req, res) => {
		const { id_user } = req.params;
		try {
			const history = await HistoriqueService.getHistoryByUser(id_user);
			res.json(history);
		} catch (err) {
			res.status(400).json({ message: err.message });
		}
	},

	equipement: async (req, res) => {
		const { id_equipement } = req.params;
		try {
			const history =
				await HistoriqueService.getHistoryByEquipement(id_equipement);
			res.json(history);
		} catch (err) {
			res.status(400).json({ message: err.message });
		}
	},

	createAddEqHistory: async (req, res) => {
		const { id_equipement } = req.params;
		try {
			const newHistory = await HistoriqueService.createAddEqHistory(
				id_equipement,
				null,
				null,
			);
			res.status(201).json(newHistory);
		} catch (err) {
			res.status(400).json({ message: err.message });
		}
	},

	createDeleteHistory: async (req, res) => {
		const { id_equipement } = req.params;
		try {
			const newHistory = await HistoriqueService.createDeleteHistory(
				id_equipement,
				null,
				null,
				null,
				null,
			);
			res.status(201).json(newHistory);
		} catch (err) {
			res.status(400).json({ message: err.message });
		}
	},

	createCommandeHistory: async (req, res) => {
		const { id_commande } = req.params;
		try {
			const newHistory = await HistoriqueService.createCommandeHistory(
				id_commande,
				null,
			);
			res.status(201).json(newHistory);
		} catch (err) {
			res.status(400).json({ message: err.message });
		}
	},

	updateCommandeHistory: async (req, res) => {
		const { id_commande } = req.params;
		const { newStatus } = req.body;
		try {
			const newHistory = await HistoriqueService.updateCommandeHistory(
				id_commande,
				newStatus,
			);
			res.status(201).json(newHistory);
		} catch (err) {
			res.status(400).json({ message: err.message });
		}
	},

	updateEquipmentHistory: async (req, res) => {
		const { id_equipement } = req.params;
		const { newEquipmentInfo } = req.body;
		try {
			const newHistory = await HistoriqueService.createHistorique(
				id_equipement,
				null,
				null,
				`Équipement mis à jour: ${newEquipmentInfo}`,
				null,
			);
			res.status(201).json(newHistory);
		} catch (err) {
			res.status(400).json({ message: err.message });
		}
	},

	updateStockHistory: async (req, res) => {
		const { id_stocks } = req.params;
		const { newStockInfo } = req.body;
		try {
			const newHistory = await HistoriqueService.createHistorique(
				null,
				null,
				null,
				`Stock mis à jour: ${newStockInfo}`,
				id_stocks,
			);
			res.status(201).json(newHistory);
		} catch (err) {
			res.status(400).json({ message: err.message });
		}
	},
};

module.exports = historiqueController;

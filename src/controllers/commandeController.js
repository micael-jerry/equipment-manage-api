const CommandeService = require('../services/commandeService');
const HistoriqueService = require('../services/historiqueService');

const commandeController = {
	getAllCommandes: async (req, res) => {
		try {
			const commandes = await CommandeService.getCommandes();
			res.json(commandes);
		} catch (err) {
			res.status(500).json({ message: err.message });
		}
	},

	createCommande: async (req, res) => {
		const { user_id, date } = req.body;
		try {
			const newCommande = await CommandeService.createCommande(user_id, date);
			await HistoriqueService.createCommandeHistory(newCommande._id, user_id);
			res.status(201).json(newCommande);
		} catch (err) {
			res.status(400).json({ message: err.message });
		}
	},

	updateCommande: async (req, res) => {
		const { id } = req.params;
		const { user_id, date, status } = req.body;
		try {
			const updatedCommande = await CommandeService.updateCommande(
				id,
				user_id,
				date,
				status,
			);
			res.json(updatedCommande);
		} catch (err) {
			res.status(400).json({ message: err.message });
		}
	},

	deleteCommande: async (req, res) => {
		const { id } = req.params;
		try {
			await CommandeService.deleteCommande(id);
			res.json({ message: 'Commande supprimée avec succès' });
		} catch (err) {
			res.status(400).json({ message: err.message });
		}
	},
};

module.exports = commandeController;

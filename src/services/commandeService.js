const Commande = require('../models/commande');
const HistoriqueService = require('./historiqueService');

const getCommandes = async () => {
  return await Commande.find();
};

const getCommandeById = async (id) => {
  return await Commande.findById(id);
};

const createCommande = async (user_id, date) => {
  const commande = new Commande({ user_id, date, status: "En attente de confirmation" });
  const savedCommande = await commande.save();

  // Create history for the created commande
  await HistoriqueService.createCommandeHistory(savedCommande._id, user_id);

  return savedCommande;
};

const updateCommande = async (id, user_id, date, status) => {
  const commande = await Commande.findById(id);
  if (!commande) {
    throw new Error('Commande non trouvée');
  }

  const oldStatus = commande.status;

  commande.user_id = user_id || commande.user_id;
  commande.date = date || commande.date;
  commande.status = status || commande.status;

  const updatedCommande = await commande.save();

  // Create history for the updated commande
  if (status && status !== oldStatus) {
    await HistoriqueService.updateCommandeHistory(id, status);
  }

  return updatedCommande;
};

const deleteCommande = async (id) => {
  const commande = await Commande.findById(id);
  if (!commande) {
    throw new Error('Commande non trouvée');
  }

  await commande.deleteOne({ _id: id });

  // Create history for the deleted commande
  await HistoriqueService.createDeleteHistory(commande._id, commande.user_id, new Date(), "Commande supprimée", null);
};

module.exports = {
  getCommandes,
  getCommandeById,
  createCommande,
  updateCommande,
  deleteCommande,
};
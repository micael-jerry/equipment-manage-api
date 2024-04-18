const Commande = require('../models/commande');

const getCommandes = async () => {
  return await Commande.find();
};

const getCommandeById = async (id) => {
  return await Commande.findById(id);
};

const createCommande = async (user_id, date) => {
  const commande = new Commande({ user_id, date });
  return await commande.save();
};

const updateCommande = async (id, user_id, date) => {
  const commande = await Commande.findById(id);
  if (!commande) {
    throw new Error('Commande non trouvée');
  }

  commande.user_id = user_id || commande.user_id;
  commande.date = date || commande.date;

  return await commande.save();
};

const deleteCommande = async (id) => {
  const commande = await Commande.findById(id);
  if (!commande) {
    throw new Error('Commande non trouvée');
  }

  await commande.deleteOne({ _id: id });
};

module.exports = {
  getCommandes,
  getCommandeById,
  createCommande,
  updateCommande,
  deleteCommande,
};
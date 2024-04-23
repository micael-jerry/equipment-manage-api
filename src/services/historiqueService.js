const Historique = require('../models/historique');

const getAllHistory = async () => {
  return await Historique.find();
};

const getHistoryByUser = async (id_user) => {
  return await Historique.find({ id_user });
};

const getHistoryByEquipement = async (id_equipement) => {
  return await Historique.find({ id_equipement });
};

const createHistorique = async (id_equipement, id_user, date_utilisation, description_utilisation, id_stocks) => {
  const historique = new Historique({ id_equipement, id_user, date_utilisation, description_utilisation, id_stocks });
  return await historique.save();
};

const createDeleteHistory = async (id_equipement, id_user, date_utilisation, description_utilisation, id_stocks) => {
  return await createHistorique(id_equipement, id_user, date_utilisation, description_utilisation, id_stocks);
};

const createCommandeHistory = async (id_commande, id_user) => {
  const date_utilisation = new Date();
  const description_utilisation = "Nouvelle commande passée";
  return await createHistorique(id_commande, id_user, date_utilisation, description_utilisation, null);
};

const updateCommandeHistory = async (id_commande, newStatus) => {
  const date_utilisation = new Date();
  const description_utilisation = `Statut de la commande mis à jour: ${newStatus}`;
  return await createHistorique(id_commande, null, date_utilisation, description_utilisation, null);
};

const createAddEqHistory = async (id_equipement, id_user, id_stocks) => {
  const date_utilisation = new Date();
  const description_utilisation = "Équipement ajouté";
  return await createHistorique(id_equipement, id_user, date_utilisation, description_utilisation, id_stocks);
};

module.exports = {
  createHistorique,
  getAllHistory,
  getHistoryByUser,
  getHistoryByEquipement,
  createDeleteHistory,
  createCommandeHistory,
  updateCommandeHistory,
  createAddEqHistory
};
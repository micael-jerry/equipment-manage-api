const HistoriqueUtilisation = require('../models/historique');

const getHistoriqueUtilisation = async () => {
  return await HistoriqueUtilisation.find();
};

const createHistoriqueUtilisation = async (id_equipement, id_user, date_utilisation, description_utilisation) => {
  const historique = new HistoriqueUtilisation({ id_equipement, id_user, date_utilisation, description_utilisation });
  return await historique.save();
};

module.exports = {
  getHistoriqueUtilisation,
  createHistoriqueUtilisation,
};
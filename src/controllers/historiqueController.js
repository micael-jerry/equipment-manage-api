const historiqueService = require('../services/historiqueService');

exports.getHistoriqueUtilisation = async (req, res) => {
  try {
    const historique = await historiqueService.getHistoriqueUtilisation();
    res.status(200).json(historique);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createHistoriqueUtilisation = async (req, res) => {
  const { id_equipement, id_user, date_utilisation, description_utilisation, id_stocks } = req.body;

  try {
    const newHistorique = await historiqueService.createHistoriqueUtilisation(id_equipement, id_user, date_utilisation, description_utilisation, id_stocks);
    res.status(201).json(newHistorique);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getHistoriqueInfoByStocksId = async (req, res) => {
  try {
    const historiques = await historiqueService.getHistoriqueInfoByStocksId(req.params.id_stocks);
    res.status(200).json(historiques);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
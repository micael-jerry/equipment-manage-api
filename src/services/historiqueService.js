const HistoriqueUtilisation = require('../models/historique');
const Stock = require('../models/stock');

const getHistoriqueUtilisation = async () => {
  return await HistoriqueUtilisation.find();
};

const createHistoriqueUtilisation = async (id_equipement, id_user, date_utilisation, description_utilisation, id_stocks) => {
  const historique = new HistoriqueUtilisation({ id_equipement, id_user, date_utilisation, description_utilisation, id_stocks });
  return await historique.save();
};

const getHistoriqueInfoByStocksId = async (id_stocks) => {
  const historiques = await HistoriqueUtilisation.find({ id_stocks });
  const stocksInfo = [];

  for (const historique of historiques) {
    const stock = await Stock.findById(historique.id_stocks);
    if (stock) {
      stocksInfo.push({
        id: historique._id,
        id_equipement: historique.id_equipement,
        id_user: historique.id_user,
        date_utilisation: historique.date_utilisation,
        description_utilisation: historique.description_utilisation,
        lieu_de_stockage: stock.lieu_de_stockage,
        type: stock.type,
      });
    }
  }

  return stocksInfo;
};

module.exports = {
  getHistoriqueUtilisation,
  createHistoriqueUtilisation,
  getHistoriqueInfoByStocksId,
};
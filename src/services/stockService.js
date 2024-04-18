const Stock = require('../models/stock');

const getStocks = async () => {
  return await Stock.find();
};

const getStockById = async (id) => {
  return await Stock.findById(id);
};

const createStock = async (id_equipement, quantite) => {
  const stock = new Stock({ id_equipement, quantite });
  return await stock.save();
};

const updateStock = async (id, id_equipement, quantite) => {
  const stock = await Stock.findById(id);
  if (!stock) {
    throw new Error('Élément du stock non trouvé');
  }

  stock.id_equipement = id_equipement || stock.id_equipement;
  stock.quantite = quantite || stock.quantite;

  return await stock.save();
};

const deleteStock = async (id) => {
  const stock = await Stock.findById(id);
  if (!stock) {
    throw new Error('Élément du stock non trouvé');
  }

  await stock.deleteOne({ _id: id });
};

module.exports = {
  getStocks,
  getStockById,
  createStock,
  updateStock,
  deleteStock,
};
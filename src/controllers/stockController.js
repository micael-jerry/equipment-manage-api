const stockService = require('../services/stockService');

exports.getStocks = async (req, res) => {
  try {
    const stocks = await stockService.getStocks();
    res.status(200).json(stocks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getStockById = async (req, res) => {
  try {
    const stock = await stockService.getStockById(req.params.id);
    if (!stock) {
      return res.status(404).json({ message: 'Élément du stock non trouvé' });
    }
    res.status(200).json(stock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createStock = async (req, res) => {
  const { id_equipement, quantite } = req.body;

  try {
    const newStock = await stockService.createStock(id_equipement, quantite);
    res.status(201).json(newStock);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateStock = async (req, res) => {
  const { id_equipement, quantite } = req.body;

  try {
    const updatedStock = await stockService.updateStock(req.params.id, id_equipement, quantite);
    res.status(200).json(updatedStock);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteStock = async (req, res) => {
  try {
    await stockService.deleteStock(req.params.id);
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
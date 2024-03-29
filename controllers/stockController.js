const Stock = require('../models/stock');

// Récupérer la liste des stocks
exports.getStocks = async (req, res) => {
  try {
    const stocks = await Stock.find();
    res.status(200).json(stocks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer un élément du stock par ID
exports.getStockById = async (req, res) => {
  try {
    const stock = await Stock.findById(req.params.id);
    if (!stock) {
      return res.status(404).json({ message: 'Élément du stock non trouvé' });
    }
    res.status(200).json(stock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Ajouter un nouvel élément au stock
exports.createStock = async (req, res) => {
  const stock = new Stock({
    id_equipement: req.body.id_equipement,
    quantite: req.body.quantite
  });

  try {
    const newStock = await stock.save();
    res.status(201).json(newStock);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Mettre à jour un élément du stock
exports.updateStock = async (req, res) => {
  try {
    const stock = await Stock.findById(req.params.id);
    if (!stock) {
      return res.status(404).json({ message: 'Élément du stock non trouvé' });
    }

    stock.id_equipement = req.body.id_equipement || stock.id_equipement;
    stock.quantite = req.body.quantite || stock.quantite;

    const updatedStock = await stock.save();
    res.status(200).json(updatedStock);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer un élément du stock
exports.deleteStock = async (req, res) => {
  try {
    const stock = await Stock.findById(req.params.id);
    if (!stock) {
      return res.status(404).json({ message: 'Élément du stock non trouvé' });
    }

    await stock.remove();
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
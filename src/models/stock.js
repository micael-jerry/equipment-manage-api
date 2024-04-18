const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  id_equipement: Number,
  quantite: Number,
  lieu_de_stockage: String,
  type: String
});

module.exports = mongoose.model('Stock', stockSchema);
const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  id_equipement: Number,
  quantite: Number
});

module.exports = mongoose.model('Stock', stockSchema);
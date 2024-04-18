const mongoose = require('mongoose');

const equipementSchema = new mongoose.Schema({
  nom: String,
  description: String,
  pays_d_origine: String,
  annee_de_fabrication: Number,
  type: String,
  status_equipement: String
});

module.exports = mongoose.model('Equipement', equipementSchema);
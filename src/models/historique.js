const mongoose = require('mongoose');

const historiqueSchema = new mongoose.Schema({
  id_equipement: Number,
  id_user: Number,
  date_utilisation: Date,
  description_utilisation: String,
  id_stocks: Number
});

module.exports = mongoose.model('Historique', historiqueSchema);
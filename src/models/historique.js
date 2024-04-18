const mongoose = require('mongoose');

const historiqueSchema = new mongoose.Schema({
  id_equipement: Number,
  id_user: Number,
  date_utilisation: Date,
  description_utilisation: String
});

module.exports = mongoose.model('Historique', historiqueSchema);
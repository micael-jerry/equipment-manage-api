const mongoose = require('mongoose');

const commandeSchema = new mongoose.Schema({
  user_id: Number,
  date: Date,
  status: String,
  id_stocks: Number
});

module.exports = mongoose.model('Commande', commandeSchema);
const mongoose = require('mongoose');

const commandeSchema = new mongoose.Schema({
  user_id: Number,
  date: Date
});

module.exports = mongoose.model('Commande', commandeSchema);
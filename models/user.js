const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nom: String,
  prenom: String,
  grade: String,
  unite: String
});

module.exports = mongoose.model('User', userSchema);
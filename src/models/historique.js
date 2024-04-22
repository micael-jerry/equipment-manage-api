const mongoose = require("mongoose");

const historiqueSchema = new mongoose.Schema({
  id_equipement: { type: Number, required: true },
  id_user: { type: Number, required: true },
  date_utilisation: { type: Date, required: true },
  description_utilisation: { type: String, required: true },
  id_stocks: { type: Number, min: 0, required: true },
});

module.exports = mongoose.model("Historique", historiqueSchema);

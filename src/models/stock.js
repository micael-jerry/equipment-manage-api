const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
  id_equipement: { type: Number, required: true },
  quantite: { type: Number, required: true },
  type: {
    type: String,
    enum: [
      "Entrepôt",
      "Hangar",
      "Magasin",
      "Dépôt",
      "Coffre-fort",
      "Zone de stockage temporaire",
    ],
    required: true,
  },
  lieu_de_stockage: { type: String, required: true },
});

module.exports = mongoose.model("Stock", stockSchema);
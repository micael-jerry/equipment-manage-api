const mongoose = require("mongoose");

const commandeSchema = new mongoose.Schema({
  user_id: { type: Number, required: true },
  date: { type: Date, required: true },
  status: {
    type: String,
    enum: [
      "En attente de confirmation",
      "Confirmée",
      "En cours de traitement",
      "En attente de livraison",
      "Expédiée",
      "Livrée",
      "En attente de paiement",
      "En cours de paiement",
      "Paiement reçu",
      "Annulée",
    ],
    required: true,
  },
  id_stocks: { type: Number, required: true },
});

module.exports = mongoose.model("Commande", commandeSchema);
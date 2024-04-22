const mongoose = require("mongoose");

const maintenanceSchema = new mongoose.Schema({
  id_equipement: { type: Number, required: true },
  date_maintenance: { type: Date, required: true },
  description_maintenance: { type: String, required: true },
  cout_maintenance: { type: Number, required: true },
  status: {
    type: String,
    enum: ["encours", "echec", "success"],
    required: true,
  },
});

module.exports = mongoose.model("Maintenance", maintenanceSchema);
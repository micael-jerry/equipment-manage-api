const mongoose = require('mongoose');

const maintenanceSchema = new mongoose.Schema({
  id_equipement: Number,
  date_maintenance: Date,
  description_maintenance: String,
  cout_maintenance: Number,
  status: String
});

module.exports = mongoose.model('Maintenance', maintenanceSchema);
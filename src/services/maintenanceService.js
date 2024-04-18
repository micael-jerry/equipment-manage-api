const Maintenance = require('../models/maintenance');

const getMaintenances = async () => {
  return await Maintenance.find();
};

const getMaintenanceById = async (id) => {
  return await Maintenance.findById(id);
};

const createMaintenance = async (id_equipement, date_maintenance, description_maintenance, cout_maintenance) => {
  const maintenance = new Maintenance({ id_equipement, date_maintenance, description_maintenance, cout_maintenance });
  return await maintenance.save();
};

const updateMaintenance = async (id, id_equipement, date_maintenance, description_maintenance, cout_maintenance) => {
  const maintenance = await Maintenance.findById(id);
  if (!maintenance) {
    throw new Error('Opération de maintenance non trouvée');
  }

  maintenance.id_equipement = id_equipement || maintenance.id_equipement;
  maintenance.date_maintenance = date_maintenance || maintenance.date_maintenance;
  maintenance.description_maintenance = description_maintenance || maintenance.description_maintenance;
  maintenance.cout_maintenance = cout_maintenance || maintenance.cout_maintenance;

  return await maintenance.save();
};

const deleteMaintenance = async (id) => {
  const maintenance = await Maintenance.findById(id);
  if (!maintenance) {
    throw new Error('Opération de maintenance non trouvée');
  }

  await maintenance.remove();
};

module.exports = {
  getMaintenances,
  getMaintenanceById,
  createMaintenance,
  updateMaintenance,
  deleteMaintenance,
};
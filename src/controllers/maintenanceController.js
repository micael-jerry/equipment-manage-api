const maintenanceService = require('../services/maintenanceService');

exports.getMaintenances = async (req, res) => {
  try {
    const maintenances = await maintenanceService.getMaintenances();
    res.status(200).json(maintenances);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMaintenanceById = async (req, res) => {
  try {
    const maintenance = await maintenanceService.getMaintenanceById(req.params.id);
    if (!maintenance) {
      return res.status(404).json({ message: 'Opération de maintenance non trouvée' });
    }
    res.status(200).json(maintenance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createMaintenance = async (req, res) => {
  const { id_equipement, date_maintenance, description_maintenance, cout_maintenance } = req.body;

  try {
    const newMaintenance = await maintenanceService.createMaintenance(id_equipement, date_maintenance, description_maintenance, cout_maintenance);
    res.status(201).json(newMaintenance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateMaintenance = async (req, res) => {
  const { id_equipement, date_maintenance, description_maintenance, cout_maintenance } = req.body;

  try {
    const updatedMaintenance = await maintenanceService.updateMaintenance(req.params.id, id_equipement, date_maintenance, description_maintenance, cout_maintenance);
    res.status(200).json(updatedMaintenance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteMaintenance = async (req, res) => {
  try {
    await maintenanceService.deleteMaintenance(req.params.id);
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
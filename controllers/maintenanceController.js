const Maintenance = require('../models/maintenance');

// Récupérer la liste des opérations de maintenance
exports.getMaintenances = async (req, res) => {
  try {
    const maintenances = await Maintenance.find();
    res.status(200).json(maintenances);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer une opération de maintenance par ID
exports.getMaintenanceById = async (req, res) => {
  try {
    const maintenance = await Maintenance.findById(req.params.id);
    if (!maintenance) {
      return res.status(404).json({ message: 'Opération de maintenance non trouvée' });
    }
    res.status(200).json(maintenance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Ajouter une nouvelle opération de maintenance
exports.createMaintenance = async (req, res) => {
  const maintenance = new Maintenance({
    id_equipement: req.body.id_equipement,
    date_maintenance: req.body.date_maintenance,
    description_maintenance: req.body.description_maintenance,
    cout_maintenance: req.body.cout_maintenance
  });

  try {
    const newMaintenance = await maintenance.save();
    res.status(201).json(newMaintenance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Mettre à jour une opération de maintenance
exports.updateMaintenance = async (req, res) => {
  try {
    const maintenance = await Maintenance.findById(req.params.id);
    if (!maintenance) {
      return res.status(404).json({ message: 'Opération de maintenance non trouvée' });
    }

    maintenance.id_equipement = req.body.id_equipement || maintenance.id_equipement;
    maintenance.date_maintenance = req.body.date_maintenance || maintenance.date_maintenance;
    maintenance.description_maintenance = req.body.description_maintenance || maintenance.description_maintenance;
    maintenance.cout_maintenance = req.body.cout_maintenance || maintenance.cout_maintenance;

    const updatedMaintenance = await maintenance.save();
    res.status(200).json(updatedMaintenance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer une opération de maintenance
exports.deleteMaintenance = async (req, res) => {
  try {
    const maintenance = await Maintenance.findById(req.params.id);
    if (!maintenance) {
      return res.status(404).json({ message: 'Opération de maintenance non trouvée' });
    }

    await maintenance.remove();
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
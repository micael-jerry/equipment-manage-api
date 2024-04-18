const equipementService = require('../services/equipementService');

exports.getEquipements = async (req, res) => {
  try {
    const equipements = await equipementService.getEquipements();
    res.status(200).json(equipements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getEquipementById = async (req, res) => {
  try {
    const equipement = await equipementService.getEquipementById(req.params.id);
    if (!equipement) {
      return res.status(404).json({ message: 'Équipement non trouvé' });
    }
    res.status(200).json(equipement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createEquipement = async (req, res) => {
  const { nom, description, pays_d_origine, annee_de_fabrication } = req.body;

  try {
    const newEquipement = await equipementService.createEquipement(nom, description, pays_d_origine, annee_de_fabrication);
    res.status(201).json(newEquipement);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateEquipement = async (req, res) => {
  const { nom, description, pays_d_origine, annee_de_fabrication } = req.body;

  try {
    const updatedEquipement = await equipementService.updateEquipement(req.params.id, nom, description, pays_d_origine, annee_de_fabrication);
    res.status(200).json(updatedEquipement);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteEquipement = async (req, res) => {
  try {
    await equipementService.deleteEquipement(req.params.id);
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
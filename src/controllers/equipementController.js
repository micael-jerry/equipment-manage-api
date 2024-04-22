const Equipement = require('../models/equipement');

const getEquipements = async (req, res) => {
  try {
    const equipements = await Equipement.find();
    res.json(equipements);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getEquipementById = async (req, res) => {
  try {
    const equipement = await Equipement.findById(req.params.id);
    res.json(equipement);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createEquipement = async (req, res) => {
  const equipement = new Equipement({
    nom: req.body.nom,
    description: req.body.description,
    pays_d_origine: req.body.pays_d_origine,
    annee_de_fabrication: req.body.annee_de_fabrication,
    type: req.body.type,
    status_equipement: req.body.status_equipement
  });

  try {
    const newEquipement = await equipement.save();
    res.status(201).json(newEquipement);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateEquipement = async (req, res) => {
  try {
    const equipement = await Equipement.findById(req.params.id);

    if (!equipement) {
      return res.status(404).json({ message: 'Équipement non trouvé' });
    }

    equipement.nom = req.body.nom || equipement.nom;
    equipement.description = req.body.description || equipement.description;
    equipement.pays_d_origine = req.body.pays_d_origine || equipement.pays_d_origine;
    equipement.annee_de_fabrication = req.body.annee_de_fabrication || equipement.annee_de_fabrication;
    equipement.type = req.body.type || equipement.type;
    equipement.status_equipement = req.body.status_equipement || equipement.status_equipement;

    const updatedEquipement = await equipement.save();
    res.json(updatedEquipement);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteEquipement = async (req, res) => {
  try {
    const equipement = await Equipement.findById(req.params.id);

    if (!equipement) {
      return res.status(404).json({ message: 'Équipement non trouvé' });
    }

    await equipement.deleteOne();
    res.json({ message: 'Équipement supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getEquipementTypeById = async (req, res) => {
  try {
    const equipement = await Equipement.findById(req.params.id);
    if (!equipement) {
      return res.status(404).json({ message: 'Équipement non trouvé' });
    }
    res.json({ type: equipement.type });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getEquipements,
  getEquipementById,
  createEquipement,
  updateEquipement,
  deleteEquipement,
  getEquipementTypeById
};
const Equipement = require('../models/equipement');

// Récupérer la liste des équipements
exports.getEquipements = async (req, res) => {
  try {
    const equipements = await Equipement.find();
    res.status(200).json(equipements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer un équipement par ID
exports.getEquipementById = async (req, res) => {
  try {
    const equipement = await Equipement.findById(req.params.id);
    if (!equipement) {
      return res.status(404).json({ message: 'Équipement non trouvé' });
    }
    res.status(200).json(equipement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Ajouter un nouvel équipement
exports.createEquipement = async (req, res) => {
  const equipement = new Equipement({
    nom: req.body.nom,
    description: req.body.description,
    pays_d_origine: req.body.pays_d_origine,
    annee_de_fabrication: req.body.annee_de_fabrication
  });

  try {
    const newEquipement = await equipement.save();
    res.status(201).json(newEquipement);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Mettre à jour un équipement
exports.updateEquipement = async (req, res) => {
  try {
    const equipement = await Equipement.findById(req.params.id);
    if (!equipement) {
      return res.status(404).json({ message: 'Équipement non trouvé' });
    }

    equipement.nom = req.body.nom || equipement.nom;
    equipement.description = req.body.description || equipement.description;
    equipement.pays_d_origine = req.body.pays_d_origine || equipement.pays_d_origine;
    equipement.annee_de_fabrication = req.body.annee_de_fabrication || equipement.annee_de_fabrication;

    const updatedEquipement = await equipement.save();
    res.status(200).json(updatedEquipement);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer un équipement
exports.deleteEquipement = async (req, res) => {
  try {
    const equipement = await Equipement.findById(req.params.id);
    if (!equipement) {
      return res.status(404).json({ message: 'Équipement non trouvé' });
    }

    await equipement.deleteOne({ _id: req.params.id});
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
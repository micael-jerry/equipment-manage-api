const Equipement = require('../models/equipement');

const getEquipements = async () => {
  return await Equipement.find();
};

const getEquipementById = async (id) => {
  return await Equipement.findById(id);
};

const createEquipement = async (nom, description, pays_d_origine, annee_de_fabrication, type, status_equipement) => {
  const equipement = new Equipement({ nom, description, pays_d_origine, annee_de_fabrication, type, status_equipement });
  return await equipement.save();
};

const updateEquipement = async (id, nom, description, pays_d_origine, annee_de_fabrication, type, status_equipement) => {
  const equipement = await Equipement.findById(id);
  if (!equipement) {
    throw new Error('Équipement non trouvé');
  }

  equipement.nom = nom || equipement.nom;
  equipement.description = description || equipement.description;
  equipement.pays_d_origine = pays_d_origine || equipement.pays_d_origine;
  equipement.annee_de_fabrication = annee_de_fabrication || equipement.annee_de_fabrication;
  equipement.type = type || equipement.type;
  equipement.status_equipement = status_equipement || equipement.status_equipement;

  return await equipement.save();
};

const deleteEquipement = async (id) => {
  const equipement = await Equipement.findById(id);
  if (!equipement) {
    throw new Error('Équipement non trouvé');
  }

  await equipement.deleteOne({ _id: id });
};

const getEquipementTypeById = async (id) => {
  const equipement = await Equipement.findById(id);
  if (!equipement) {
    throw new Error('Équipement non trouvé');
  }
  return equipement.type;
};

module.exports = {
  getEquipements,
  getEquipementById,
  createEquipement,
  updateEquipement,
  deleteEquipement,
  getEquipementTypeById
};
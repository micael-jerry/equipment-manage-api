const bcrypt = require('bcrypt');
const User = require('../models/user');

const getUsers = async () => {
  return await User.find();
};

const getUserById = async (id) => {
  return await User.findById(id);
};

const getUserByName = async (nom) => {
  return await User.findOne({ nom });
};

const createUser = async (nom, prenom, grade, unite, password) => {
  const user = new User({ nom, prenom, grade, unite, password });
  return await user.save();
};

const updateUser = async (id, nom, prenom, grade, unite) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error('Utilisateur non trouvé');
  }

  user.nom = nom || user.nom;
  user.prenom = prenom || user.prenom;
  user.grade = grade || user.grade;
  user.unite = unite || user.unite;

  return await user.save();
};

const deleteUser = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error('Utilisateur non trouvé');
  }

  await user.deleteOne({ _id: id });
};

exports.createUser = async (nom, prenom, grade, unite, password) => {
  try {
    const user = new User({ nom, prenom, grade, unite, password});
    return await user.save();
  } catch (error) {
    throw new Error('Impossible de créer un nouvel utilisateur.');
  }
};

async function verifierUtilisateur (nom, prenom, grade, password) {
  try {
  const utilisateurTrouve = await User.findOne({ nom, prenom, grade, password });
    return !!utilisateurTrouve;
  } catch (error) {
    throw new Error("Erreur lors de la vérification de l'utilisateur : " + error.message);
  }
};

async function compare(a,b) {
  if (a === b)
    return true;
  else
    return false;
}
module.exports = {
  getUsers,
  compare,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserByName,
  verifierUtilisateur
};
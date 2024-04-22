const User = require('../models/user');

const getUsers = async () => {
  return await User.find();
};

const getUserById = async (id) => {
  return await User.findById(id);
};

const getUserByGrade = async (grade) => {
  return await User.find({ grade });
};

const checkInvalidGrades = async (grades) => {
  const validGrades = ['Officier', 'Sous-Officier', 'Caporal', 'Soldat'];
  const invalidGrades = grades.filter(grade => !validGrades.includes(grade));
  return invalidGrades.length > 0 ? invalidGrades : null;
};

const createUser = async (nom, prenom, grade, unite) => {
  const user = new User({ nom, prenom, grade, unite });
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

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserByGrade,
  checkInvalidGrades,
};
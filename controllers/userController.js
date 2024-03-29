const User = require('../models/user');

// Récupérer la liste des utilisateurs
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer un utilisateur par ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Ajouter un nouvel utilisateur
exports.createUser = async (req, res) => {
  const user = new User({
    nom: req.body.nom,
    prenom: req.body.prenom,
    grade: req.body.grade,
    unite: req.body.unite
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Mettre à jour un utilisateur
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    user.nom = req.body.nom || user.nom;
    user.prenom = req.body.prenom || user.prenom;
    user.grade = req.body.grade || user.grade;
    user.unite = req.body.unite || user.unite;

    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer un utilisateur
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    await User.deleteOne({ _id: req.params.id });
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
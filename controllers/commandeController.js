const Commande = require('../models/commande');

// Récupérer la liste des commandes
exports.getCommandes = async (req, res) => {
  try {
    const commandes = await Commande.find();
    res.status(200).json(commandes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer une commande par ID
exports.getCommandeById = async (req, res) => {
  try {
    const commande = await Commande.findById(req.params.id);
    if (!commande) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }
    res.status(200).json(commande);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Ajouter une nouvelle commande
exports.createCommande = async (req, res) => {
  const commande = new Commande({
    //TODO: si user_id n'existe pas dans la base de donnee, affiche une erreur et n'ajoute pas une nouvelle commande 
    //si date n'est pas normal, affiche une erreur et n'ajoute pas une nouvelle commande 
    //ces parametres sont obligatoires
    user_id: req.body.user_id,
    date: req.body.date
  });

  try {
    const newCommande = await commande.save();
    res.status(201).json(newCommande);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Mettre à jour une commande
exports.updateCommande = async (req, res) => {
  try {
    const commande = await Commande.findById(req.params.id);
    if (!commande) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }

    commande.user_id = req.body.user_id || commande.user_id;
    commande.date = req.body.date || commande.date;

    const updatedCommande = await commande.save();
    res.status(200).json(updatedCommande);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer une commande
exports.deleteCommande = async (req, res) => {
  try {
    const commande = await Commande.findById(req.params.id);
    if (!commande) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }

    await commande.deleteOne({ _id: req.params.id});
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
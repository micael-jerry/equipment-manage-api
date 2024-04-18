const HistoriqueUtilisation = require('../models/historique');

// Récupérer l'historique d'utilisation
exports.getHistoriqueUtilisation = async (req, res) => {
  try {
    const historique = await HistoriqueUtilisation.find();
    res.status(200).json(historique);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Ajouter une nouvelle entrée à l'historique d'utilisation
exports.createHistoriqueUtilisation = async (req, res) => {
  const historique = new HistoriqueUtilisation({
    //TODO: si id_equipement et id_user n'existent pas dans la base de donnee, affiche une erreur et n'ajoute pas une nouvelle entrée à l'historique d'utilisation
    //si date n'est pas normal, affiche une erreur et n'ajoute pas une nouvelle entrée à l'historique d'utilisation
    //ces parametres sont obligatoires sauf description
    id_equipement: req.body.id_equipement,
    id_user: req.body.id_user,
    date_utilisation: req.body.date_utilisation,
    description_utilisation: req.body.description_utilisation
  });

  try {
    const newHistorique = await historique.save();
    res.status(201).json(newHistorique);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
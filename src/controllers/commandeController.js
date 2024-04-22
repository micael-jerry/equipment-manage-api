const commandeService = require("../services/commandeService");

exports.getCommandes = async (req, res) => {
  try {
    const commandes = await commandeService.getCommandes();
    res.status(200).json(commandes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCommandeById = async (req, res) => {
  try {
    const commande = await commandeService.getCommandeById(req.params.id);
    if (!commande) {
      return res.status(404).json({ message: "Commande non trouvée" });
    }
    res.status(200).json(commande);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createCommande = async (req, res) => {
  const { user_id, date, status, id_stocks } = req.body;

  try {
    const newCommande = await commandeService.createCommande(
      user_id,
      date,
      status,
      id_stocks
    );
    res.status(201).json(newCommande);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateCommande = async (req, res) => {
  const { user_id, date, status, id_stocks } = req.body;

  try {
    const updatedCommande = await commandeService.updateCommande(
      req.params.id,
      user_id,
      date,
      status,
      id_stocks
    );
    res.status(200).json(updatedCommande);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteCommande = async (req, res) => {
  try {
    await commandeService.deleteCommande(req.params.id);
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCommandeStatus = async (req, res) => {
  const { status } = req.body;

  try {
    const commande = await Commande.findById(req.params.id);
    if (!commande) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }

    commande.status = status || commande.status;
    await commande.save();

    res.status(200).json(commande);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
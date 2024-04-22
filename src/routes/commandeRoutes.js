const express = require("express");
const router = express.Router();
const commandeController = require("../controllers/commandeController");

router.get("/", commandeController.getCommandes);
router.get("/:id", commandeController.getCommandeById);
router.post("/", commandeController.createCommande);
router.put("/:id", commandeController.updateCommande);
router.delete("/:id", commandeController.deleteCommande);
router.put("/:id/status", commandeController.updateCommandeStatus); // Ajout de la route pour mettre à jour le statut de la commande

module.exports = router;
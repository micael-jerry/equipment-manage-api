const express = require("express");
const router = express.Router();
const historiqueController = require("../controllers/historiqueController");

router.get("/", historiqueController.getHistoriqueUtilisation);
router.post("/", historiqueController.createHistoriqueUtilisation);
router.get("/:id_stocks/info",historiqueController.getHistoriqueInfoByStocksId
);

module.exports = router;
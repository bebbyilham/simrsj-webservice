const express = require("express");
const router = express.Router();

const tarifHandler = require("./handler/tarif");

router.get("/layanan", tarifHandler.getAllLayanan);
router.post("/tindakan", tarifHandler.getAllTindakan);

module.exports = router;

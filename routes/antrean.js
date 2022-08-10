const express = require("express");
const router = express.Router();

const antreanHandler = require("./handler/antrean");

const verifyToken = require("../middleware/verifyToken");
const can = require("../middleware/permission");

router.post(
  "/ambilantrean",
  verifyToken,
  can("admin", "bpjs"),
  antreanHandler.ambilAntrean
);
router.post(
  "/statusantrean",
  verifyToken,
  can("admin", "bpjs"),
  antreanHandler.statusAntrean
);
router.post(
  "/sisaantrean",
  verifyToken,
  can("admin", "bpjs"),
  antreanHandler.sisaAntrean
);
router.post(
  "/batalantrean",
  verifyToken,
  can("admin", "bpjs"),
  antreanHandler.batalAntrean
);
router.post(
  "/checkin",
  verifyToken,
  can("admin", "bpjs"),
  antreanHandler.checkIn
);
router.post(
  "/infopasienbaru",
  verifyToken,
  can("admin", "bpjs"),
  antreanHandler.infoPasienbaru
);
// router.get("/:norm/:tanggalperiksa", antreanHandler.cariAntrean); //cari antrean

module.exports = router;

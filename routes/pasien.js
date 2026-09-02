const express = require("express");
const router = express.Router();

//panggil handler user
const pasienHandler = require("./handler/pasien");
// const verifyToken = require('../middleware/verifyToken');

router.get("/:id/:tlahir", pasienHandler.cekpasien); //cek pasien
router.get("/:id", pasienHandler.cekpasien); //cek pasien nik/id
router.get("/cariantrean/:norm/:tanggalperiksa", pasienHandler.cariantrean); //cari antrean

module.exports = router;

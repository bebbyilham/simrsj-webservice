const express = require('express');
const router = express.Router();

//panggil handler user
const pasienHandler = require('./handler/pasien');
// const verifyToken = require('../middleware/verifyToken');

router.get('/:id', pasienHandler.cekpasien); //cek pasien


module.exports = router;
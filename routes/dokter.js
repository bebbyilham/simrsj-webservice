const express = require('express');
const router = express.Router();

//panggil handler user
const dokterHandler = require('./handler/dokter');
// const verifyToken = require('../middleware/verifyToken');

router.get('/', dokterHandler.getAll); //cek poli
router.post('/jadwaldokter', dokterHandler.jadwaldokter); //cek jadwal dokter


module.exports = router;
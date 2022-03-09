const express = require('express');
const router = express.Router();

//panggil handler user
const bpjsHandler = require('./handler/bpjs');
// const verifyToken = require('../middleware/verifyToken');

router.post('/cekkartu', bpjsHandler.cekkartu); //router cekkartu
router.get('/dokter', bpjsHandler.dokter); //router jadwaldokter
router.get('/jadwaldokter', bpjsHandler.jadwaldokter); //router jadwaldokter


module.exports = router;
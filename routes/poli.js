const express = require('express');
const router = express.Router();

//panggil handler user
const poliHandler = require('./handler/poli');
// const verifyToken = require('../middleware/verifyToken');

router.get('/', poliHandler.getAll); //cek poli


module.exports = router;
const express = require('express');
const router = express.Router();

//panggil handler user
const pendaftaranHandler = require('./handler/pendaftaran');
// const verifyToken = require('../middleware/verifyToken');

router.post('/pasienbaru', pendaftaranHandler.pasienbaru); //router create
router.post('/pasienlama', pendaftaranHandler.pasienlama); //router create


module.exports = router;
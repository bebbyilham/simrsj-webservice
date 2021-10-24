const express = require('express');
const router = express.Router();

//panggil handler user
const refreshTokensHandler = require('./handler/refresh-tokens');

router.post('/', refreshTokensHandler.refreshToken); //router create


module.exports = router;
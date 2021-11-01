const express = require('express');
const router = express.Router();

//panggil handler user
const usersHandler = require('./handler/users');
const verifyToken = require('../middleware/verifyToken');

router.post('/register', usersHandler.register); //router create
router.get('/login', usersHandler.login); //router create
router.put('/', verifyToken, usersHandler.update); //router create
router.get('/', verifyToken, usersHandler.getUser); //router create
router.post('/logout', verifyToken, usersHandler.logout); //router create


module.exports = router;
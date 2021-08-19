const express = require('express');
const router = express.Router();
const handlerUsers = require('./handler/users');
const verifyToken = require('../middlewares/tokenVerify');


router.post('/register', handlerUsers.register);
router.post('/login', handlerUsers.login);
router.put('/', verifyToken, handlerUsers.update);
router.get('/', handlerUsers.getUser);
router.post('/logout', verifyToken, handlerUsers.logout);

module.exports = router;

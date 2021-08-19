const express = require('express');
const router = express.Router();
const handlerWebhooks = require('./handler/webhook');

router.post('/', handlerWebhooks.webhook);

module.exports = router;

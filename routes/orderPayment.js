const express = require('express');
const router = express.Router();
const handlerOrderPayment = require('./handler/order-payment');

router.get('/', handlerOrderPayment.getOrders);

module.exports = router;

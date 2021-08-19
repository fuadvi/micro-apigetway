const express = require('express');
const router = express.Router();
const handlerlessons = require('./handler/lessons')

router.get('/', handlerlessons.getAll);
router.get('/:id', handlerlessons.get);
router.post('/', handlerlessons.create);
router.put('/:id', handlerlessons.update);
router.delete('/:id', handlerlessons.destroy);
module.exports = router;

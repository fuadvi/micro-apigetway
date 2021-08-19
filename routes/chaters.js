const express = require('express');
const router = express.Router();
const handlerchapters = require('./handler/chapters')

router.get('/', handlerchapters.getAll);
router.get('/:id', handlerchapters.get);
router.post('/', handlerchapters.create);
router.put('/:id', handlerchapters.update);
router.delete('/:id', handlerchapters.destroy);
module.exports = router;

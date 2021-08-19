const express = require('express');
const router = express.Router();
const handlerMedia = require('./handler/media')

router.post('/', handlerMedia.create);
router.get('/', handlerMedia.getAll);
router.delete('/:id', handlerMedia.deleted);

module.exports = router;

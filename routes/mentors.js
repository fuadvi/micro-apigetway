const express = require('express');
const router = express.Router();
const handlerMentor = require('./handler/mentors')

router.get('/', handlerMentor.getAll);
router.get('/:id', handlerMentor.get);
router.post('/', handlerMentor.create);
router.put('/:id', handlerMentor.update);
router.delete('/:id', handlerMentor.destroy);
module.exports = router;

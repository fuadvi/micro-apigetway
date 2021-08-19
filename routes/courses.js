const express = require('express');
const router = express.Router();
const handlerCourse = require('./handler/corses');

const verfyToken = require('../middlewares/tokenVerify');
const can = require('../middlewares/premision');

router.get('/', handlerCourse.getAll);
router.get('/:id', handlerCourse.get);
router.post('/', verfyToken, can('admin'), handlerCourse.create);
router.put('/:id', verfyToken, can('admin'), handlerCourse.update);
router.delete('/:id', verfyToken, can('admin'), handlerCourse.destroy);
module.exports = router;

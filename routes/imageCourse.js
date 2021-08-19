const express = require('express');
const { route } = require('.');
const router = express.Router();
const handlerImageCourse = require('./handler/image-courses');

router.post('/', handlerImageCourse.create);
router.delete('/:id', handlerImageCourse.destroy);

module.exports = router;
